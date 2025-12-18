import { FC, useEffect, useState, ChangeEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faLocationDot, faBed, faBath, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faSquare, faHeart } from '@fortawesome/free-regular-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Citra from '@/assets/LOGO-CITRALAND.jpg'
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout';


function Reservasi() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [namaRumah, setNamaRumah] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jamSurvey, setJamSurvey] = useState("");
    const jamList = [
        "09.00 AM",
        "11.00 AM",
        "13.00 PM",
        "15.00 PM",
    ]
  return (
    <MainLayout >
      <div className='w-full  flex  items-center justify-center bg-[#F7F4EE] min-h-screen overflow-y-scroll pt-[200px]'>
        <div className='max-w-2xl rounded-xl shadow-lg pb-10 w-full bg-white mb-30 '>
            <div className='bg-[#DDD7C9] text-center rounded-t-xl px-5 py-6'>
                <h1 className='font-bold text-2xl'>RESERVASI SURVEY</h1>
            </div>
            <div className='px-10 mt-6 space-y-4'>
                <div>
                    <label className='font-semibold'>NAMA</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className='w-full mt-2 border border-gray-400 rounded-md px-2 py-3' placeholder='Masukkan nama'></input>
                </div>
                <div>
                    <label className='font-semibold'>No. Telpon</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full mt-2 border border-gray-400 rounded-md px-2 py-3' placeholder='Masukkan nomor telpon anda'></input>
                </div>
                <div>
                    <label className='font-semibold'>NAMA RUMAH</label>
                    <input value={namaRumah} onChange={(e) => setNamaRumah(e.target.value)} className='w-full mt-2 border border-gray-400 rounded-md px-2 py-3' placeholder='Masukkan nama rumah'></input>
                </div>
                <div>
                    <label className='font-semibold'>LOKASI RUMAH</label>
                    <input value={lokasi} onChange={(e) => setLokasi(e.target.value)} className='w-full mt-2 border border-gray-400 rounded-md px-2 py-3' placeholder='Masukkan lokasi rumah yang anda pilih'></input>
                </div> 
                <div>
                    <label className='font-semibold'>TANGGAL RUMAH</label>
                    <input type='date' value={tanggal} onChange={(e) => setTanggal(e.target.value)} className='w-full mt-2 border border-gray-400 rounded-md px-2 py-3' placeholder='Masukkan lokasi rumah yang anda pilih'></input>
                </div> 
                <div>
                    <label className='font-semibold'>JAM SURVEY</label>
                    <div className='border p-3 rounded-md mt-2 space-y-2'>
                        {jamList.map((jam) => (
                            <label key={jam} className='flex items-center gap-3'>
                                <input type='checkbox' checked={jamSurvey === jam} onChange={() => setJamSurvey(jam)} className='w-4 h-4'></input>
                                <span>{jam}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className='flex justify-end gap-4 mt-8'>
                        <button className='px-6 py-3 rounded-md bg-[#DDD7C9] font-semibold cursor-pointer '>Batal</button>
                        <button onClick={() => router.post(
      "/home/daftar-properti/deskripsi-rumah/reservasi/konfirmasi",
      {
        name,
        phone,
        nama_rumah: namaRumah,
        lokasi,
        tanggal,
        jam_survey: jamSurvey,
      }
    )} className='px-5 py-3 rounded-md bg-[#DDD7C9] font-semibold cursor-pointer '>Kirim</button>
                </div>
            </div>
        </div>
      </div>
      
    </MainLayout>
  );
}

export default Reservasi;
