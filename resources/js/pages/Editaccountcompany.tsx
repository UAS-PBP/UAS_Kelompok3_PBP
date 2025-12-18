import { FC } from 'react';
import { router, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import Rumah from '@/assets/rumah.jpg'
import Logo2 from '@/assets/logo.PNG'

const Editaccountcompany: FC = () => {
    const { data, setData, post, processing, errors } = useForm({
    company_name: '',
    password: '',
    email: '',
    certificate: null as File | null,
    });
  return (
    <div className='min-h-screen w-full flex flex-col bg-white'>
        <div className='h-[550px] w-full relative rounded-b-[60px] overflow-hidden'>
            <div >
                <img src={Rumah} alt='background' className='absolute inset-0 w-full h-full object-cover ' />
                <div className='absolute inset-0 bg-black/50 '></div>
            </div>
            <div className=' flex  items-center relative w-full  h-40 px-20 '>
                <div onClick={() => router.visit("/account-company")} className=" absolute  top-1/2 -translate-y-1/2 cursor-pointer px-10 z-50 ">
                    <FontAwesomeIcon icon={faArrowLeft} className="fa-3x cursor-pointer text-white"/>
                </div>
                <div className='items-center justify-center flex flex-col inset-0 absolute pt-50 '>
                    <div>
                        <img src={Logo2} alt="Logo" className='w-[400px] mb-3' />
                    </div>
                    <div className='px-10'>
                        <h1 className='text-5xl font-bold text-white text-center mb-10'>Account Settings</h1>
                    </div>
                </div>
            </div>
        <div className='flex flex-col items-center pt-50 inset-0 justify-center absolute'>
            <div className='bg-white rounded-xl px-13 py-13 border border-gray-600'>
                <FontAwesomeIcon icon={faUser} className='fa-2x'/>
            </div>
            <label className='mt-4  text-center bg-[#F7F4EE] px-3 py-2 rounded-lg text-black font-semibold cursor-pointer'>
                Upload picture
                <input type='file' className='hidden ' />
            </label>
        </div>
        </div>
        <div className='flex flex-col w-full items-center justify-center mt-13'>
            <div className='gap-2  flex flex-col mb-3 ' >
                <label className='font-bold text-xl text-black'>Company Name</label>
                <input type='text' className='border border-gray-400 rounded-xl px-10 py-5 w-[800px]'value={data.company_name}></input>
            </div>
            <div className='gap-2  flex flex-col ' >
                <label className='font-bold text-xl text-black'>Password</label>
                <input type='password' className='border border-gray-400 rounded-xl px-10 py-5 w-[800px]'></input>
                <div onClick={() => router.visit("/account-company/editaccount-company/change-password-company")} className='self-end cursor-pointer text-blue-400 font-semibold '>Change</div>
            </div>
            <div className='gap-2  flex flex-col mb-3 ' >
                <label className='font-bold text-xl text-black'>Email Address</label>
                <input type='email' className='border border-gray-400 rounded-xl px-10 py-5 w-[800px]'value={data.email}></input>
            </div>
            <div className='gap-2  flex flex-col ' >
                <label className='font-bold text-xl text-black'>Certificate Company</label>
                <input type='file' className='border border-gray-400 rounded-xl px-10 py-5 w-[800px] cursor-pointer'onChange={(e) => setData('certificate', e.target.files?.[0] ?? null)}></input>
            </div>
        </div>
        <div className='flex w-full items-center justify-center mt-10 gap-10'>
                <button onClick={() => router.visit('/account-company')} className='bg-[#2C3638] rounded-lg justify-start text-white text-center px-8 py-3 font-bold cursor-pointer mb-20'>Save</button>
                <button onClick={() => router.visit('/login-company')} className='bg-[#2C3638] rounded-lg justify-end text-white  text-center px-5 py-3 font-bold cursor-pointer mb-20'>Log Out</button>
            </div>
        
    </div>
  );
};

export default Editaccountcompany;
