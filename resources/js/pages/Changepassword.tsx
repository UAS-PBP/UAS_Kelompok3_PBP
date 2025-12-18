import { FC } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import Logo2 from '@/assets/logo2.PNG'

const Changepassword: FC = () => {
  return (
    <div className='min-h-screen w-full flex flex-col bg-white'>
        <div className=' flex  items-center relative w-full h-40 px-10 '>
            <div onClick={() => router.visit("/home/daftar-properti")} className=" absolute  top-1/2 -translate-y-1/2 cursor-pointer px-10 ">
                <FontAwesomeIcon icon={faArrowLeft} className="fa-2x cursor-pointer"/>
            </div>
            <div className='mx-auto flex flex-col pt-15'>
                <div>
                    <img src={Logo2} alt="Logo" className='w-[350px] mb-3' />
                </div>
                <div className='px-10'>
                    <h1 className='text-4xl font-bold text-center mb-10'>Change Password</h1>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-8 w-full items-center justify-center mt-30'>
            <div className='gap-2  flex flex-col ' >
                <label className='font-bold text-black'>Old Password</label>
                <input type='text' className='border border-gray-400 rounded-xl px-10 py-3 w-[750px]'></input>
            </div>
            <div className='gap-2  flex flex-col  ' >
                <label className='font-bold text-black'>New Password</label>
                <input type='password' className='border border-gray-400 rounded-xl px-10 py-3 w-[750px]'></input>
            </div>
            <div className='gap-2  flex flex-col ' >
                <label className='font-bold text-black'>Confirm New Password</label>
                <input type='email' className='border border-gray-400 rounded-xl px-10 py-3 w-[750px]'></input>
            </div>
            <div className='flex mt-10 gap-10'>
                <button className='bg-[#2C3638] rounded-lg text-white text-center px-8 py-3 font-bold hover:bg-[#2C3638]/20 cursor-pointer'>Save</button>
                 <button className='bg-[#2C3638] rounded-lg text-white text-center px-5 py-3 font-bold  hover:bg-[#2C3638]/20 cursor-pointer'>Cancel</button>
            </div>
        </div>
        
    </div>
  );
};

export default Changepassword;
