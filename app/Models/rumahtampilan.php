<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rumahtampilan extends Model
{
    use HasFactory;

    protected $table = 'tampilanhome';
    protected $primaryKey = 'ID_RUMAH';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'ID_RUMAH',
        'ID_PERUSAHAAN',
        'ID_AKUN_PERUSAHAAN',
        'NAMA_RUMAH',
        'LOKASI_RUMAH',
        'DESKRIPSI_RUMAH',
        'KATEGORI_RUMAH',
        'JUMLAH_KT',
        'JUMLAH_KM',
        'LUAS_BANGUNAN',
        'JUMLAH_PARKIR',
        'HARGA_ASLI',
        'JENIS_PEMBAYARAN',
        'FASILITAS',
        'JUMLAH_RUMAH',
        'JUMLAH_LIKE',
        'DISKON',
        'WAKTU_DISKON',
        'IMAGE',
    ];
    public function agent()
    {
        return $this->belongsTo(agen::class, 'ID_PERUSAHAAN', 'ID_PERUSAHAAN');
        // ID_PERUSAHAAN → field di rumahtampilan
        // ID_PERUSAHAAN → primary key di tabel agen
    }
    public function company()
{
    return $this->belongsTo(company::class, 'ID_PERUSAHAAN', 'ID_PERUSAHAAN');
}

}