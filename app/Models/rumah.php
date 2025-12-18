<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class rumah extends Model
{
    use HasFactory;

    protected $table = 'detail_rumah';
    protected $primaryKey = 'ID_DETAIL_RUMAH';
    public $incrementing = true;

    protected $fillable = [
        'JUMLAH_KM',
        'JUMAR_KT',
        'LUAS_BANGUNAN',
        'FASILITAS',
        'ID_PERUSAHAAN',
        'ID_AKUN_PERUSAHAAN',
        'PASSWORD_PERUSAHAAN',
        'EMAIL_PERUSAHAAN',
        'ID_RUMAH',
        'ID_USERNAME',
        'USERNAME_PENGGUNA',
        'EMAIL',
    ];
}
