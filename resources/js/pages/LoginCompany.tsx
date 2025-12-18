import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Logo from '@/assets/logo.PNG';
import { router, useForm, usePage } from '@inertiajs/react';

const LoginCompany: FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',     // ⬅️ HARUS "name"
    email: '',    // ⬅️ HARUS "email"
    password: '',
  });

  const handleSignInClick = () => {
    router.visit('/signup-company');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login-company');
  };

  return (
    <div className="h-screen relative w-full flex">
      <img
        src={Rumah}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center px-4 relative">
        <div className="bg-[#3E3D3C] p-10 rounded-2xl w-[500px] shadow-lg">
          <h1 className="text-white text-5xl font-semibold text-center mb-2">
            Login
          </h1>
          <h3 className="text-base text-white text-center mx-auto mb-6">
            Log in to your account
          </h3>

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="flex flex-col gap-3 mb-4 mt-10">
              <label className="text-white font-medium text-lg">
                Name Company
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Masukkan nama perusahaan anda"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-3 mb-4">
              <label className="text-white font-medium text-lg">
                Email Company
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  placeholder="Masukkan email perusahaan anda"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-3 mb-6">
              <label className="text-white font-medium text-lg">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="password"
                  placeholder="Masukkan password anda"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col items-center space-y-3">
              <button
                type="submit"
                disabled={processing}
                className="w-[300px] bg-[#6F6C65] text-white font-semibold py-2 rounded-lg border border-white hover:bg-[#D4CFC1]"
              >
                {processing ? 'Loading...' : 'Log In'}
              </button>

              <button
                type="button"
                onClick={() =>
                  (window.location.href = '/auth/google-company/redirect')
                }
                className="w-[300px] bg-white text-black font-semibold py-2 rounded-lg flex justify-center items-center gap-3 border border-gray-300 hover:bg-gray-100"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                <span>Log In with Google</span>
              </button>
            </div>
          </form>

          <a
            onClick={handleSignInClick}
            className="text-white mt-4 mx-auto text-center block cursor-pointer hover:underline mb-10"
          >
            Doesn't have an account? <span>Sign Up</span>
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative -translate-x-10">
        <img src={Logo} alt="logo" className="w-[450px]" />
        <h1 className="text-6xl text-[#F7F4EE] mx-auto font-bold">
          HomeLinkID
        </h1>
      </div>
    </div>
  );
};

export default LoginCompany;