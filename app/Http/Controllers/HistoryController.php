<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Favorit; // <--- Wajib Import Model Favorit
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // 1. Tentukan ID User (Kalau login pakai ID-nya, kalau tidak pakai 0)
        // Sesuaikan 'ID_USERNAME' dengan primary key tabel user kamu
        $idUser = $user ? ($user->ID_USERNAME ?? $user->id) : 0;

        // 2. Ambil Data History (Filter berdasarkan ID User tadi)
        $histories = History::with('rumah')
            ->where('ID_USERNAME', $idUser)
            ->orderBy('WAKTU_HISTORY', 'desc')
            ->get();

        // 3. Ambil Data Favorit (Filter berdasarkan ID User tadi)
        $favorites = Favorit::with('rumah')
            ->where('ID_USERNAME', $idUser)
            ->orderBy('WAKTU_LIKE', 'desc')
            ->get();

        // 4. Kirim ke Frontend
        return Inertia::render('History', [
            'histories' => $histories,
            'favorites' => $favorites
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $history = new History();

        // Logic penentuan User ID yang sama dengan di atas
        if ($user) {
            $history->ID_USERNAME = $user->ID_USERNAME ?? $user->id;
            $history->USERNAME_PENGGUNA = $user->USERNAME_PENGGUNA ?? $user->name ?? 'User';
            $history->EMAIL = $user->EMAIL ?? $user->email ?? '';
        } else {
            $history->ID_USERNAME = 0; 
            $history->USERNAME_PENGGUNA = 'Guest';
            $history->EMAIL = 'guest@estatehub.com';
        }

        $history->ID_RUMAH = $request->id_rumah; 
        $history->WAKTU_HISTORY = now();
        $history->save();

        // Redirect ke halaman detail (Route yang sudah kita perbaiki sebelumnya)
        return redirect()->back();
    }
}