import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Logo from '@/assets/logo.PNG';
import { router, useForm } from '@inertiajs/react';

const Login: FC = () => {

  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login-user'); // sesuai route Laravel kamu
  };

  const handleSignInClick = () => {
    router.visit('/signin');
  };

  return (
    <div className="h-screen relative w-full flex flex-col md:flex-row">
      <img
        src={Rumah}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center px-4 relative">
        <form
          onSubmit={handleSubmit}
          className="bg-[#3E3D3C] p-6 md:p-10 rounded-2xl w-full max-w-[300px] md:max-w-[500px] shadow-lg"
        >
          <h1 className="text-white text-3xl md:text-5xl font-semibold text-center mb-2">
            Login
          </h1>
          <h3 className="text-base text-white text-center mx-auto mb-6">
            Log in to your account
          </h3>

          {/* USERNAME */}
          <div className="flex flex-col gap-3 relative mb-4 mt-10">
            <label className="text-white font-medium text-lg">Username</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={data.username}
                onChange={e => setData('username', e.target.value)}
                placeholder="Masukkan nama anda"
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-3 relative mb-6">
            <label className="text-white font-medium text-lg">Password</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                placeholder="Masukkan password anda"
                className="w-full pl-10 py-2 rounded-lg bg-white focus:outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}
          </div>

          {/* BUTTON */}
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
              onClick={() => (window.location.href = '/auth/google')}
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

          <p
            onClick={handleSignInClick}
            className="text-white mt-4 mx-auto text-center block cursor-pointer hover:underline mb-10"
          >
            Doesn't have an account? <span className="text-white">Sign Up</span>
          </p>
        </form>
      </div>

      <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center relative">
        <img src={Logo} alt="logo" className="w-[450px]" />
        <h1 className="text-4xl md:text-6xl text-[#F7F4EE] mx-auto font-bold">
          HomeLinkID
        </h1>
      </div>
    </div>
  );
};

export default Login;