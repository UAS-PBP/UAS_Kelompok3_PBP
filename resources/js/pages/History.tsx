import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Hapus faCalendarDays dari sini, biarkan yang dipakai saja
import { faLocationDot, faTrash, faArrowRight, faHeart, faClock } from '@fortawesome/free-solid-svg-icons';
import RumahDefault from '@/assets/rumah.jpg';

// INTERFACE DATA
interface RumahData {
    ID_RUMAH: number;
    NAMA_RUMAH: string;
    LOKASI_RUMAH: string;
    HARGA_ASLI: number;
    IMAGE: string;
}

interface HistoryItem {
    ID_HISTORY: number;
    WAKTU_HISTORY: string;
    rumah: RumahData | null;
}

interface FavoriteItem {
    ID_FAVORIT: number;
    WAKTU_FAVORIT: string;
    rumah: RumahData | null;
}

interface PageProps {
    histories: HistoryItem[];
    favorites: FavoriteItem[];
}

export default function History({ histories, favorites }: PageProps) {
    
    const [activeTab, setActiveTab] = useState<'recent' | 'favorites'>('recent');

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { 
            day: 'numeric', month: 'short', year: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    };

    // PERBAIKAN TYPE SCRIPT DI SINI:
    // Kita ganti 'any' menjadi Union Type (HistoryItem | FavoriteItem)
    const renderCard = (item: HistoryItem | FavoriteItem, type: 'history' | 'favorite') => {
        
        // Kita ambil ID dan Waktu secara spesifik agar TypeScript tidak bingung
        // Menggunakan "Type Assertion" (as ...) agar aman
        const uniqueKey = type === 'history' 
            ? (item as HistoryItem).ID_HISTORY 
            : (item as FavoriteItem).ID_FAVORIT;
            
        const waktu = type === 'history' 
            ? (item as HistoryItem).WAKTU_HISTORY 
            : (item as FavoriteItem).WAKTU_FAVORIT;

        const labelWaktu = type === 'history' ? 'Dilihat' : 'Disukai';
        const iconWaktu = type === 'history' ? faClock : faHeart;

        return (
            <div 
                key={uniqueKey} 
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
            >
                {item.rumah ? (
                    <>
                        {/* GAMBAR */}
                        <div className="relative h-48 overflow-hidden group cursor-pointer" onClick={() => router.visit(`/home/daftar-properti/deskripsi-rumah/${item.rumah!.ID_RUMAH}`)}>

                            <img 
                                src={item.rumah.IMAGE && item.rumah.IMAGE !== "" ? `/storage/${item.rumah.IMAGE}` : RumahDefault} 
                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {e.currentTarget.src = RumahDefault}}
                                alt={item.rumah.NAMA_RUMAH}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#2C3638] shadow-sm flex items-center gap-1">
                                <FontAwesomeIcon icon={iconWaktu} className={type === 'favorite' ? 'text-red-500' : 'text-gray-600'} />
                                <span>{labelWaktu}: {formatDate(waktu)}</span>
                            </div>
                        </div>

                        {/* TEXT INFO */}
                        <div className="p-5 flex flex-col flex-grow justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-[#2C3638] mb-1 line-clamp-1">
                                    {item.rumah.NAMA_RUMAH}
                                </h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                                    <FontAwesomeIcon icon={faLocationDot} className="text-[#575F48]" /> 
                                    {item.rumah.LOKASI_RUMAH}
                                </p>
                                <p className="text-xl font-bold text-[#575F48]">
                                    {formatRupiah(item.rumah.HARGA_ASLI)}
                                </p>
                            </div>

                            <button 
                                onClick={() => router.visit(`/home/daftar-properti/deskripsi-rumah/${item.rumah!.ID_RUMAH}`)}
                                className="mt-5 w-full bg-[#2C3638] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1f2628] transition-colors flex justify-center items-center gap-2 cursor-pointer"
                            >
                                Lihat Detail <FontAwesomeIcon icon={faArrowRight}/>
                            </button>
                        </div>
                    </>
                ) : (
                    // JIKA ITEM DIHAPUS
                    <div className="p-10 flex flex-col items-center justify-center text-center h-full text-gray-400">
                        <FontAwesomeIcon icon={faTrash} className="text-4xl mb-3" />
                        <p className="font-bold">Properti Tidak Tersedia</p>
                        <p className="text-xs mt-2">{labelWaktu}: {formatDate(waktu)}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <MainLayout>
            <Head title="Aktivitas Saya" />
            
            <div className="bg-[#F9F5ED] min-h-screen pt-35 pb-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl font-bold text-[#2C3638] mb-2">Aktivitas Saya</h1>
                        <p className="text-gray-500">Lihat riwayat penelusuran dan properti yang Anda sukai.</p>
                    </div>

                    {/* TAB SWITCHER */}
                    <div className="flex gap-4 mb-8 border-b border-gray-300 pb-1">
                        <button 
                            onClick={() => setActiveTab('recent')}
                            className={`pb-3 px-4 text-lg font-bold transition-all ${
                                activeTab === 'recent' 
                                ? 'text-[#2C3638] border-b-4 border-[#2C3638]' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            Riwayat ({histories.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('favorites')}
                            className={`pb-3 px-4 text-lg font-bold transition-all ${
                                activeTab === 'favorites' 
                                ? 'text-[#2C3638] border-b-4 border-[#2C3638]' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            Favorit ({favorites.length})
                        </button>
                    </div>

                    {/* CONTENT GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeTab === 'recent' ? (
                            histories.length > 0 ? (
                                histories.map((item) => renderCard(item, 'history'))
                            ) : (
                                <div className="col-span-full text-center py-20 text-gray-400">
                                    <FontAwesomeIcon icon={faClock} className="text-4xl mb-4 opacity-20"/>
                                    <p className="text-xl">Belum ada riwayat penelusuran.</p>
                                </div>
                            )
                        ) : (
                            favorites.length > 0 ? (
                                favorites.map((item) => renderCard(item, 'favorite'))
                            ) : (
                                <div className="col-span-full text-center py-20 text-gray-400">
                                    <FontAwesomeIcon icon={faHeart} className="text-4xl mb-4 opacity-20"/>
                                    <p className="text-xl">Belum ada properti favorit.</p>
                                </div>
                            )
                        )}
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}