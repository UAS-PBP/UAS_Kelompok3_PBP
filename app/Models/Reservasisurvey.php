<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservasisurvey extends Model
{
    use HasFactory;

    protected $table = 'reservasi';

    protected $primaryKey = 'ID_RESERVASI';

    
    public $timestamps = false;

    protected $fillable = [
        'ID_RESERVASI',
        'ID_PERUSAHAAN',
        'ID_AKUN_PERUSAHAAN',
        'NAMA_COSTUMER',  
        'NO_TELEPON',     
        'NAMA_RUMAH',
        'LOKASI_RUMAH',
        'TANGGAL_PENGAJUAN',
        'TANGGAL_MELAKUKAN_RESERVASI',
        'JAM_RESERVASI',
    ];
}