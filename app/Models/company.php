<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class company extends Authenticatable
{
    protected $table = 'company';
    protected $primaryKey = 'ID_PERUSAHAAN';
    public $timestamps = false;
    protected $fillable = [
        'ID_PERUSAHAAN',
        'NAMA_PERUSAHAAN',
        'ID_AKUN_PERUSAHAAN',
        'PASSWORD_PERUSAHAAN',
        'EMAIL_PERUSAHAAN',
        'LOKASI_PERUSAHAAN',
        'google_id',
        'provider',
        'avatar',
    ];
    


    protected $hidden = [
        'PASSWORD_PERUSAHAAN',
    ];

    protected function casts(): array
    {
        return [
            'PASSWORD_PERUSAHAAN' => 'hashed',
        ];
    }
    public function agen()
    {
        return $this->hasMany(Agen::class, 'ID_PERUSAHAAN', 'ID_PERUSAHAAN');
    }
    public function rumahtampilan()
{
    return $this->hasMany(rumahtampilan::class, 'ID_PERUSAHAAN', 'ID_PERUSAHAAN');
}

}