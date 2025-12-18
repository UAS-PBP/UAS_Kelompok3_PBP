import { FC,useState, ChangeEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faLocationDot, faBed, faBath, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faSquare } from '@fortawesome/free-regular-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Citra from '@/assets/LOGO-CITRALAND.jpg'
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayoutCompany';
interface Agent {
    ID_AGEN: number;
    NAMA_AGEN: string;
    NOMOR_HP_AGEN:string;
    EMAIL_AGEN: string;
    IMAGE: string;
}

const AgentCard: FC<{item: Agent}> = ({ item }) => {
  return (
    <div className='bg-white shadow-lg rounded-xl px-6 py-4 w-[600px] h-[300px] flex items-center'>
      <img src={`/storage/${item.IMAGE}`} className='w-50 h-50 object-cover rounded-lg items-center justify-center mx-5'></img>
      <div className='mt-3 text-lg flex flex-col px-5'>
        <p className='font-semibold'>Nama Agen</p>
        <p>{item.NAMA_AGEN}</p>
        <p className='font-semibold mt-2'>No.Telpon</p>
        <p>{item.NOMOR_HP_AGEN}</p>
        <p className='font-semibold mt-2'>Email</p>
        <p className='break-all'>{item.EMAIL_AGEN}</p>
      </div>
    </div>
  );
}
function Agen() {
    const { agens } = usePage().props as { agens: Agent[] };
    return(
    <MainLayout  >
        <div className='flex flex-col items-center w-full min-h-screen bg-[#F7F4EE]  pt-30'>
            <div className='w-full  bg-[#F7F4EE] flex items-center justify-end gap-10 pt-10 pb-10'>
                <button onClick={() => router.visit('/agen/input-agen')} className='px-10 py-6 rounded-3xl bg-[#6F6C65] text-xl text-white font-semibold cursor-pointer hover:bg-[#DDD7C9]'>Input Agen</button>
                <button className='px-10 py-6 rounded-3xl bg-[#6F6C65] text-xl text-white font-semibold mr-30 cursor-pointer hover:bg-[#DDD7C9]'>Hapus Agen</button>
            </div>
            {agens.length === 0 ? ( 
                <div className='text-center items-center justify-center'>
                    <p className='text-2xl font-semibold text-black'>Belum ada agen yang terdaftar</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[100px] mt-6 justify-items-center '>
                    {agens.map((item) => (
                    <AgentCard key={item.ID_AGEN} item={item} />
                    ))}
                </div>
            )}
        </div>
    </MainLayout>
  );
}

export default Agen;
