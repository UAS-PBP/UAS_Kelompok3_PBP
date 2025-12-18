<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginUser extends Controller
{
    public function index()
    {
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('USERNAME_PENGGUNA', $request->username)->first();

        if (!$user) {
            return back()->withErrors(['username' => 'Username tidak ditemukan!']);
        }

        if (!Hash::check($request->password, $user->PASSWORD)) {
            return back()->withErrors(['password' => 'Password salah!']);
        }

        $request->session()->regenerate();

        return Inertia::location(route('home'));

    }
}