<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class agen extends Model
{
    protected $table = 'agenfiks';
    protected $primaryKey = 'ID_AGEN';
    public $timestamps = true;
    protected $fillable = [
        'ID_PERUSAHAAN',
        'ID_AGEN',
        'NAMA_AGEN',
        'NOMOR_HP_AGEN',
        'EMAIL_AGEN',
        'IMAGE',
    ];
    public function rumahtampilan()
{
    return $this->hasMany(rumahtampilan::class, 'ID_PERUSAHAAN', 'ID_PERUSAHAAN');
}
public function company()
{
    return $this->belongsTo(company::class, 'ID_PERUSAHAAN', 'ID_PERUSAHAAN');
}

}