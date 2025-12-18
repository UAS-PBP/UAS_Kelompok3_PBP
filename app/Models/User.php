<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'user'; // kalau tabel kamu 'user'

    protected $primaryKey = 'ID_USERNAME';

    public $incrementing = false;

    protected $keyType = 'string';
    
    public $timestamps = false;

    protected $fillable = [
        'ID_USERNAME',
        'NAMA_ASLI_PENGGUNA',
        'USERNAME_PENGGUNA',
        'EMAIL',
        'google_id',
        'provider',
        'avatar',
        'PASSWORD',
    ];

    protected $hidden = [
        'PASSWORD',
    ];
}