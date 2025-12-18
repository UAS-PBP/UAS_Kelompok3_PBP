<?php

namespace App\Http\Controllers;

use App\Models\Favorit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoritController extends Controller
{
    public function toggle(Request $request)
    {
        // 1. Validasi input
        $request->validate([
            'id_rumah' => 'required|integer'
        ]);

        $idRumah = $request->id_rumah;
        
        // 2. Ambil ID User (Pastikan tidak null)
        $user = Auth::user();
        // Kalau tabel usermu pkai 'ID_USERNAME', pakai itu. Kalau default, pakai 'id'.
        $idUser = $user ? ($user->ID_USERNAME ?? $user->id) : 0; 

        // 3. Cek apakah sudah ada di database?
        $existingLike = Favorit::where('ID_RUMAH', $idRumah)
                               ->where('ID_USERNAME', $idUser)
                               ->first();

        if ($existingLike) {
            // KALAU ADA -> HAPUS (Unlike)
            $existingLike->delete();
        } else {
            // KALAU TIDAK ADA -> SIMPAN (Like)
            Favorit::create([
                'ID_RUMAH' => $idRumah,
                'ID_USERNAME' => $idUser,
                'WAKTU_LIKE' => now()
            ]);
        }

        // 4. Untuk request AJAX/Inertia, kembalikan JSON agar tidak terjadi redirect
        if ($request->expectsJson()) {
            return response()->json(['success' => true]);
        }

        // Jika bukan AJAX, redirect kembali seperti sebelumnya
        return back();
    }
}