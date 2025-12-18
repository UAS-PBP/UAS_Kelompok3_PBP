<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\rumahtampilan;
use Inertia\Inertia;

class CompanyDashboardController extends Controller
{
    public function show()
{

   $company = Auth::guard('company')->user();
   $company->load('rumahtampilan');

    return Inertia::render('Dashboard', [
        'company' => [
            'ID_PERUSAHAAN' => $company->ID_PERUSAHAAN,
            'NAMA_PERUSAHAAN' => $company->NAMA_PERUSAHAAN,
            'LOKASI_PERUSAHAAN' => $company->LOKASI_PERUSAHAAN,
            'rumahtampilan' => $company->rumahtampilan,
        ],
        'houses' => $company->rumahtampilan->map(function ($r) {
            return [
                'id' => $r->ID_RUMAH,
                'title' => $r->NAMA_RUMAH,
                'location' => $r->LOKASI_RUMAH,
                'beds' => $r->JUMLAH_KT,
                'baths' => $r->JUMLAH_KM,
                'area' => $r->LUAS_BANGUNAN,
                'price' => $r->HARGA_ASLI,
                'promo_price' => $r->DISKON,
                'likes' => $r->JUMLAH_LIKE,
                'created_at' => $r->created_at,
                'image' => $r->IMAGE,
                'category' => $r->KATEGORI_RUMAH,
            ];
        }),
    ]);
}


public function category(Request $request)
{
    $category = $request->query('category');
    $company = Auth::user()->company;

    $listings = rumahtampilan::where('ID_PERUSAHAAN', $company->ID_PERUSAHAAN)
        ->where('KATEGORI_RUMAH', $category)
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




