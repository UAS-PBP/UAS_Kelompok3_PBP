import { FC, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '@/assets/logo.PNG';
import Logo2 from '@/assets/logo2.PNG';
import { Link, router, usePage } from '@inertiajs/react';

interface NavbarCompanyProps{
  onAccountClick?: () => void;
  accountRef?: React.RefObject<HTMLDivElement | null>;
  justSignedUp?: boolean;
}
const NavbarCompany: FC<NavbarCompanyProps>= ({onAccountClick, accountRef, justSignedUp}) => {
  const { url } = usePage().props;

  const currentUrl = window.location.pathname;
  const isDaftarProperti = currentUrl === '/home/daftar-properti';
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
    // Halaman daftar properti
    if (currentUrl.startsWith('/dashboard/daftar-properti')) {
      return path === '/dashboard'
        ? 'px-4 py-1 bg-[#3E3D3C] text-black rounded-md'
        : 'text-black'; // link lain jadi hitam
    }
    if (currentUrl.startsWith('/input-rumah/upload-rumah')) {
      return path === '/input-rumah'
        ? 'px-4 py-1 bg-[#F7F4EE] text-black rounded-md'
        : 'text-white'; // link lain jadi hitam
    }
    if (currentUrl.startsWith('/agen/input-agen')) {
      return path === '/agen'
        ? 'px-4 py-1 bg-[#F7F4EE] text-black rounded-md'
        : 'text-white'; // link lain jadi hitam
    }
    


    // Scroll effect
    if (scrolled) {
    return isActive
      ? 'px-4 py-1 bg-[#3E3D3C] text-white rounded-md'
      : 'text-black'
  }

    // Default halaman lain
    return path === currentUrl ? 'px-4 py-1 bg-[#F7F4EE] text-black rounded-md' : 'text-white';
  };

  return (
    <header
      className={`flex top-0 left-0 w-full items-center justify-between px-8 py-6 z-20 fixed 
            ${scrolled ? 'bg-[#F7F4EE] shadow-md'   : currentUrl.startsWith('/input-rumah') ? 'bg-[#2C3638] shadow-md': currentUrl.startsWith('/agen') ? 'bg-[#2C3638] shadow-md text-black': currentUrl.startsWith('/jadwal-reservasi') ? 'bg-[#2C3638] shadow-md' : 'bg-transparent'}`}
    >
      <div className="flex items-center">
        <img
          src={scrolled ? Logo2 : isDaftarProperti ? Logo2 : isDaftarPromo ? Logo2 : Logo}
          className="w-[250px]"
          alt="logo"
        />
      </div>

      <nav className="flex gap-15 text-lg font-medium transition-all duration-300 ease-in-out">
        <Link href="/dashboard"
          className={getLinkClass('/dashboard')}
        >
          Home
        </Link>

        <Link
          href="/input-rumah"
          className={getLinkClass('/input-rumah')}
        >
          Rumah
        </Link>

        <Link href="/jadwal-reservasi" className={getLinkClass('/jadwal-reservasi')}>
          Jadwal Reservasi
        </Link>
        <Link href="/agen" className={getLinkClass('/agen')}>
          Agen
        </Link>
      </nav>

      <div
        id="account-icon"
        ref={accountRef}
        onClick={() => {
          if (justSignedUp && onAccountClick) {
            onAccountClick();        // hanya dijalankan setelah signup
          return;                 // jangan pindah halaman
        }
          {router.visit('/account-company');}
        }}
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

export default NavbarCompany;
