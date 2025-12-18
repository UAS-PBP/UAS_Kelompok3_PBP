<?php

namespace App\Http\Controllers;

use App\Models\rumahtampilan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class tambahrumah extends Controller
{


    public function signup(Request $request)
    {
        $request->validate([
            'nama_rumah'        => 'required|string',
            'lokasi_rumah'      => 'required|string',
            'deskripsi'         => 'required|string',
            'kategori'          => 'required|string',
            'jumlah_km'         => 'required|integer',
            'jumlah_KT'         => 'required|integer',
            'luas_rumah'        => 'required|integer',
            'parkir_rumah'      => 'required|integer',
            'diskon'            => 'required|integer',
            'waktu_diskon'      => 'required|date',
            'harga_rumah'       => 'required|integer',
            'foto_rumah'   => 'required|array',
            'foto_rumah.*' => 'image|mimes:jpg,jpeg,png|max:2048',
            'jenis_pembayaran'  => 'required|string',
            'fasilitas'         => 'required|string',
            'jumlah_rumah'      => 'required|integer',
        ]);
        $paths = [];
foreach ($request->file('foto_rumah') as $file) {
    $paths[] = $file->store('rumah', 'public');
}


        // ambil company yang login
       $idPerusahaan = session('ID_PERUSAHAAN');
       $idAkunPerusahaan = session('ID_AKUN_PERUSAHAAN');

if (!$idPerusahaan) {
    abort(401, 'Company belum login');
}

        // generate ID_RUMAH unik
        do {
            $idrumah = random_int(25000, 75000);
        } while (rumahtampilan::where('ID_RUMAH', $idrumah)->exists());
 Log::info('Data akan disimpan: ', $request->all());


        // simpan ke tabel tampilanhome
        rumahtampilan::create([
            'ID_RUMAH'          => $idrumah,
            'ID_PERUSAHAAN'     => $idPerusahaan,
            'ID_AKUN_PERUSAHAAN' => $idAkunPerusahaan,
            'NAMA_RUMAH'        => $request->nama_rumah,
            'LOKASI_RUMAH'      => $request->lokasi_rumah,
            'DESKRIPSI_RUMAH'   => $request->deskripsi,
            'KATEGORI_RUMAH'    => $request->kategori,
            'JUMLAH_KT'         => $request->jumlah_KT,
            'JUMLAH_KM'         => $request->jumlah_km,
            'LUAS_BANGUNAN'     => $request->luas_rumah,
            'JUMLAH_PARKIR'     => $request->parkir_rumah,
            'HARGA_ASLI'        => $request->harga_rumah,
            'DISKON'            => $request->diskon,
            'WAKTU_DISKON'      => $request->waktu_diskon,
            'JENIS_PEMBAYARAN'  => $request->jenis_pembayaran,
            'FASILITAS'         => $request->fasilitas,
            'JUMLAH_RUMAH'      => $request->jumlah_rumah,
            'IMAGE'             => json_encode($paths),

        ]);

        // kirim ulang data ke halaman Inputrumah
        return redirect()->route('input.rumah');
        
    }
    public function index()
    {
         $idPerusahaan = session('ID_PERUSAHAAN');

        return Inertia::render('Inputrumah', [
            'propertiesCompany' => rumahtampilan::where(
                'ID_PERUSAHAAN',
                $idPerusahaan
            )->get()
        ]);
    }
    // tambahrumah.php
public function destroy($id)
{
    $property = rumahtampilan::find($id);
    if (!$property) {
        return redirect()->back()->with('error', 'Rumah tidak ditemukan');
    }

    // hapus file gambar dari storage
    if ($property->IMAGE) {
        Storage::disk('public')->delete($property->IMAGE);
    }

    $property->delete();

    return redirect()->back()->with('success', 'Rumah berhasil dihapus');
}

}