import { useEffect, useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faLocationDot, faBed, faBath, faArrowLeft,faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import Rumah from '@/assets/rumah.jpg';
import Citra from '@/assets/LOGO-CITRALAND.jpg'
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout';
import type { FC } from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


 

const PremiumListings: FC = () => {
   const { url } = usePage();
  const query = new URLSearchParams(window.location.search);
const selectedCategory = query.get("category") || "";
const { listings = [], category = "" } = usePage().props as {
  listings?: any[];
  category?: string;
};

  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  return (
    <MainLayout>
    <div className="bg-[#FAF7F1] py-6 pt-[150px] pb-20 px-[200px]">
      <div onClick={() => router.visit("/home/company")} className="flex  pb-10">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="fa-2x cursor-pointer"
              /> 
              {selectedCategory && (
          <h2 className="text-2xl font-bold mb-6">
            Kategori: {selectedCategory}
          </h2>
        )}
            </div>
             {listings.length === 0 && (
          <p className="text-center text-gray-600">
            Tidak ada listing untuk kategori <b>{category}</b>
          </p>
        )}

      <div className="grid grid-cols-2 md:grid-cols-3  gap-6 ">
        {listings.map((item) => (
          <div key={item.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm">
            
            {/* Gambar */}
            <div className="relative w-full h-[160px]">
              <img src={item.image} alt="listing" className="w-full h-full object-cover" />
              <button onClick={() => setFavorites((prev) => ({...prev, [item.id]: !prev[item.id],}))} className="absolute top-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer">
                <FontAwesomeIcon icon={faHeart} color={favorites[item.id] ? "red" : "gray"}  />
              </button>
            </div>

            {/* Konten */}
            <div className="px-3 py-4">
              <h3 className="font-semibold text-[17px] mb-1">{item.name}</h3>

              <p className="flex items-center gap-1 text-gray-600 text-[13px]">
                <FontAwesomeIcon icon={faLocationDot} /> {item.location}
              </p>

              <div className="flex justify-between text-[13px] text-gray-600 mt-3">
                <span><FontAwesomeIcon icon={faBed} /> {item.beds} Beds</span>
                <span><FontAwesomeIcon icon={faBath} /> {item.baths} Baths</span>
                <span><FontAwesomeIcon icon={faSquare} /> {item.size}</span>
              </div>

              <p className="text-[14px] mt-3">Starting from</p>
              <p className="text-[18px] font-bold mb-3">{item.price}</p>

              <button onClick={() => router.visit(`/home/company/category/deskripsi-rumah-category?category=${item.category}`)} className="w-full flex justify-center items-center gap-2 bg-[#575F48] text-white py-2 rounded-full cursor-pointer">
                View <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </MainLayout>
  );
};

export default PremiumListings;