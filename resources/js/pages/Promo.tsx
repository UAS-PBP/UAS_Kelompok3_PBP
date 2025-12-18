import { FC, useState, useEffect, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faLocationDot, faBed, faBath } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faSquare } from '@fortawesome/free-regular-svg-icons';
import Rumah from '@/assets/rumah.jpg'
import { router } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout';

interface PropertyPromo {
  id: number;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: number;
  price: number;
  promo: number;
  image: string;
}

interface PromoCardProps {
  item: PropertyPromo;
}

const PromoCard: FC<PromoCardProps> = ({ item }) => {
  return (
    <div className='flex flex-col mt-10'>
      <div className='flex bg-white rounded-2xl shadow-xl px-5 py-5 gap-4'>
        <img src={item.image} className='w-[250px] md:w-[450px] rounded-2xl' alt={item.title} />
        <div className='px-1 pt-2 md:pt-5 cursor-pointer'>
          <h2 className='font-bold text-3xl text-[#2C3638] uppercase mb-2 cursor-pointer'>
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
          <div className='flex flex-col mt-10'>
            <p className='text-sm font-bold text-[#687373] mb-1'>Starting from</p>
            <p className='font-semibold text-2xl'>
              Rp {item.price.toLocaleString('id-ID')},-
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Promo: FC = () => {
  const [propertiesPromo, setPropertiesPromo] = useState<PropertyPromo[]>([]);

  const [locationInput, setLocationInput] = useState<string>('');
  const [typeInput, setTypeInput] = useState<string>('');
  const [priceInput, setPriceInput] = useState<string>('');

  useEffect(() => {
    setPropertiesPromo([
      {
        id: 1,
        title: 'Home Scandinavian',
        location: 'Jl. Perumahan CitraLand Surabaya',
        beds: 5,
        baths: 6,
        area: 279,
        price: 2500000000,
        promo: 2000000000,
        image: Rumah,
      },
      {
        id: 2,
        title: 'Home Scandinavian',
        location: 'Jl. Perumahan CitraLand Surabaya',
        beds: 5,
        baths: 6,
        area: 279,
        price: 2500000000,
        promo: 2000000000,
        image: Rumah,
      },
    ]);
  }, []);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => setLocationInput(e.target.value);
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => setTypeInput(e.target.value);
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => setPriceInput(e.target.value);

  return (
    <MainLayout>
      <div className=' relative min-h-screen w-full'>
        <section className='relative h-[600px] md:h-[650px] w-full'>
        <div>
          <img
            src={Rumah}
            alt='background'
            className='absolute inset-0 w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/50'></div>
        </div>
        <div className='flex relative w-full'>
          <div className='w-full md:w-1/2 flex flex-col justify-center items-center relative text-wrap px-20'>
            <h1 className='text-4xl md:text-6xl text-[#F7F4EE] mx-auto font-bold leading-tight'>
              Wujudkan Rumah <br />
              Impianmu dengan <br />
              Penawaran <br />
              Terbaik.
            </h1>
          </div>
          <div className='w-full md:w-1/2 min-h-screen flex justify-center items-center px-13 md:px-4 relative'>
            <div className='bg-white/40 backdrop-blur-lg p-6 rounded-lg w-[300px] space-y-3'>
              <div>
                <label className='text-black font-bold'>Location</label>
                <input
                  type='text'
                  value={locationInput}
                  onChange={handleLocationChange}
                  className='w-full rounded-lg bg-white px-5 py-2 shadow-md mt-2'
                />
              </div>
              <div>
                <label className='text-black font-bold'>Property Type</label>
                <input
                  type='text'
                  value={typeInput}
                  onChange={handleTypeChange}
                  className='w-full rounded-lg bg-white px-5 py-2 shadow-md mt-2'
                />
              </div>
              <div>
                <label className='text-black font-bold'>Any Price</label>
                <input
                  type='text'
                  value={priceInput}
                  onChange={handlePriceChange}
                  className='w-full rounded-lg bg-white px-5 py-2 shadow-md mt-2'
                />
              </div>
              <button
                onClick={() => router.visit('/promo/daftar-promo')}
                className='bg-linear-to-r from-black to-[#6F6C65] text-white text-center w-full px-5 py-2 font-bold rounded-lg mt-5 cursor-pointer'
              >
                Search
              </button>
            </div>
          </div>
        </div>
        </section>
        <div className='pt-20 pb-30 bg-[#E8E3D9] px-20 items-center justify-center'>
          <div className='flex'>
            <h1 className='font-bold text-3xl text-[#2C3638]'>
              Penawaran Terbaik Untuk Anda
            </h1>
          </div>
          <div className='w-full mt-10'>
            {propertiesPromo.map((item) => (
              <PromoCard key={item.id} item={item} />
            ))}
          </div>
          <div className='flex justify-center mt-13'>
            <button  className='font-bold text-xl text-white bg-[#2C3638] text-center rounded-xl items-center mx-auto px-8 py-3 cursor-pointer'>
              Lihat Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Promo;
