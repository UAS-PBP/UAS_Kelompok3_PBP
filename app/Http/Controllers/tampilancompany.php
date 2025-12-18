<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class tampilancompany extends Controller
{
    public function index()
    {
        if (!Auth::guard('company')->check()) {
            return redirect()->route('login-company');
        }

        $company = Auth::guard('company')->user();

        return Inertia::render('Dashboard', [
            'company' => [
                'id' => $company->ID_PERUSAHAAN,
                'name' => $company->NAMA_PERUSAHAAN,
                'location' => $company->LOKASI_PERUSAHAAN,
                'profile_image' => $company->PROFILE_IMAGE ?? null,
            ],
            'houses' => [],
        ]);
    }
}