import { FC } from 'react';
import { router } from '@inertiajs/react';
import Rumah from '@/assets/rumah.jpg'
import Logo from '@/assets/logo.PNG'
const Welcome: FC = () => {

  const handleClick = () => {
    router.visit('/ask'); 
    
  };
  return (
    <div className="h-screen relative w-full md:w-full">
      <img
        src={Rumah}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative flex h-full items-center justify-center px-4">
        <div className="text-center w-full text-white">
          <img
            src={Logo}
            alt="logo"
            className="mx-auto w-[600px] mb-2"
          />

          <h1 className="text-3xl md:text-5xl font-bold text-[#F7F4EE] mb-3">
            Find Your Dream Home
          </h1>

          <p className="text-sm md:text-2xl text-[#F7F4EE] font-bold max-w-xl mx-auto">
            Discover properties in your desirable design and locations. Your perfect home awaits.
          </p>

          <button
            onClick={handleClick}
            className="mt-4 bg-[#F7F4EE] rounded-md px-10 py-2 text-black font-bold cursor-pointer hover:bg-white"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
