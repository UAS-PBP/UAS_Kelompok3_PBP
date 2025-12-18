<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class LoginGoogleCompany extends Controller
{
    // Redirect ke Google
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    // Callback dari Google
    public function callback()
    {
        // Ambil data user dari Google
        $googleCompany = Socialite::driver('google')->stateless()->user();

        // Cek email case-insensitive
        $company = Company::whereRaw(
            'LOWER(EMAIL_PERUSAHAAN) = ?',
            [strtolower($googleCompany->getEmail())]
        )->first();

        if (!$company) {
            // Email belum terdaftar → redirect + flash message
            return redirect()->route('login-company')
                ->with('flash', [
                    'type' => 'error',
                    'message' => 'Akun Google belum terdaftar di sistem. Silakan daftar terlebih dahulu.'
                ]);
        }

        // Login pakai guard company
        Auth::guard('company')->login($company);

        return redirect()->route('Dashboard');
    }
}