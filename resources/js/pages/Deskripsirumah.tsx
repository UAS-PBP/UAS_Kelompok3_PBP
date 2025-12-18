import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faAngleLeft, faAngleRight, faLocationDot, faHeart,faBed, faBath, faSquare, faBathtub, faCar} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import Rumah from "../assets/rumah.jpg";
import { router, usePage } from '@inertiajs/react';
interface RumahProps {
  rumah: {
    ID_RUMAH: number;
    NAMA_RUMAH: string;
    LOKASI_RUMAH: string;
    KATEGORI_RUMAH: string;
    JUMLAH_KT: number;
    JUMLAH_KM: number;
    LUAS_BANGUNAN: number;
    JUMLAH_PARKIR: number;
    HARGA_ASLI: number;
    DISKON: number;
    IMAGE: string;
    FASILITAS: string;
    DESKRIPSI?: string;

    agent?: {
      ID_PERUSAHAAN: number;
      NAMA_AGEN: string;
      NAMA_PERUSAHAAN: string;
      NOMOR_HP_AGEN: string;
      EMAIL_AGEN: string;
      IMAGE?: string;
    };
  };
}

function Deskripsirumah() {
   const { rumah } = usePage().props as RumahProps;
   const fasilitasList = rumah.FASILITAS
  ? rumah.FASILITAS.split(" ").map(item => item.trim())
  : [];

  const slides: string[] = [Rumah, Rumah, Rumah];

  const [current, setCurrent] = useState<number>(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  const scrollRef = useRef<HTMLDivElement>(null);

const slideRight = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  }
};

const slideLeft = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  }
};

  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F9F5ED]">
      <div
        onClick={() => router.visit("/home/daftar-properti")}
        className="flex md:px-30 px-10 pt-8"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="fa-2x cursor-pointer"
        />
      </div>

      <div className="px-10 mt-3 flex flex-col items-center">
        <div className="relative w-full md:max-w-[950px] max-w-[600px] mx-auto overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((img, i) => (
              <img key={i} src={`/storage/${rumah.IMAGE}`} alt={rumah.NAMA_RUMAH} className="w-full object-cover shrink-0" />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white px-2 py-2 rounded-full hover:bg-opacity-60 cursor-pointer"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="fa-2x" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white px-2 py-2 rounded-full hover:bg-opacity-60 cursor-pointer"
          >
            <FontAwesomeIcon icon={faAngleRight} className="fa-2x" />
          </button>

          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full ${
                  current === i ? "bg-white" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <div className="mt-8 md:max-w-[950px] max-w-[600px] w-full flex justify-between items-start text-[#2C3638]">
          <div className="w-1/2">
            <h1 className="font-bold text-3xl md:text-4xl">{rumah.NAMA_RUMAH}</h1>

            <div className="flex items-center text-[#2C3638] gap-2 mb-3 mt-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <p className="font-semibold text-xl">{rumah.LOKASI_RUMAH}</p>
            </div>

            <p className="font-bold text-2xl md:text-3xl">Rp {rumah.HARGA_ASLI.toLocaleString("id-ID")} ,-</p>
          </div>

          <div className="flex gap-3">

            <button onClick={() => setIsFavorite(!isFavorite)} className="bg-[#E8E3D9] px-3 py-4 rounded-full cursor-pointer">
              <FontAwesomeIcon icon={faHeart} color={isFavorite ? "red" : "gray"} className="fa-2x" />
            </button>
          </div>
        </div>

        <div className="mt-10 mb-10 flex gap-5 items-center justify-between md:max-w-[950px] max-w-[600px] w-full">
            <div
              className="bg-[#DDD7C9] md:px-20  px-10 py-6 md:py-10 rounded-2xl shadow-lg text-center"
            >
              <FontAwesomeIcon icon={faBed} className="text-[#6F6C65] fa-3x" />
              <p className="font-bold mt-3 text-3xl">{rumah.JUMLAH_KT}</p>
              <p className="mt-3 font-light">Bedrooms</p>
            </div>
            <div
              className="bg-[#DDD7C9] md:px-20  px-10 py-6 md:py-10 rounded-2xl shadow-lg text-center"
            >
              <FontAwesomeIcon icon={faBathtub} className="text-[#6F6C65] fa-3x" />
              <p className="font-bold mt-3 text-3xl">{rumah.JUMLAH_KM}</p>
              <p className="mt-3 font-light">Bathrooms</p>
            </div>
            <div
              className="bg-[#DDD7C9] md:px-20  px-10 py-6 md:py-10 rounded-2xl shadow-lg text-center"
            >
              <FontAwesomeIcon icon={faCar} className="text-[#6F6C65] fa-3x" />
              <p className="font-bold mt-3 text-3xl">{rumah.JUMLAH_PARKIR}</p>
              <p className="mt-3 font-light">Parking Spaces</p>
            </div>
        </div>

        <div className="mt-8 md:max-w-[950px] max-w-[600px] w-full text-[#2C3638]">
          <h1 className="font-bold text-4xl">About This Property</h1>
          <p className="text-lg leading-relaxed mt-5">
            {rumah.DESKRIPSI || "Deskripsi properti tidak tersedia."}
          </p>
        </div>

        <div className="mt-8 mb-10 md:max-w-[950px] max-w-[600px] w-full text-[#2C3638]">
          <h1 className="font-bold text-4xl">Features & Amenities</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    {fasilitasList.length > 0 ? (
      fasilitasList.map((fasilitas, index) => (
        <div
          key={index}
          className="bg-[#FFFFFA] px-10 py-6 rounded-2xl shadow-md flex items-center gap-4"
        >
          <FontAwesomeIcon icon={faThumbsUp} className="fa-2x text-[#2C3638]" />
          <p className="text-lg font-medium">{fasilitas}</p>
        </div>
      ))
    ) : (
      <p className="text-lg">Fasilitas belum tersedia.</p>
    )}
  </div>
          <div className="mt-16 md:max-w-[950px] max-w-[600px] w-full bg-white rounded-3xl shadow-lg px-10 py-10">
            <h1 className="text-center font-bold text-4xl mb-10 mt-5 text-[#2C3638]">
              Contact Agent
            </h1>

            <div className="flex items-center justify-between md:px-10">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-lg">Agent Name</p>
                  <p className="font-bold md:text-2xl text-xl">{rumah.agent?.NAMA_AGEN ?? "Agent belum ditentukan"}
</p>
                </div>

                <div>
                  <p className="text-lg">Company Name</p>
                  <p className="font-bold md:text-2xl text-xl">{rumah.agent?.company?.NAMA_PERUSAHAAN}</p>
                </div>

                <div>
                  <p className="text-lg">Contact</p>
                  <p className="font-bold md:text-2xl text-xl">{rumah.agent?.NOMOR_HP_AGEN}</p>
                </div>

                <div>
                  <p className="text-lg">Email</p>
                  <p className="font-bold md:text-2xl text-xl">{rumah.agent?.EMAIL_AGEN}</p>
                </div>
              </div>

              <img
                src={
    rumah.agent?.IMAGE
      ? `/storage/${rumah.agent.IMAGE}`
      : Rumah
  }
                className="md:w-80 w-60  h-50 md:h-72 object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="flex gap-5 mt-10 justify-between px-10">
              <button className="flex items-center justify-center gap-3 bg-[#2C3638] text-white font-bold w-full px-10 py-3 rounded-xl shadow-md hover:bg-[#2C3638]/20">
                <FontAwesomeIcon icon={faWhatsapp} className="fa-2x" />
                WhatsApp
              </button>

              <button className="flex items-center justify-center gap-3 bg-[#2C3638] text-white font-bold w-full px-10 py-3 rounded-xl shadow-md hover:bg-[#2C3638]/20">
                <FontAwesomeIcon icon={faEnvelope} className="fa-2x" />
                Email
              </button>
            </div>
          </div>

          {/* BOTTOM BUTTONS */}
          <div  className="flex flex-col mt-10 md:max-w-[950px] max-w-[600px] w-full gap-8  ">
            <button onClick={() => router.visit(`/home/company/${rumah.agent?.ID_PERUSAHAAN}`)} className="w-full bg-[#2C3638] px-10 py-5 rounded-xl text-white text-2xl font-bold cursor-pointer hover:bg-[#2C3638]/20">
              {rumah.agent?.company?.NAMA_PERUSAHAAN}
            </button>

            <button onClick={() => router.visit("/home/daftar-properti/deskripsi-rumah/reservasi")} className="w-full bg-[#2C3638] px-10 py-5 rounded-xl text-white font-bold text-2xl cursor-pointer hover:bg-[#2C3638]/20 ">
              SURVEY SEKARANG
            </button>
          </div>
        </div>
      </div>
      {/* <div className="mt-20 md:max-w-[950px] max-w-[600px] w-full text-[#2C3638] items-center mx-auto  pb-20">
        <hr className="w-full text-[#DDD7C9] border-2 mb-10 shadow"/>
        <h1 className="font-bold text-4xl mb-8 ">Rekomendasi Terbaik untuk Anda</h1>
        <div className="relative">
          <button onClick={slideLeft} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#575F48] text-white p-4 rounded-full shadow z-10 cursor-pointer">
            <FontAwesomeIcon icon={faAngleLeft} className="text-xl" />
          </button>
        <div ref={scrollRef} className="w-full overflow-x-auto scroll-smooth ">
        <div className="flex items-center gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-md overflow-hidden min-w-[300px] mb-10">
              <div className="relative">
                <img src={item.image} className="w-full h-48 object-cover" />
                <button onClick={() => setFavorites((prev) => ({...prev, [item.id]: !prev[item.id],}))} className="absolute top-3 right-3 bg-white p-3 rounded-full shadow cursor-pointer">
                  <FontAwesomeIcon icon={faHeart} color={favorites[item.id] ? "red" : "gray"} className="text-xl"/>
                </button>
              </div>
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
                <button onClick={() => router.visit(`/home/company/category/deskripsi-rumah`)} className="w-full flex justify-center items-center gap-2 bg-[#575F48] text-white py-2 rounded-full cursor-pointer">
                  View <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
        <button onClick={slideRight} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#575F48] text-white p-4 rounded-full shadow z-10 cursor-pointer">
            <FontAwesomeIcon icon={faAngleRight} className="text-xl" />
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Deskripsirumah;
