import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEnvelope,
  faPhone,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';

import Rumah from '@/assets/rumah.jpg';
import Logo from '@/assets/logo.PNG';
import { router } from '@inertiajs/react';

const SignUpCompany: FC = () => {
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = () => {
    router.visit('/login-company');
  };

  const handleSignClick = () => {
    if (
      !name ||
      !companyId ||
      !email ||
      !phone ||
      !location ||
      !password
    ) {
      setError('Semua field harus diisi');
      return;
    }

    setError('');

    router.post('/signup-company', {
      companyId: companyId,
      name: name,
      email: email,
      phone: phone,
      location: location,
      password: password,
    });
  };

  return (
    <div className="h-screen relative w-full flex">
      {/* Background */}
      <img
        src={Rumah}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center px-4 relative">
        <div className="bg-[#3E3D3C] p-10 rounded-2xl w-[500px] shadow-lg">
          <h1 className="text-white text-5xl font-semibold text-center mb-2">
            Sign Up
          </h1>
          <h3 className="text-base text-white text-center mb-4">
            Register your company account
          </h3>

          {error && (
            <div className="bg-red-500/20 text-red-300 text-center p-2 rounded mb-3">
              {error}
            </div>
          )}

          {/* Name Company */}
          <div className="flex flex-col mb-2">
            <label className="text-white font-medium">Name Company</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faBuilding}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama perusahaan"
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* ID Company */}
          <div className="flex flex-col mb-2">
            <label className="text-white font-medium">ID Company</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="Masukkan ID resmi perusahaan"
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col mb-2">
            <label className="text-white font-medium">Email Company</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email perusahaan"
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col mb-2">
            <label className="text-white font-medium">Phone Number</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Masukkan nomor telepon"
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col mb-2">
            <label className="text-white font-medium">Location Company</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Masukkan lokasi perusahaan"
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col mb-6">
            <label className="text-white font-medium">Password</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSignClick}
            className="w-full bg-[#6F6C65] text-white font-semibold py-2 rounded-lg hover:bg-[#D4CFC1] transition"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p
            onClick={handleLoginClick}
            className="text-white mt-4 text-center cursor-pointer hover:underline"
          >
            Already have an account? Log In
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative -translate-x-10">
        <img src={Logo} alt="logo" className="w-[450px]" />
        <h1 className="text-6xl text-[#F7F4EE] font-bold">HomeLinkID</h1>
      </div>
    </div>
  );
};

export default SignUpCompany;