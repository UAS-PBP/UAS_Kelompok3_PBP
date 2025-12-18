<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\rumahtampilan;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = rumahtampilan::query();

        if ($request->city) {
            $query->where('KOTA', 'like', "%{$request->city}%"); // pastikan kolom ada
        }

        if ($request->location) {
            $query->where('LOKASI_RUMAH', 'like', "%{$request->location}%");
        }

        if ($request->type) {
            $query->where('KATEGORI_RUMAH', 'like', "%{$request->type}%");
        }

        if ($request->price) {
    $query->where(function($q) use ($request) {
        $q->where('HARGA_ASLI', '<=', $request->price)
          ->orWhere('DISKON', '<=', $request->price);
    });
}

        $properties = $query->get();

        return Inertia::render(
            $request->is('home/daftar-properti') ? 'Daftarproperti' : 'Home',
            [
                'properties' => $properties,
                'filters' => $request->only(['city','location','type','price'])
            ]
        );
    }
    public function show($id)
{
    $property = rumahtampilan::find($id);

    if (!$property) {
        abort(404, 'Property not found');
    }

   $rumah = rumahtampilan::with('agent.company')->findOrFail($id);
    return Inertia::render('Deskripsirumah', [
        'rumah' => $rumah
    ]);
}
public function like($id){
    $property = rumahtampilan::find($id);
    if($property){
        $property->JUMLAH_LIKE += 1;
        $property->save();
    }
    return response()->json($property);
}
public function all()
{
    $houses = rumahtampilan::all();

    return response()->json($houses);
}
public function category(Request $request)
{
    $category = $request->category;

    $listings = rumahtampilan::when($category, function ($q) use ($category) {
        $q->where('KATEGORI_RUMAH', $category);
    })->get();

    return Inertia::render('Home/Company/Category', [
        'listings' => $listings,
        'category' => $category,
    ]);
}


}
