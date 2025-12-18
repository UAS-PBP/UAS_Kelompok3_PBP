<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservasisurvey;
use Inertia\Inertia;
class ReservasisurveyController extends Controller
{
    
    public function store(Request $request)
    {
        $reservasi = Reservasisurvey::create([
    'NAMA_COSTUMER' => $request->nama_customer,
    'NO_TELEPON' => $request->no_telpon,
    'NAMA_RUMAH' => $request->nama_rumah,
    'LOKASI_RUMAH' => $request->lokasi_rumah,
    'TANGGAL_MELAKUKAN_RESERVASI' => $request->tanggal_reservasi,
    'JAM_RESERVASI' => $request->jam_reservasi,
    'STATUS_RESERVASI' => 'pending',

    ]);

    return Inertia::render('reservasi/konfirmasi', [
            'reservasi' => $reservasi
        ]);
    }
}