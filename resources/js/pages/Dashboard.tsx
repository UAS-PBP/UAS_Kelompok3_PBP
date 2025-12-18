import { FC, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faLocationDot,
  faBed,
  faBath,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { router,usePage } from '@inertiajs/react';

import Rumah from '@/assets/rumah.jpg';
import Citra from '@/assets/LOGO-CITRALAND.jpg';
import MainLayout from '@/component/MainLayoutCompany';

/* ================= TYPES ================= */

interface PropertyCompany {
  id: number;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: number;
  price: number;
  promo_price: number | null;
  likes: number;
  created_at: string;
  image: string;
}



/* ================= COMPONENT ================= */

const Dashboard: FC= () =>{


  const [tab, setTab] = useState<'rumah' | 'promo'>('rumah');
  const [activeSection, setActiveSection] =
    useState<'company' | 'rumah' | 'kategori'>('company');
      const [propertiesCompany, setPropertiesCompany] = useState<PropertyCompany[]>([]);

 
  /* ============ STATE ============ */



  const accountRef = useRef<HTMLDivElement | null>(null);
  const { company } = usePage().props as {
    company?: {
      ID_PERUSAHAAN: number;
      NAMA_PERUSAHAAN: string;  
      LOKASI_PERUSAHAAN?: string;
      rumahtampilan: any[];
    };
  };
  useEffect(() => {
    if (company?.rumahtampilan) {
      setPropertiesCompany(
        company.rumahtampilan.map((a: any) => ({
          id: a.ID_RUMAH,
          title: a.NAMA_RUMAH,
          location: a.LOKASI_RUMAH,
          beds: a.JUMLAH_KT ?? 0,
          baths: a.JUMLAH_KM ?? 0,
          area: a.LUAS_BANGUNAN ?? 0,
          price: a.HARGA_ASLI ?? 0,
          promo_price: a.DISKON && a.DISKON > 0 ? a.DISKON : null,
          likes: a.JUMLAH_LIKE ?? 0,
          created_at: a.created_at,
          image: a.IMAGE,
          category: a.KATEGORI_RUMAH ,
        }))
      );
    }
}, [company]);

/* ============ SAFETY CHECK ============ */
if (!company) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          Company data not found (Not logged in)
        </h1>
      </div>
    );
  }

  /* ============ FILTER ============ */
const filtered = propertiesCompany.filter(p => {
  if (tab === 'promo') {
    return p.promo_price && p.promo_price > 0;
  }
  return true;
});

  /* ============ SLIDER ============ */
  const slides = [Rumah, Rumah, Rumah];
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);

  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const getThumbnail = (image: string): string => {
  if (!image) return '';

  try {
    const parsed = JSON.parse(image);

    if (Array.isArray(parsed)) {
      return parsed[0];
    }

    return parsed;
  } catch {
    // fallback: pisah manual kalau format [a,b]
    if (image.includes(',')) {
      return image
        .replace('[', '')
        .replace(']', '')
        .split(',')[0]
        .replace(/"/g, '')
        .trim();
    }

    return image.replace(/"/g, '').trim();
  }
};

  /* ============ RENDER ============ */
  return (
    <MainLayout accountRef={accountRef}>
      <div className="w-full">

        {/* ===== HERO ===== */}
        <div className="relative h-[700px]">
          <img
            src={Rumah}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
            <img
              src={Citra}
              className="w-[180px] h-[180px] rounded-full border-4 border-white"
            />
            <h1 className="text-5xl font-bold mt-6">{company?.NAMA_PERUSAHAAN}</h1>
            <div className="flex items-center mt-3 text-xl">
              <FontAwesomeIcon icon={faLocationDot} />
              <span className="ml-2">{company?.LOKASI_PERUSAHAAN}</span>
            </div>
          </div>
        </div>

        {/* ===== SECTION SWITCH ===== */}
        <div className="flex w-full bg-[#DDD7C9]">
          {['company', 'rumah', 'kategori'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item as any)}
              className={`flex-1 py-8 text-2xl font-bold ${
                activeSection === item ? 'bg-[#C5BFB2]' : ''
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ===== COMPANY ===== */}
        {activeSection === 'company' && (
          <div className="bg-[#F7F4EE] px-20 py-20">
            <h2 className="text-5xl font-bold text-center mb-10">
              Welcome to Our Website
            </h2>

            {propertiesCompany.map((item) => (
              <div className='flex bg-white rounded-2xl shadow-xl md:px-5 px-3 py-3 md:py-5  flex-col md:flex-row md:items-start  md:gap-6 gap-4'>
        <img src={`/storage/${getThumbnail(item.image)}`} className='md:w-[450px] w-[300px] rounded-2xl' alt={item.title} />
        <div className='md:px-10 px-3 md:pt-5 cursor-pointer'>
          <h2 className='font-bold text-2xl md:text-3xl text-[#2C3638] uppercase mb-2 cursor-pointer'>
            {item.title}
          </h2>
          <div className='flex items-center text-sm text-[#2C3638] gap-2 mb-3'>
            <FontAwesomeIcon icon={faLocationDot} />
            <span className='font-light'>{item.location}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm gap-6 mb-4'>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faBed} />
              <span>{item.beds} Beds</span>
            </div>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faBath} />
              <span>{item.baths} Baths</span>
            </div>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faSquare} />
              <span>{item.area} m²</span>
            </div>
          </div>
          <div className='flex flex-col mt-5 md:mt-10 mb-3'>
            <p className='text-sm font-bold text-[#687373] mb-1'>Starting from</p>
            <p className='font-semibold text-2xl'>
              Rp {item.price.toLocaleString('id-ID')},-
            </p>
          </div>
        </div>
      </div>
            ))}
          </div>
        )}

        {activeSection === 'rumah' && (
  <div className="bg-[#F7F4EE] px-20 py-20">

    {/* TAB FILTER */}
    <div className="flex gap-6 mb-10">
      {['rumah', 'promo'].map((t) => (
        <button
          key={t}
          onClick={() => setTab(t as any)}
          className={`px-8 py-3 rounded-full text-xl font-bold transition
            ${tab === t ? 'bg-black text-white' : 'bg-white text-black'}
          `}
        >
          {t === 'rumah' ? 'Semua Rumah' : 'Promo'}
        </button>
      ))}
    </div>

    {/* LIST RUMAH */}
    {filtered.length === 0 && (
      <p className="text-xl text-center text-gray-500">
        Tidak ada rumah ditampilkan
      </p>
    )}

    <div className="grid grid-cols-2 gap-10">
      {filtered.map((item) => (
       <div className='flex bg-white rounded-2xl shadow-xl md:px-5 px-3 py-3 md:py-5 flex-col md:flex-row md:items-start  md:gap-6'>
        <img src={`/storage/${getThumbnail(item.image)}`} className='md:w-[400px] w-[300px] rounded-2xl' alt={item.title} />
        <div className='md:px-10 px-3 md:pt-5  cursor-pointer'>
          <h2 className='font-bold text-2xl md:text-3xl text-[#2C3638] uppercase mb-2 cursor-pointer'>
            {item.title}
          </h2>
          <div className='flex items-center text-sm text-[#2C3638] gap-2 mb-3'>
            <FontAwesomeIcon icon={faLocationDot} />
            <span className='font-light'>{item.location}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm gap-6 mb-4'>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faBed} />
              <span>{item.beds} Beds</span>
            </div>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faBath} />
              <span>{item.baths} Baths</span>
            </div>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faSquare} />
              <span>{item.area} m²</span>
            </div>
          </div>
           <div className='flex flex-col'>
              {item.promo_price ? (
                <><span className='line-through decoration-red-400 decoration-2  text-gray-400 text-sm'>Rp {item.price.toLocaleString('id-ID')},-</span><span className='text-lg font-bold'>Rp {item.promo_price.toLocaleString('id-ID')},-</span></>
              ) : (
              <span className='text-lg font-bold'>Rp {item.price.toLocaleString('id-ID')},-</span>
            )}
            </div>
        </div>
      </div>
      ))}
    </div>
  </div>
)}


        {/* ===== KATEGORI ===== */}
        {activeSection === 'kategori' && (
          <div className="bg-[#F7F4EE] px-20 py-20">
            {[
              'Cluster',
              'Townhouse',
              'Smart House',
              'Apartemen',
              'Villa',
            ].map((k) => (
              <div
                key={k}
                className="border-b py-4 flex justify-between text-xl"
              >
                {k}
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
  
};

export default Dashboard;