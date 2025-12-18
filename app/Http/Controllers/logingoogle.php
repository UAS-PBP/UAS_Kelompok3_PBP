<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class logingoogle extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::where('google_id', $googleUser->getId())->first();

        if (!$user) {
            $user = User::create([
                'NAMA_ASLI_PENGGUNA' => $googleUser->getName(),
                'USERNAME_PENGGUNA' => $googleUser->getEmail(),
                'EMAIL'             => $googleUser->getEmail(),
                'google_id'         => $googleUser->getId(),
                'provider'          => 'google',
                'avatar'            => $googleUser->getAvatar(),
                'PASSWORD'          => null,
            ]);
        }

        Auth::login($user);

        return redirect()->route('home');
    }
}