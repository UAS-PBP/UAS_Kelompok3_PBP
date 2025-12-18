import { FC, useEffect, useState, ChangeEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { faMessage, faSquare, faHeart } from '@fortawesome/free-regular-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Citra from '@/assets/LOGO-CITRALAND.jpg'
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout';


function Konfirmasi() {
  return (
    <MainLayout >
      <div className='w-full  flex  items-center justify-center bg-[#F7F4EE] min-h-screen overflow-y-scroll pt-[200px]'>
        <div onClick={() => router.visit("/home/daftar-properti")} className="fixed px-30 pt-8 top-30 left-0">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="fa-2x cursor-pointer"
                />
              </div>
        <div className='max-w-2xl rounded-xl shadow-lg pb-10 w-full bg-white mb-30 '>
            <div className='bg-[#DDD7C9] text-center rounded-t-xl px-5 py-6'>
                <h1 className='font-bold text-2xl'>JADWAL SURVEY</h1>
            </div>
            <div className='px-10 mt-8 grid grid-cols-2 gap-y-4'>
                <p className='font-semibold'>Nama</p>
                <p>: MARETA</p>

                <p  className='font-semibold'>Nomor Telepon</p>
                <p>: 081234567890</p>

                <p  className='font-semibold'>Nama Rumah</p>
                <p>: 081234567890</p>

                <p  className='font-semibold'>Lokasi Rumah</p>
                <p>: 081234567890</p>

                <p  className='font-semibold'>Tanggal Survey</p>
                <p>: 081234567890</p>

                <p  className='font-semibold'>Jam Survey</p>
                <p>: </p>
            </div>
            <ul className='mt-10 px-10 font-semibold leading-relaxed'>
                    <li>Terima kasih telah melakukan reservasi survey, perusahaan dari rumah yang anda pilih akan segera menghubungi anda maksimal  24 jam sebelum jadwal survey.</li>
                </ul>
        </div>
      </div>
      
    </MainLayout>
  );
}

export default Konfirmasi;
