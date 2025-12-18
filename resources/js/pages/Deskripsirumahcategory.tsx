import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faAngleLeft, faAngleRight, faLocationDot, faHeart,faBed,} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import Rumah from "../assets/rumah.jpg";
import { router, usePage } from '@inertiajs/react';

function Deskripsirumahcategory() {
  const slides: string[] = [Rumah, Rumah, Rumah];

  const [current, setCurrent] = useState<number>(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const query = new URLSearchParams(window.location.search);
  const category = query.get("category");

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F9F5ED]">
      <div
        onClick={() => router.visit(`/home/company/category?category=${category}`)}
        className="flex px-30 pt-8"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="fa-2x cursor-pointer"
        />
      </div>

      <div className="px-10 mt-1 flex flex-col items-center">
        <div className="relative w-full max-w-[950px] mx-auto overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((img, i) => (
              <img key={i} src={img} className="w-full object-cover shrink-0" />
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

        <div className="mt-8 max-w-[950px] w-full flex justify-between items-start text-[#2C3638]">
          <div className="w-1/2">
            <h1 className="font-bold text-5xl">Home Scandinavian</h1>

            <div className="flex items-center text-[#2C3638] gap-2 mb-3 mt-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <p className="font-semibold text-xl">Jl. Perumahan CitraLand</p>
            </div>

            <p className="font-bold text-3xl">Rp 2.500.000.000,-</p>
          </div>

          <div className="flex gap-3">

            <button onClick={() => setIsFavorite(!isFavorite)} className="bg-[#E8E3D9] px-3 py-4 rounded-full cursor-pointer">
              <FontAwesomeIcon icon={faHeart} color={isFavorite ? "red" : "gray"} className="fa-2x" />
            </button>
          </div>
        </div>

        <div className="mt-10 mb-10 flex gap-5 items-center justify-between max-w-[950px] w-full">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-[#DDD7C9] px-20 py-10 rounded-2xl shadow-lg text-center"
            >
              <FontAwesomeIcon icon={faBed} className="text-[#6F6C65] fa-3x" />
              <p className="font-bold mt-3 text-3xl">5</p>
              <p className="mt-3 font-light">Bedrooms</p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-[950px] w-full text-[#2C3638]">
          <h1 className="font-bold text-4xl">About This Property</h1>
          <p className="text-lg leading-relaxed mt-5">
            This stunning modern villa offers the perfect blend of luxury and
            comfort. Featuring expansive living spaces, state-of-the-art
            amenities, and breathtaking views. The property includes a private
            pool, landscaped gardens, and premium finishes throughout.
          </p>
        </div>

        <div className="mt-8 mb-10 max-w-[950px] w-full text-[#2C3638]">
          <h1 className="font-bold text-4xl">Features & Amenities</h1>

          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="flex gap-6 mt-5 justify-between"
            >
              <div className="bg-[#FFFFFA] px-32 py-6 rounded-2xl shadow-md flex items-center gap-4">
                <FontAwesomeIcon icon={faThumbsUp} className="fa-2x" />
                <p className="text-center">Smart House System</p>
              </div>

              <div className="bg-[#FFFFFA] px-32 py-6 rounded-2xl shadow-md flex items-center gap-4">
                <FontAwesomeIcon icon={faThumbsUp} className="fa-2x" />
                <p className="text-center">Smart House System</p>
              </div>
            </div>
          ))}

          <div className="mt-16 max-w-[950px] w-full bg-white rounded-3xl shadow-lg px-10 py-10">
            <h1 className="text-center font-bold text-4xl mb-10 mt-5 text-[#2C3638]">
              Contact Agent
            </h1>

            <div className="flex items-center justify-between px-10">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-lg">Agent Name</p>
                  <p className="font-bold text-2xl">Qurrota A'yun</p>
                </div>

                <div>
                  <p className="text-lg">Company Name</p>
                  <p className="font-bold text-2xl">PT. CitraLand Surabaya</p>
                </div>

                <div>
                  <p className="text-lg">Contact</p>
                  <p className="font-bold text-2xl">+62 123456789</p>
                </div>

                <div>
                  <p className="text-lg">Email</p>
                  <p className="font-bold text-2xl">ayun@estatehub.com</p>
                </div>
              </div>

              <img
                src={Rumah}
                className="w-80 h-72 object-cover rounded-xl shadow-md"
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
          <div  className="flex flex-col mt-10 max-w-[950px] w-full gap-8  ">
            <button onClick={() => router.visit("/home/company")} className="w-full bg-[#2C3638] px-10 py-5 rounded-xl text-white text-2xl font-bold cursor-pointer hover:bg-[#2C3638]/20">
              PT.CitraLand Surabaya
            </button>

            <button onClick={() => router.visit("/home/daftar-properti/deskripsi-rumah/reservasi")} className="w-full bg-[#2C3638] px-10 py-5 rounded-xl text-white font-bold text-2xl cursor-pointer hover:bg-[#2C3638]/20 ">
              SURVEY SEKARANG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deskripsirumahcategory;
