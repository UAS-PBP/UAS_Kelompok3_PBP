<?php

namespace App\Http\Controllers;

use App\Models\company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class logincompany extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        // 🔑 SATU QUERY (name + email)
        $company = company::where('NAMA_PERUSAHAAN', $request->name)
            ->where('EMAIL_PERUSAHAAN', $request->email)
            ->first();

        if (!$company) {
            return back()->withErrors([
                'name' => 'Nama atau Email perusahaan tidak sesuai!'
            ]);
        }

        if (!Hash::check($request->password, $company->PASSWORD_PERUSAHAAN)) {
            return back()->withErrors([
                'password' => 'Password salah!'
            ]);
        }

        // 🔐 LOGIN RESMI
        Auth::guard('company')->login($company);
            $request->session()->regenerate();
            session([
                'ID_PERUSAHAAN'   => $company->ID_PERUSAHAAN,
                'NAMA_PERUSAHAAN' => $company->NAMA_PERUSAHAAN,
                'ID_AKUN_PERUSAHAAN' => $company->ID_AKUN_PERUSAHAAN,

            ]);
            return redirect()->route('company.dashboard');
    }
}