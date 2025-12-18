import { useEffect, useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faLocationDot, faBed, faBath, faHeart } from '@fortawesome/free-solid-svg-icons';
import {  faSquare } from '@fortawesome/free-regular-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout';

interface Property {
  id: number;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: number;
  price: number;
  image: string;
}

interface PropertyCardProps {
  item: Property;
}

function PropertyCard({ item }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  }
  return (
    <div className='bg-white rounded-3xl shadow-md overflow-hidden w-[330px] lg:w-[540px] '>
      <div className='relative'>
        <img src={item.image} alt='House' className='w-full h-[180px] lg:h-[300px] object-cover' />
        <span className='absolute top-3 left-3 bg-[#2C3638] text-white px-4 py-1 font-bold rounded-full text-sm'>
          Home
        </span>
        <button onClick={() => setIsFavorite(!isFavorite)} className='absolute top-3 right-3 bg-[#D9D9D9] p-2 rounded-full shadow cursor-pointer'>
          <FontAwesomeIcon icon={faHeart} color={isFavorite ? "red" : "gray"} className=' fa-2x' />
        </button>
      </div>
      <div className='py-5 px-8 mb-8'>
        <h3 className='text-xl font-bold mb-2 text-[#2C3638]'>{item.title}</h3>

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
        <div className='flex justify-between items-center mt-3'>
          <div>
            <p className='text-sm font-bold text-[#687373] mb-1'>Starting from</p>
            <p className='text-xl font-bold'>Rp {item.price.toLocaleString('id-ID')},-</p>
          </div>
          <button
            onClick={() => router.visit(`/home/daftar-properti/deskripsi-rumah/${item.id}`)}
            className='bg-linear-to-br from-[#2C3638] via-[#2C3638] to-[#DDD7C9] text-white px-8 py-4 rounded-full text-sm font-semibold cursor-pointer'
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [locationInput, setLocationInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const { properties, filters } = usePage().props as any;

  const handleSearch = () => {
    router.get('/home/daftar-properti', {
      data: {
      city: cityInput,
      location: locationInput,
      type: typeInput,
      price: priceInput,
    },
  });
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  return (
    <MainLayout>
      <section className=' w-full  h-[700px] md:h-[700px] overflow-hidden pb-20 relative'>
          <img src={Rumah} alt='background' className=' absolute inset-0 w-full  h-full object-cover' />
          <div className="absolute inset-0 w-full  bg-black/50"></div>
        <div className=' justify-start md:justify-center items-center  flex flex-col   absolute inset-0 mt-30 md:mt-20 px-4  '>
            <h1 className='text-3xl md:text-6xl text-[#F7F4EE] font-bold mb-2 text-center'>Find Your Dream Home</h1>
            <p className='text-sm md:text-2xl text-[#F7F4EE] font-bold max-w-xl mx-auto mb-10 text-center'>
              Discover properties in your desirable design and locations. Your perfect home awaits.
            </p>

          {/* Search Form */}
          <div className='rounded-lg bg-[#F7F4EE] flex flex-col md:items-end  md:flex-row md:gap-6 gap-3 md:max-w-7xl md:w-full w-full max-w-[90%] md:mt-20 mb-2 md:py-6 py-3 md:px-10 px-8 '>
            <div className='gap-1 flex flex-col'>
              <label className='text-black font-bold'>City</label>
              <input
                type='text'
                className='flex-1 p-2 md:p-4 rounded-lg bg-white border border-gray-300'
                value={cityInput}
                onChange={handleInputChange(setCityInput)}
              />
            </div>
            <div className='gap-1 flex flex-col'>
              <label className='text-black font-bold'>Location</label>
              <input
                type='text'
                className='flex-1 p-2 md:p-4 rounded-lg bg-white border border-gray-300'
                value={locationInput}
                onChange={handleInputChange(setLocationInput)}
              />
            </div>
            <div className='gap-1 flex flex-col'>
              <label className='text-black font-bold'>Property Type</label>
              <input
                type='text'
                className='flex-1 p-2 md:p-4 rounded-lg bg-white border border-gray-300'
                value={typeInput}
                onChange={handleInputChange(setTypeInput)}
              />
            </div>
            <div className='gap-1 flex flex-col'>
              <label className='text-black font-bold'>Any Price</label>
              <input
                type='text'
                className='flex-1 p-2 md:p-4 rounded-lg bg-white border border-gray-300'
                value={priceInput}
                onChange={handleInputChange(setPriceInput)}
              />
            </div>
            <button
              onClick={handleSearch}
              className='md:w-[100px] h-10 md:h-[58px]  items-center justify-center text-center rounded-lg bg-linear-to-r from-black to-[#6F6C65] border border-gray-300 text-white font-bold cursor-pointer'
            >
              Search
            </button>
          </div>
        </div>
        </section>
        <section>

    {/* SECTION 1 — 3 FEATURES */}
    <div className="py-20 px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-2xl md:max-w-5xl mx-auto">
            
            {[1,2,3].map((x) => (
                <div 
                    key={x}
                    className="rounded-3xl px-10 py-10 shadow-xl text-center bg-[#FAF9F7]"
                >
                    <div className="bg-gradient-to-br from-black to-[#6F6C65] rounded-md w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <FontAwesomeIcon icon={faChartLine} className="text-white fa-2x" />
                    </div>
                    <h3 className="font-semibold text-2xl md:text-3xl">Premium Listings</h3>
                    <p className="mt-5 text-base md:text-lg text-[#B0ABA2]">
                        Access exclusive properties from top developers and sellers
                    </p>
                </div>
            ))}

        </div>
    </div>


    {/* SECTION 2 — PROPERTY LIST */}
    <div className="py-20 px-6 bg-[#E8E3D9] ">
        <h1 className="text-center font-bold text-4xl md:text-5xl text-[#293232] mb-6">
            Find Your Dream Home
        </h1>
        <h3 className="text-center font-medium text-[#6D7878] mb-12">
            Handpicked premium properties from our exclusive collection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto justify-items-center ">
            {(properties ?? []).map((item: any) => (
  <PropertyCard key={item.ID_RUMAH} 
    item={{
      id: item.ID_RUMAH,
      title: item.NAMA_RUMAH,
      location: item.LOKASI_RUMAH ?? '-',
      beds: item.JUMLAH_KT ?? 0,
      baths: item.JUMLAH_KM ?? 0,
      area: item.LUAS_BANGUNAN ?? 0,
      price: item.HARGA_ASLI ?? 0,
      image: item.IMAGE ?? 'default.jpg',
    }} 
  />
))}

        </div>

        <div className="flex justify-center mt-16">
            <button 
                onClick={() => router.visit('/home/daftar-properti')}
                className="bg-gradient-to-br from-[#2C3638] to-[#DDD7C9] text-white px-8 py-3 rounded-xl text-lg font-bold shadow"
            >
                View All Properties
            </button>
        </div>

    </div>


    {/* SECTION 3 — CTA */}
    <div className="py-20 px-6 bg-gradient-to-br from-[#2C3638] via-[#2C3638] to-[#DDD7C9] text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Home with Perfect Price?
        </h1>
        <h3 className="text-white font-light text-md md:text-lg mb-8">
            Join thousands of satisfied homeowners who found their dream properties with EstateHub
        </h3>

        <button 
            onClick={() => router.visit('/promo')}
            className="bg-[#F7F4EE] rounded-xl px-6 py-4 font-bold hover:bg-white transition"
        >
            Browse Properties
        </button>
    </div>

</section>

    </MainLayout>
  );
}

export default Home;
