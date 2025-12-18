import { FC, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '@/assets/logo.PNG';
import Logo2 from '@/assets/logo2.PNG';
import { Link, router, usePage } from '@inertiajs/react';

const Navbar: FC = () => {
  const { url } = usePage().props;

  const currentUrl = window.location.pathname;
  const isDaftarProperti = currentUrl === '/home/daftar-properti' || currentUrl === '/chat';
  const isDaftarPromo = currentUrl === '/promo/daftar-promo';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (path: string): string => {
    const isActive = currentUrl.startsWith(path);
     if (scrolled) {
    return isActive
      ? 'px-4 py-1 bg-[#3E3D3C] text-white rounded-md'
      : 'text-black';
  }
    // Halaman daftar properti
    if (currentUrl.startsWith('/home/daftar-properti')) {
      return path === '/home'
        ? 'px-4 py-1 bg-[#3E3D3C] text-white rounded-md'
        : 'text-black'; // link lain jadi hitam
    }

    // Halaman daftar promo
    if (currentUrl.startsWith('/promo/daftar-promo')) {
      return path === '/promo'
        ? 'px-4 py-1 bg-[#3E3D3C] text-white rounded-md'
        : 'text-black';
    }
        if (currentUrl.startsWith('/home/daftar-properti/deskripsi-rumah/reservasi') ) {
    return path === '/home/daftar-propertideskripsi-rumah/reservasi'
        ? 'px-4 py-1 bg-[#F7F4EE]  text-black rounded-md'
        : 'text-white'; // link lain jadi hitam
    }
            if (currentUrl.startsWith('/history') ) {
      return path === '/history'
        ? 'px-4 py-1 bg-[#F7F4EE]  text-black rounded-md'
        : 'text-white'; // link lain jadi hitam
    }
    if (currentUrl.startsWith('/home/company/category') ) {
      return path === '/home'
        ? 'px-4 py-1 bg-[#F7F4EE]  text-black rounded-md'
        : 'text-white'; // link lain jadi hitam
    }
        if (currentUrl.startsWith('/chat')) {
      return path === '/chat'
        ? 'px-4 py-1 bg-[#3E3D3C] text-white rounded-md'
        : 'text-black'; // link lain jadi hitam
    }


    // Default halaman lain
    return path === currentUrl ? 'px-4 py-1 bg-[#F7F4EE] text-black rounded-md' : 'text-white';
  };

  return (
    <header
      className={`flex top-0 left-0 w-full items-center justify-between px-8 py-6 z-20 fixed 
            ${scrolled ? 'bg-[#F7F4EE] shadow-md' :   currentUrl.startsWith('/home/daftar-properti/deskripsi-rumah/reservasi') ? 'bg-[#2C3638] shadow-md text-black ' : currentUrl.startsWith('/history') || currentUrl.startsWith('/home/company/category')  ? 'bg-[#2C3638] shadow-md text-black '   : 'bg-transparent'}`}
    >
      <div className="flex items-center">
        <img
          src={scrolled ? Logo2 : isDaftarProperti ? Logo2 : isDaftarPromo ? Logo2 : Logo}
          className="w-[200px] md:w-[250px]"
          alt="logo"
        />
      </div>

      <nav className="flex gap-5 md:gap-15 text-lg font-medium transition-all duration-300 ease-in-out">
        <Link href="/home/home"
          className={getLinkClass('/home/home')}
        >
          Home
        </Link>

        <Link
          href="/promo"
          className={getLinkClass('/promo')}
        >
          Promo
        </Link>

        <Link href="/history" className={getLinkClass('/history')}>
          History
        </Link>
        <Link href="/chat" className={getLinkClass('/chat')}>
          Chat
        </Link>
      </nav>

      <div
        onClick={() => router.visit('/account')}
        className={`rounded-full px-4 py-5 mr-10 cursor-pointer ${
          scrolled
            ? 'bg-[#6F6C65]'
            : isDaftarProperti || isDaftarPromo
            ? 'bg-[#3E3D3C]'
            : 'bg-[#F7F4EE]'
        }`}
      >
        <FontAwesomeIcon
          icon={faUser}
          className={`fa-2x ${
            !scrolled && !isDaftarProperti && !isDaftarPromo ? 'text-black' : 'text-white'
          }`}
        />
      </div>
    </header>
  );
};

export default Navbar;
