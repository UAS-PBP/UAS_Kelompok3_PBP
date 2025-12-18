<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class register extends Controller
{
    public function signin(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:user,USERNAME_PENGGUNA',
            'email' => 'required|email|unique:user,EMAIL',
            'password' => 'required|min:6',
        ], [
            'username.unique' => 'Username sudah digunakan, silakan pilih yang lain!',
            'email.unique' => 'Email sudah terdaftar!',
        ]);

        $idUser = random_int(24000, 24999);

        User::create([
            'ID_USERNAME' => $idUser,
            'NAMA_ASLI_PENGGUNA' => $request->name,
            'USERNAME_PENGGUNA' => $request->username,
            'EMAIL' => $request->email,
            'NOMOR_TELP' => $request->telp,
            'PASSWORD' => Hash::make($request->password),
        ]);

        // ✅ Redirect ke login setelah register
        return redirect()
            ->route('login')
            ->with('success', 'Akun berhasil dibuat, silakan login.');
    }
}