<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorit extends Model
{
    use HasFactory;

    protected $table = 'like_rumah'; // Pastikan nama tabel di SQL benar 'favorit'
    protected $primaryKey = 'ID_LIKE';
    
    // PENTING: Matikan timestamps default (created_at, updated_at)
    // Karena kamu pakai 'WAKTU_FAVORIT'
    public $timestamps = false; 

    // PENTING: Daftar kolom yang BOLEH diisi
    protected $fillable = [
        'ID_RUMAH',
        'ID_USERNAME',
        'WAKTU_LIKE'
    ];

    public function rumah()
    {
        return $this->belongsTo(rumahtampilan::class, 'ID_RUMAH', 'ID_RUMAH');
    }
}