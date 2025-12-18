<?php

namespace App\Http\Controllers;

use App\Models\Agen;
use Illuminate\Http\Request;

class RumahController extends Controller
{
    public function create()
    {
         $idPerusahaan = session('ID_PERUSAHAAN');
      $agens = Agen::where('ID_PERUSAHAAN', $idPerusahaan)
             ->get();


        return inertia('Uploadrumah', [
            'agens' => $agens
        ]);
    }
}
