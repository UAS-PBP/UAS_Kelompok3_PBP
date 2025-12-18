<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    protected $table = 'history'; // Sesuaikan nama tabel history kamu
    protected $primaryKey = 'ID_HISTORY';
    public $timestamps = false; // Set false jika tidak pakai created_at/updated_at default

    protected $fillable = [
        'ID_USERNAME',
        'USERNAME_PENGGUNA',
        'EMAIL',
        'ID_RUMAH',
        'WAKTU_HISTORY'
    ];

    public function rumah()
    {
        return $this->belongsTo(rumahtampilan::class, 'ID_RUMAH', 'ID_RUMAH');
    }
}