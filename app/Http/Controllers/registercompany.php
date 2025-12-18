<?php

namespace App\Http\Controllers;

use App\Models\company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class registercompany extends Controller
{
    public function signup(Request $request)
    {
        $request->validate([
            'companyId' => 'required|unique:company,ID_PERUSAHAAN',
            'name'      => 'required|string',
            'email'     => 'required|email|unique:company,EMAIL_PERUSAHAAN',
            'phone'     => 'required|string',
            'location'  => 'required|string',
            'password'  => 'required|min:5',
        ]);

        $idcompany = random_int(24000, 24999);

        company::create([
            'ID_PERUSAHAAN'       => $request->companyId,
            'NAMA_PERUSAHAAN'     => $request->name,
            'EMAIL_PERUSAHAAN'    => $request->email,
            'LOKASI_PERUSAHAAN'   => $request->location,
            'PASSWORD_PERUSAHAAN' => Hash::make($request->password),
            'ID_AKUN_PERUSAHAAN'  => $idcompany,
            'NOMOR_PERUSAHAAN'    => $request->phone,
        ]);

        // FULL reload (aman untuk Inertia)
        return Inertia::location(route('login-company'));
    }
}