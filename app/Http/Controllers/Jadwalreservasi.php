<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Reservasisurvey;
use App\Models\Company;
use App\Models\rumahtampilan;
use Inertia\Inertia;

class Jadwalreservasi extends Controller
{
    /**
     * TAMPIL JADWAL RESERVASI (COMPANY)
     */
    public function indexCompany()
    {
        $company = Auth::guard('company')->user();

        $reservasi = Reservasisurvey::where('ID_PERUSAHAAN', $company->ID_PERUSAHAAN)
            ->orderBy('TANGGAL_MELAKUKAN_RESERVASI', 'asc')
            ->get();

        return Inertia::render('Company/Jadwalreservasi', [
            'reservasi' => $reservasi
        ]);
    }

    /**
     * FORM BUAT RESERVASI (USER)
     */
    public function create($id_rumah)
    {
        $rumah = rumahtampilan::where('ID_RUMAH', $id_rumah)->first();

        if (!$rumah) {
            return redirect()->back()->with('error', 'Data rumah tidak ditemukan.');
        }

        return Inertia::render('Reservasi', [
            'rumah' => $rumah,
        ]);
    }

    /**
     * SIMPAN RESERVASI (USER)
     */
    public function store(Request $request, $id_rumah)
    {
        $request->validate([
            'nama_customer' => 'required|string|max:100',
            'no_telepon'    => 'required|string|max:20',
            'tanggal'       => 'required|date',
            'jam'           => 'required|string',
        ]);

        $rumah = rumahtampilan::where('ID_RUMAH', $id_rumah)->first();
        if (!$rumah) {
            return redirect()->back()->with('error', 'Rumah tidak ditemukan!');
        }

        $company = Company::where('ID_PERUSAHAAN', $rumah->ID_PERUSAHAAN)->first();
        $user = Auth::user();

        Reservasisurvey::create([
            'ID_RESERVASI',
            'ID_PERUSAHAAN'               => $rumah->ID_PERUSAHAAN,
            'ID_AKUN_PERUSAHAAN'          => $rumah->ID_AKUN_PERUSAHAAN,                     
            'NAMA_CUSTOMER'               => $request->nama_customer,
            'NO_TELEPON'                  => $request->no_telepon,
            'NAMA_RUMAH'                  => $rumah->NAMA_RUMAH,
            'LOKASI_RUMAH'                => $rumah->LOKASI_RUMAH,
            'TANGGAL_MELAKUKAN_RESERVASI' => $request->tanggal,
            'JAM_RESERVASI'               => $request->jam,
            'STATUS_RESERVASI'            => 'belum', // default
        ]);

        return redirect()->back()->with(
            'success',
            'Reservasi berhasil diajukan! Admin akan segera menghubungi.'
        );
    }

    /**
     * UPDATE STATUS RESERVASI (OPTIONAL)
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:proses,belum,selesai'
        ]);

        $reservasi = Reservasisurvey::findOrFail($id);
        $reservasi->STATUS_RESERVASI = $request->status;
        $reservasi->save();

        return redirect()->back()->with('success', 'Status reservasi berhasil diperbarui.');
    }
}