import { FC, useEffect, useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faLocationDot, faBed, faBath, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faSquare } from '@fortawesome/free-regular-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Citra from '@/assets/LOGO-CITRALAND.jpg'
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout';


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
  category: string;
}

interface CompanyCardProps {
  item: PropertyCompany;
}

const CompanyCard: FC<CompanyCardProps> = ({ item }) => {
  return (
    <div className='flex flex-col mt-10'>
      <div className='flex bg-white rounded-2xl shadow-xl md:px-5 px-3 py-3 md:py-5  flex-col md:flex-row md:items-start  md:gap-6 gap-4'>
        <img src={item.image} className='md:w-[450px] w-[300px] rounded-2xl' alt={item.title} />
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
    </div>
  );
}
const PropertyCard: FC<{ item: PropertyCompany; onLike: (id: number) => void }> = ({ item, onLike }) => {
  return (
    <div className='flex flex-col mt-10'>
      <div className='flex bg-white rounded-2xl shadow-xl md:px-5 px-3 py-3 md:py-5 flex-col md:flex-row md:items-start  md:gap-6'>
        <img src={item.image} className='md:w-[450px] w-[300px] rounded-2xl' alt={item.title} />
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
    </div>
  );
}
const Tabs: FC<{ tab: string; setTab: (t: any) => void }> = ({ tab, setTab }) => (
  <div className='flex  w-full gap-6 items-center justify-center lg:px-[600px] md:justify-items-center  py-5 bg-[#F7F4EE] '>
    <button onClick={() => setTab('rumah')} className={tab==='rumah'? 'mt-10 text-[#B0ABA2] md:text-3xl text-xl font-semibold cursor-pointer border-b-2 border-black':' mt-10 text-black text-3xl font-semibold cursor-pointer'}>Rumah</button>
    <button onClick={() => setTab('promo')} className={tab==='promo'?'mt-10 text-[#B0ABA2] md:text-3xl text-xl font-semibold cursor-pointer border-b-2 border-black':'mt-10 text-black text-3xl font-semibold cursor-pointer'}>Promo</button>
  </div>
);
function Company() {
    const [propertiesCompany, setPropertiesCompany] = useState<PropertyCompany[]>([]);
    const [activeSection, setActiveSection] = useState<'company' | 'rumah' | 'kategori'>('company');
    const [tab, setTab] = useState< 'rumah' | 'promo'>('rumah');
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
        promo_price: a.DISKON,
        likes: a.JUMLAH_LIKE ?? 0,
        created_at: a.created_at,
        image: a.IMAGE?.replace(/"/g, ''),
        category: a.KATEGORI_RUMAH ,
      }))
    );
  }
}, [company]);


const handleLike = (id: number) => {
    router.post(`/houses/${id}/like`, {}, {
        preserveScroll: true,
        onSuccess: () => router.reload({ only: ['houses'] })
    });
};



        const slides: string[] = [Rumah, Rumah, Rumah];
      
        const [current, setCurrent] = useState<number>(0);
      
        const prevSlide = () => {
          setCurrent(current === 0 ? slides.length - 1 : current - 1);
        };
      
        const nextSlide = () => {
          setCurrent(current === slides.length - 1 ? 0 : current + 1);
        };
         const filtered = propertiesCompany.filter(p => {
  if (tab === 'promo') {
    return p.promo_price !== null;
  }
  // tab === 'rumah'
  return true;
});

  return (
    <MainLayout>
      <div className='w-full flex flex-col min-h-screen bg-[#F7F4EE] '>
        <div className=' h-[500px] md:h-[600px] w-full relative'>
            <div>
                <img src={Rumah} alt='background' className='absolute inset-0 w-full h-full object-cover' />
                <div className='absolute inset-0 bg-black/50'></div>
            </div>
            <div className='w-full flex items-center inset-0 justify-center absolute  md:-translate-x-20'>
                <div className='flex items-center justify-between w-full  max-w-5xl md:px-4 px-2 '>
                    <div className='flex items-center md:gap-4 gap-2'>
                            <img src={Citra} className='w-[100px] h-[100px] md:w-[180px] md:h-[180px] rounded-full border-2 border-white object-cover' ></img>
                        <div>
                            <h1 className='text-white text-xl md:text-4xl font-bold'>{company?.NAMA_PERUSAHAAN}</h1>
                            <div className='flex items-center gap-1 text-white '>
                                <FontAwesomeIcon icon={faLocationDot} className='text-white hidden md:block'/>
                                <p className='text-white  text-sm md:text-xl'>{company?.LOKASI_PERUSAHAAN}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-end md:items-center  justify-center'>
                        <button className='bg-white/60 md:px-10 px-3 py-2 md:py-3 rounded-xl text-sm font-semibold cursor-pointer'>
                          <FontAwesomeIcon icon={faUser} className='mr-2'/>
                          Follow</button>
                         <button className='bg-white/60 md:px-11 px-4  py-2 md:py-3 rounded-xl text-sm font-semibold cursor-pointer'>
                            <FontAwesomeIcon icon={faMessage} className='mr-2'/>
                            Chat</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full  flex justify-center  '>
          <div className='flex w-[50%] bg-[#DDD7C9] rounded-xl rounded-r-none shadow-lg items-center justify-center overflow-hidden'>
                <button onClick={() => setActiveSection('company')} className={`md:px-10 py-10 px-5  font-bold text-xl md:text-3xl cursor-pointer ${activeSection === 'company' ? 'bg-[#C5BFB2] w-full text-black' : 'bg-[#DDD7C9]'}`}>Company</button>
            </div>
            <div className='flex w-[50%] bg-[#DDD7C9] rounded-xl rounded-r-none rounded-l-none shadow-lg items-center justify-center overflow-hidden'>
                <button onClick={() => setActiveSection('rumah')} className={`md:px-10 py-10 px-5  font-bold text-xl md:text-3xl cursor-pointer ${activeSection === 'rumah' ? 'bg-[#C5BFB2] w-full text-black' : 'bg-[#DDD7C9]'}`}>Rumah</button>
            </div>
            <div className='flex w-[50%] bg-[#DDD7C9] rounded-xl rounded-l-none shadow-lg items-center justify-center overflow-hidden'>
                <button onClick={() => setActiveSection('kategori')} className={`md:px-10 py-10 px-5  font-bold text-xl md:text-3xl cursor-pointer ${activeSection === 'kategori' ? 'bg-[#C5BFB2] w-full text-black' : 'bg-[#DDD7C9]'}`}>Kategori</button>
            </div>
        </div>
        {activeSection === 'company' && (
          <div className='bg-[#F7F4EE] w-full min-h-screen flex flex-col md:px-[200px] items-center justify-center '>
            <div className='rounded-xl w-full  text-center  font-bold md:text-7xl text-4xl text-[#2C3638] mt-20 '>Welcome to the Official {company?.NAMA_PERUSAHAAN} Agency</div>
            <div className='rounded-xl w-full  text-center font-bold md:text-5xl text-2xl text-[#2C3638] mt-10'>Rumah Ekslusif untuk Anda</div>
            <div className='w-[330px] md:w-full grid grid-cols-1 mt-5 mb-10'>
                {filtered.map((item) => (
  <CompanyCard key={item.id} item={item} />
))}

          </div>
            <div className="relative w-full mt-20 overflow-hidden rounded-xl mb-20">
                <div className="flex transition-transform duration-700"
                    style={{ transform: `translateX(-${current * 100}%)` }}>
                        {slides.map((img, i) => (
                            <img key={i} src={img} className="w-full object-cover shrink-0" />
                        ))}
                </div>
                <button onClick={prevSlide}  className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white px-2 py-2 rounded-full hover:bg-opacity-60 cursor-pointer">
                    <FontAwesomeIcon icon={faAngleLeft} className="fa-2x" />
                </button>
                <button onClick={nextSlide} className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white px-2 py-2 rounded-full hover:bg-opacity-60 cursor-pointer" >
                    <FontAwesomeIcon icon={faAngleRight} className="fa-2x" />
                </button>
                <div className="absolute bottom-3 w-full flex justify-center gap-2">
                      {slides.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full ${ current === i ? "bg-white" : "bg-gray-400" }`}></button>
                        ))}
                </div>
            </div>
        </div>
        )}
         {activeSection === 'rumah' && <Tabs tab={tab} setTab={setTab}></Tabs>}
        {activeSection === 'rumah' && (
          <div className='w-full  flex flex-col min-h-screen items-center justify-center mb-30 lg:px-50  bg-[#F7F4EE]'>
            <div className='w-[330px] min-h-screen md:w-full grid grid-cols-1 mt-5 mb-10'>
              {filtered.map((item) => (
  <PropertyCard key={item.id} item={item} onLike={handleLike}/>
))}

            </div>
          </div>
        )}
        {activeSection === 'kategori' && (
          <div className='w-full min-h-screen  mb-30 md:px-50 bg-[#F7F4EE]'>
            <div className='flex flex-col items-center w-full mt-10  '>
              {[
                "Cluster",
                "Townhouse",
                "Smart House",
                "Apartemen",
                "Villa",
                "Perumahan Subsidi",
              ].map((item) => (
                <div key={item} onClick={() => router.visit(`/home/company/category?category=${item}`)} className='flex justify-between items-center  py-4 border-b border-gray-400 w-[90%] mt-5 cursor-pointer'>
                  <span className='text-lg'>{item}</span>
                  <FontAwesomeIcon  icon={faAngleRight}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </MainLayout>
  );
}

export default Company;
