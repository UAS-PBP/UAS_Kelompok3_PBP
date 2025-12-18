import { FC } from 'react';
import { router } from '@inertiajs/react';
import Rumah from '@/assets/rumah.jpg'
import Logo from '@/assets/logo.PNG'

const Ask: FC = () => {

  const handleClick = () => {
    router.visit('/login');
  };
  const handleClickCompany = () => {
    router.visit('/login-company');
  };
  return (
    <div className="h-screen relative w-full">
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
            className="mx-auto w-[500px] mb-2"
          />

          <p className="text-sm md:text-2xl text-[#F7F4EE] font-medium max-w-xl mx-auto">
            Are you a Buyer? or a Company?
          </p>
          <p className="text-sm md:text-2xl text-[#F7F4EE] font-semibold max-w-xl mx-auto">
            Choose between this two!
          </p>

          <div className="gap-10 flex justify-center">
            <button
              onClick={handleClick}
              className="mt-4 bg-[#F7F4EE] rounded-md px-13 py-2 text-black font-bold cursor-pointer hover:bg-white"
            >
              Buyer
            </button>
            <button
              onClick={handleClickCompany}
              className="mt-4 bg-[#F7F4EE] rounded-md px-10 py-2 text-black font-bold cursor-pointer hover:bg-white"
            >
              Company
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ask;
