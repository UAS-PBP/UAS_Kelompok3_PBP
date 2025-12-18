import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone, faPerson } from '@fortawesome/free-solid-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Logo from '@/assets/logo.PNG';
import { router, useForm } from '@inertiajs/react';

const SignIn: FC = () => {

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    telp: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/signin"); // route POST ke Laravel
  };

  return (
    <div className="h-screen relative w-full flex">

      <img src={Rumah} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50"></div>

      <form onSubmit={handleSubmit} className="w-full md:w-1/2 min-h-screen flex justify-center items-center px-4 relative">
        <div className="bg-[#3E3D3C] p-10 rounded-2xl w-[450px] md:w-[500px] shadow-lg">
          <h1 className="text-white text-5xl font-semibold text-center mb-2">Sign Up</h1>
          <h3 className="text-base text-white text-center mx-auto mb-6">Register your account</h3>

          {/* NAMA */}
          <div className="relative mb-2">
            <label className="text-white font-medium text-lg">Name</label>
            <div className="relative">
              <FontAwesomeIcon icon={faPerson} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={data.name}
                onChange={e => setData("name", e.target.value)}
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
                placeholder="Masukkan nama anda"
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div className="relative mb-2">
            <label className="text-white font-medium text-lg">Email</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={data.email}
                onChange={e => setData("email", e.target.value)}
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
                placeholder="Masukkan email anda"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          {/* TELP */}
          <div className="relative mb-2">
            <label className="text-white font-medium text-lg">No. Telpon</label>
            <div className="relative">
              <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={data.telp}
                onChange={e => setData("telp", e.target.value)}
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
                placeholder="Masukkan nomor telpon anda"
              />
            </div>
            {errors.telp && <p className="text-red-400 text-sm">{errors.telp}</p>}
          </div>

          {/* USERNAME */}
          <div className="relative mb-2">
            <label className="text-white font-medium text-lg">Username</label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={data.username}
                onChange={e => setData("username", e.target.value)}
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
                placeholder="Masukkan username anda"
              />
            </div>
            {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">
            <label className="text-white font-medium text-lg">Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={data.password}
                onChange={e => setData("password", e.target.value)}
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
                placeholder="Masukkan password anda"
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          </div>

          <button
            disabled={processing}
            className="w-[300px] mx-auto bg-[#6F6C65] text-white font-semibold py-2 rounded-lg flex justify-center border border-white hover:bg-[#D4CFC1]"
            type="submit"
          >
            {processing ? 'Loading...' : 'Sign Up'}
          </button>

          <p onClick={() => router.visit('/login')} className="text-white mt-4 text-center cursor-pointer hover:underline">
            Already have an account? <span className="text-white">Log In</span>
          </p>
        </div>
      </form>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative -translate-x-10">
        <img src={Logo} className="w-[450px]" />
        <h1 className="text-4xl md:text-6xl text-[#F7F4EE] mx-auto font-bold">HomeLinkID</h1>
      </div>
    </div>
  );
  
};

export default SignIn;