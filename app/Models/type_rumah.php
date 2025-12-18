<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class type_rumah extends Model
    {
        protected $table = 'type_rumah';
        protected $primaryKey = 'ID_TYPE_RUMAH';
        public $incrementing = true;
        protected $keyType = 'int';
        public $timestamps = false;

        protected $fillable = [
            'ID_PERUSAHAAN',
            'EMAIL_PERUSAHAAN',
            'JENIS_RUMAH'
        ];
}