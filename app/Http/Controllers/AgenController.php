<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agen;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AgenController extends Controller
{
    // 📌 simpan agen
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'phone' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // upload image
        $path = $request->file('image')->store('agen', 'public');

        Agen::create([
            'ID_PERUSAHAAN'   => session('ID_PERUSAHAAN'),
            'ID_AKUN_PERUSAHAAN' => session('ID_AKUN_PERUSAHAAN'),
            'NAMA_AGEN'       => $request->name,
            'NOMOR_HP_AGEN'   => $request->phone,
            'EMAIL_AGEN'      => $request->email,
            'IMAGE'           => $path,
        ]);

        return redirect('/agen')->with('success', 'Agen berhasil ditambahkan');
    }

    // 📌 tampilkan agen
    public function index()
{
    $idPerusahaan = session('ID_PERUSAHAAN');


    $agens = Agen::where('ID_PERUSAHAAN', $idPerusahaan)->get();

    return inertia('Agen', [
        'agens' => $agens
    ]);
}


}
