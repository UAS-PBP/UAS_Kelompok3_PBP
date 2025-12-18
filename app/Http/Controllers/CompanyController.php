<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\rumahtampilan;
use Inertia\Inertia;

class CompanyController extends Controller
{
   public function index() {
    $companies = company::with('agen')->get();
    return response()->json($companies);
}

public function store(Request $request) {
    $company = company::create([
    'NAMA_PERUSAHAAN' => $request->NAMA_PERUSAHAAN,
    'EMAIL_PERUSAHAAN' => $request->EMAIL_PERUSAHAAN,
    'PASSWORD_PERUSAHAAN' => bcrypt($request->PASSWORD_PERUSAHAAN),
    'LOKASI_PERUSAHAAN' => $request->LOKASI_PERUSAHAAN,
]);

    // Jika ada properti
    if($request->has('properties')){
        foreach($request->properties as $prop){
            $company->rumahtampilan()->create($prop);
        }
    }
    return response()->json($company);
}
public function show($companyId)
{
    $company = Company::with('rumahtampilan')->findOrFail($companyId);

    return Inertia::render('Company', [
        'company' => $company
    ]);
    

}
public function category(Request $request)
{
    $category = $request->query('category');

    $listings = rumahtampilan::where('KATEGORI_RUMAH', $category)
        ->get()
        ->map(function ($r) {
            return [
                'id' => $r->ID_RUMAH,
                'name' => $r->NAMA_RUMAH,
                'location' => $r->LOKASI_RUMAH,
                'beds' => $r->JUMLAH_KT,
                'baths' => $r->JUMLAH_KM,
                'size' => $r->LUAS_BANGUNAN,
                'price' => $r->HARGA_ASLI,
                'image' => $r->IMAGE,
                'category' => $r->KATEGORI_RUMAH,
            ];
        });

    return Inertia::render('Category', [
        'listings' => $listings,
        'category' => $category,
    ]);
}





}
