<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginUser;
use App\Http\Controllers\logincompany;
use App\Http\Controllers\register;
use App\Http\Controllers\registercompany;
use App\Http\Controllers\logingoogle;
use App\Http\Controllers\logingooglecompany;
use App\Http\Controllers\tampilancompany;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ReservasiSurveyController;
use App\Http\Controllers\AgenController;
use App\Http\Controllers\RumahController;
use App\Http\Controllers\tambahrumah;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\CompanyDashboardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\FavoritController;


// FORM RESERVASI
Route::get('/home/daftar-properti/deskripsi-rumah/reservasi', function () {
    return Inertia::render('Reservasi');
})->name('reservasi.create');

// SIMPAN DATA RESERVASI
Route::post('/home/daftar-properti/deskripsi-rumah/reservasi/konfirmasi', [ReservasiSurveyController::class, 'store'])
    ->name('reservasi.store');

// Bisa untuk GET + POST sekaligus
Route::post('/chatbot', [ChatbotController::class, 'chat']);
Route::get('/chat', fn () => Inertia::render('Chat'));


/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/
Route::get('/', fn () => Inertia::render('Welcome'));
Route::get('/ask', fn () => Inertia::render('Ask'));
Route::get('/otp-email', fn () => Inertia::render('Otpemail'));

/*
|--------------------------------------------------------------------------
| AUTH USER
|--------------------------------------------------------------------------
*/
Route::get('/login', fn () => Inertia::render('Login'))->name('login');

Route::post('/login-user', [LoginUser::class, 'login'])
    ->name('login.submit');

Route::get('/signin', fn () => Inertia::render('Signin'))
    ->name('signin.page');

Route::post('/signin', [register::class, 'signin'])
    ->name('signin.submit');

/*
|--------------------------------------------------------------------------
| AUTH COMPANY
|--------------------------------------------------------------------------
*/
Route::get('/login-company', fn () => Inertia::render('LoginCompany'))
    ->name('login-company');

Route::post('/login-company', [logincompany::class, 'login'])
    ->name('login-company.submit');

Route::get('/signup-company', fn () => Inertia::render('SignupCompany'))
    ->name('signup-company.page');

Route::post('/signup-company', [registercompany::class, 'signup'])
    ->name('signup-company.submit');

/*
|--------------------------------------------------------------------------
| COMPANY DASHBOARD & ACCOUNT ✅ BENAR
|--------------------------------------------------------------------------
*/
Route::prefix('company')->group(function () {

    // ✅ DASHBOARD LEWAT CONTROLLER
   Route::get('/dashboard', [CompanyDashboardController::class, 'show'])
    ->middleware('auth:company')
    ->name('company.dashboard');

    Route::get('/account-company', fn () => Inertia::render('Accountcompany'));
    Route::get('/account-company/editaccount-company', fn () => Inertia::render('Editaccountcompany'));
    Route::get('/account-company/editaccount-company/change-password-company', fn () => Inertia::render('Changepasswordcompany'));
});
Route::get('/account-company', function () {
    return Inertia::render('Accountcompany'); 
});
Route::get('/account-company/editaccount-company', function () {
    return Inertia::render('Editaccountcompany'); 
});
Route::get('/account-company/editaccount-company/change-password-company', function () {
    return Inertia::render('Changepasswordcompany'); 
});




Route::get('/history', [HistoryController::class, 'index'])
    ->name('history.index');

Route::post('/history', [HistoryController::class, 'store'])
    ->name('history.store');

// HISTORY
Route::get('/history', [HistoryController::class, 'index'])
    ->name('history.index');
Route::post('/favorit/toggle', [FavoritController::class, 'toggle'])->name('favorit.toggle'); //FAVORIT 
// // Group ini memberi awalan "/home" untuk semua route di dalamnya
// Route::prefix('home')->group(function () {

//     // Ubah '/home' jadi '/' agar URL-nya: localhost:8000/home
//     Route::get('/', [HomeController::class, 'index'])->name('home'); 
    
//     // URL: localhost:8000/home/daftar-properti
//     Route::get('/daftar-properti', fn () => Inertia::render('Daftarproperti'))
//         ->name('home.properti');

//     // URL: localhost:8000/home/daftar-properti/deskripsi-rumah
//     Route::get('/daftar-properti/deskripsi-rumah/{id}', [HomeController::class, 'show'])
//         ->name('deskripsi.show');
//         Route::post('/favorit/toggle', [FavoritController::class, 'toggle'])->name('favorit.toggle'); //FAVORIT 

//     // URL: localhost:8000/home/company
//     Route::get('/company', fn () => Inertia::render('Company'));
// });



/*
|--------------------------------------------------------------------------
| GOOGLE AUTH
|--------------------------------------------------------------------------
*/
Route::get('/auth/google', [logingoogle::class, 'redirect'])
    ->name('google.redirect');

Route::get('/auth/google/callback', [logingoogle::class, 'callback'])
    ->name('google.callback');

Route::get('/auth/google-company/redirect', [logingooglecompany::class, 'redirect'])
    ->name('google-company.redirect');

Route::get('/auth/google-company/callback', [logingooglecompany::class, 'callback'])
    ->name('google-company.callback');

/*
|--------------------------------------------------------------------------
| HOME (USER)
|--------------------------------------------------------------------------
*/
Route::prefix('home')->group(function () {

    Route::get('/home', [PropertyController::class, 'index'])
    ->name('home');

    Route::get('/daftar-properti', fn () => Inertia::render('Daftarproperti'))
        ->name('home.properti');

    Route::get('/daftar-properti/deskripsi-rumah', fn () => Inertia::render('Deskripsirumah'));

    Route::get('/company', fn () => Inertia::render('Company'));
});/*
|--------------------------------------------------------------------------
| PROMO
|--------------------------------------------------------------------------
*/
Route::get('/promo', fn () => Inertia::render('Promo'));
Route::get('/promo/daftar-promo', fn () => Inertia::render('Caripromo'));

// Route::get('/home', function () {
//     return Inertia::render('Home'); 
// });
Route::get('/home/daftar-properti', [PropertyController::class, 'index'])->name('home.daftarproperti');

// Route::get('/home/daftar-properti', function () {
//     return Inertia::render('Daftarproperti'); 
// });
// Route::get('/home/daftar-properti/deskripsi-rumah', function () {
//     return Inertia::render('Deskripsirumah');
// });
// web.php
Route::get('/home/daftar-properti/deskripsi-rumah/{id}', [PropertyController::class, 'show'])
    ->name('property.show');

/*
|--------------------------------------------------------------------------
| USER ACCOUNT
|--------------------------------------------------------------------------
*/
Route::get('/account', fn () => Inertia::render('Account'));
Route::get('/account/change-password', fn () => Inertia::render('Changepassword'));

/*
|--------------------------------------------------------------------------
| INPUT & AGENT
|--------------------------------------------------------------------------
*/
Route::get('/input-rumah', [tambahrumah::class, 'index'])
    ->name('input.rumah');
// simpan rumah (form upload)
Route::post('/input-rumah/upload-rumah', [tambahrumah::class, 'signup'])
    ->name('input.rumah.store');
// web.php
Route::delete('/input-rumah/{id}', [tambahrumah::class, 'destroy'])->name('hapus.rumah');

Route::get('/input-rumah/upload-rumah', [RumahController::class, 'create'])
    ->name('input.rumah.create');

// Route::get('/agen', fn () => Inertia::render('Agen'));
// Route::get('/agen/input-agen', fn () => Inertia::render('Inputagent'));


Route::get('/agen', [AgenController::class, 'index']);
Route::get('/agen/input-agen', fn () => Inertia::render('Inputagent'));
Route::post('/agen', [AgenController::class, 'store']);


Route::get(
    '/home/daftar-properti/deskripsi-rumah/reservasi',
    fn () => Inertia::render('Reservasi')
)->name('reservasi.form');

// SIMPAN + KONFIRMASI
Route::post(
    '/reservasi/store',
    [ReservasisurveyController::class, 'store']
)->name('reservasi.store');

use App\Http\Controllers\CompanyController;

Route::get('/companies', [CompanyController::class, 'index']);
Route::post('/companies', [CompanyController::class, 'store']);
Route::get('/houses', [PropertyController::class, 'all']);
Route::post('/houses/{id}/like', [PropertyController::class, 'like']);
Route::get('/home/company/category', [CompanyController::class, 'category']);

Route::get('/home/company/{company}', [CompanyController::class, 'show'])
    ->name('company.show');





