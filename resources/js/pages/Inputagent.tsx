import { FC, useEffect, useState, ChangeEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faLocationDot, faBed, faBath, faUser, faCar } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faSquare } from '@fortawesome/free-regular-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Citra from '@/assets/LOGO-CITRALAND.jpg'
import { router } from '@inertiajs/react';
import MainLayout from '@/component/MainLayoutCompany';

function Inputagen() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    const handleImage = (e: any) => {
       setImage(e.target.files[0]); 
    };
    const handleSave = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    if (image) {
    formData.append("image", image);   // ⬅️ tambahkan file
    }

    router.post('/agen', formData, {
        forceFormData: true,   // ⬅️ penting di Inertia
    });
   }
  return (
    <MainLayout  >
        <div className='min-h-screen bg-white pb-30 pt-30 '>
            <div className='flex items-center justify-center  px-10 py-10 bg-[#DDD7C9] relative'>
                <FontAwesomeIcon onClick={() => router.visit('/agen')} icon={faAngleLeft} className='absolute fa-3x left-20 cursor-pointer'/>
                <h1 className='text-3xl font-semibold '>INPUT AGEN</h1>
            </div>
            <div className='w-full max-w-4xl mx-auto px-6 mt-30'>
             <form onSubmit={handleSave}>  
                <label className='block font-bold mb-2 text-xl'>Foto Agen</label>
                <input type='file' accept='image/*' id='fileInput' className='hidden' ref={fileRef} onChange={handleImage}></input>
                <div onClick={() => fileRef.current?.click()} className='w-1/4 mt-5 h-50 border-2 border-gray-400 rounded-lg flex justify-center items-center cursor-pointer overflow-hidden'>
                    {image ? ( <img src={URL.createObjectURL(image)} className='w-full h-full object-cover rounded-lg'></img> ) : (
                    <span className='text-3xl text-gray-500'>+</span>
                    )}
                </div>
                <label className='block mt-6 text-xl font-bold'>Nama Agen</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Masukkan nama agen' className='w-full border  rounded-md p-3 mt-2'/> 
                <label className='block mt-6 text-xl font-bold'>Nomor Telepon Agen</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)}  type='text' placeholder='Masukkan nomor telpon agen' className='w-full border  rounded-md p-3 mt-2'/> 
                <label className='block mt-6 text-xl font-bold'>Email Agen</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}  type='text' placeholder='Masukkan email agen' className='w-full border  rounded-md p-3 mt-2'/> 
                <div className='flex gap-6 mt-10'>
                    <button className='px-5 py-3 bg-[#C3C1BF] text-black rounded-md font-bold cursor-pointer'>Remove</button>
                    <button  type='submit' className='px-8 py-3 bg-[#707070] text-white rounded-md font-bold cursor-pointer'>Save</button>
                </div>
                </form> 
            </div>
        </div>
    </MainLayout>
  );
}

export default Inputagen;
