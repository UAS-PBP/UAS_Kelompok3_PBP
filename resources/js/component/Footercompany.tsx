import { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Logo from '@/assets/logo.PNG';
import { router } from "@inertiajs/react";
const Footer: FC = () => {
  return (
    <footer className="w-full bg-[#2A3335] text-white py-10 px-3">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-[50px]">

        {/* Logo + Contact */}
        <div className="space-y-4">
          <img
            src={Logo} // ganti sesuai logo kamu
            alt="logo"
            className="w-[250px]"
          />

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faWhatsapp} className="text-green-400 text-3xl" />
            <div className="flex flex-col">
                <h3 className="text-gray-400 font-medium text-lg">WhatsApp</h3>
                <p>+6281234567890</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faPaperPlane} className="text-blue-300 text-2xl" />
            <div className="flex flex-col">
                <h3 className="text-gray-400 font-medium text-lg">E-mail</h3>
                <p>123@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Tipe Rumah */}
        <div>
          <h3 className="font-bold text-lg mb-3">Tipe Rumah</h3>
          <ul className="space-y-2 opacity-80">
            <li>Apartemen</li>
            <li>Villa</li>
            <li>Townhouse</li>
            <li>Smart House</li>
            <li>Cluster</li>
            <li>Perumahan Subsidi</li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">Link</h3>
          <ul className="space-y-2 opacity-80">
            <li onClick={() => router.visit('/dashboard')} className="cursor-pointer hover:text-[#dbb770]">Home</li>
            <li onClick={() => router.visit('/input-rumah')} className="cursor-pointer hover:text-[#dbb770]">Rumah</li>
            <li onClick={() => router.visit('/jadwal-reservasi')} className="cursor-pointer hover:text-[#dbb770]">Reservasi</li>
            <li onClick={() => router.visit('/agen')} className="cursor-pointer hover:text-[#dbb770]">Agen</li>
            <li onClick={() => router.visit('/account-company')} className="cursor-pointer hover:text-[#dbb770]">Account</li>
          </ul>
        </div>

        {/* Ikuti kami */}
        <div>
          <h3 className="font-bold text-lg mb-3">Ikuti kami</h3>

          <div className="flex gap-4 text-xl">
            <a className="hover:text-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="hover:text-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a className="hover:text-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center opacity-70 text-sm">
        <hr className="w-[90%] text-gray-300 mx-auto mb-5"/>
        <img
          src={Logo}
          alt="bottom-logo"
          className="w-[160px] mx-auto mb-2"
        />
        © HomeLinkID 2025, BPF_Teknik Informatika
      </div>
    </footer>
  );
};

export default Footer;
