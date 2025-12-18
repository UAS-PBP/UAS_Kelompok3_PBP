import { useState, useEffect, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faDollarSign, faBath, faBed, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faHouse, faSquare } from "@fortawesome/free-regular-svg-icons";
import Rumah from "../assets/rumah.jpg";
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout'



interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  location: string;
  type: string;
  beds: number;
  baths: number;
  area: number;
  price: number;
  promo: number;
  image: string;
}

interface LocationState {
  city?: string;
  location?: string;
  type?: string;
  price?: string;
}


function PromoCard({ item }: { item: Property }) {


  return (
    <div>
      <div className="w-full bg-gray-300 h-px"></div>

      <div
        onClick={() => router.visit("/home/daftar-properti/deskripsi-rumah")}
        className="flex flex-row items-start gap-6 py-6 cursor-pointer"
      >
        <img
          src={item.image}
          className="w-[350px] h-auto rounded-2xl mx-3"
          alt="rumah"
        />

        <div className="flex flex-col justify-start flex-1">
          <h2 className="font-semibold text-3xl mb-2">{item.title}</h2>

          <div className="flex items-center text-sm text-[#2C3638] gap-2 mb-3">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="font-semibold">{item.address}</p>
          </div>

          <div className="flex items-center text-gray-700 text-sm gap-6 mb-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBed} />
              <span>{item.beds} Beds</span>
            </div>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBath} />
              <span>{item.baths} Baths</span>
            </div>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSquare} />
              <span>{item.area} m²</span>
            </div>
          </div>

          <div className="flex flex-col mt-5 items-end">
            <p className="text-sm font-bold text-[#687373] mb-1">
              Rp {item.promo.toLocaleString("id-ID")}
            </p>
            <p className="font-semibold text-2xl">
              Rp {item.price.toLocaleString("id-ID")},-
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



function Caripromo() {
    const [properties, setProperties] = useState<Property[]>([]);
    const page = usePage();
    const state = page.props as LocationState;

  const [cityInput, setCityInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  useEffect(() => {
    if (state) {
      setCityInput(state.city || "");
      setLocationInput(state.location || "");
      setTypeInput(state.type || "");
      setPriceInput(state.price || "");
    }
  }, [state]);

  const filteredProperties = properties.filter((item) => {
    const city = item.city.toLowerCase();
    const locationName = item.location.toLowerCase();
    const type = item.type.toLowerCase();

    return (
      (!cityInput || city.includes(cityInput.toLowerCase())) &&
      (!locationInput ||
        locationName.includes(locationInput.toLowerCase())) &&
      (!typeInput || type.includes(typeInput.toLowerCase())) &&
      (!priceInput || item.price <= parseInt(priceInput))
    );
  });

  // Dummy data
  useEffect(() => {
    setProperties([
      {
        id: 1,
        title: "Home Scandinavian",
        address: "Jl. Perumahan CitraLand Surabaya",
        city: "Surabaya",
        location: "Ketintang",
        type: "Perumahan",
        beds: 5,
        baths: 6,
        area: 279,
        price: 2500000000,
        promo: 2000000000,
        image: Rumah,
      },
      {
        id: 2,
        title: "Home Scandinavian",
        address: "Jl. Perumahan CitraLand Surabaya",
        city: "Surabaya",
        location: "Ketintang",
        type: "Perumahan",
        beds: 5,
        baths: 6,
        area: 279,
        price: 2500000000,
        promo: 2000000000,
        image: Rumah,
      },
      {
        id: 3,
        title: "Home Scandinavian",
        address: "Jl. Perumahan CitraLand Surabaya",
        city: "Surabaya",
        location: "Ketintang",
        type: "Perumahan",
        beds: 5,
        baths: 6,
        area: 279,
        price: 2500000000,
        promo: 2000000000,
        image: Rumah,
      },
      {
        id: 4,
        title: "Home Scandinavian",
        address: "Jl. Perumahan CitraLand Surabaya",
        city: "Surabaya",
        location: "Ketintang",
        type: "Perumahan",
        beds: 5,
        baths: 6,
        area: 279,
        price: 2500000000,
        promo: 2000000000,
        image: Rumah,
      },
    ]);
  }, []);

  return (
    <MainLayout>
      <div className="h-screen w-full flex bg-white">
        <div className="pt-35 px-20 flex-1">
          {/* FILTER BAR */}
          <div className="bg-[#F7F4EE] w-full rounded-xl px-6 py-4 shadow-md flex mb-6 gap-6 items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="px-3 py-2 text-black font-bold flex-1"
              placeholder="City"
            />

            <div className="h-6 w-px bg-gray-400"></div>

            <input
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="px-3 py-2 text-black font-bold flex-1"
              placeholder="Location"
            />

            <div className="h-6 w-px bg-gray-400"></div>

            <input
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value)}
              className="px-3 py-2 text-black font-bold flex-1"
              placeholder="Type"
            />

            <div className="h-6 w-px bg-gray-400"></div>

            <input
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="px-3 py-2 text-black font-bold flex-1"
              placeholder="Price"
            />

            <button className="px-6 py-2 bg-gradient-to-r from-black to-[#6F6C65] rounded-md text-white cursor-pointer">
              Search
            </button>
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex gap-10 pt-3">
            <button className="flex items-center gap-2 px-5 py-2 border border-gray-400 rounded-xl text-sm">
              <FontAwesomeIcon icon={faHouse} />
              Luas
            </button>

            <button className="flex items-center gap-2 px-5 py-2 border border-gray-400 rounded-xl text-sm">
              <FontAwesomeIcon icon={faDollarSign} />
              Harga
            </button>

            <button className="flex items-center gap-2 px-5 py-2 border border-gray-400 rounded-xl text-sm">
              <FontAwesomeIcon icon={faBath} />
              Banyak kamar mandi
            </button>

            <button className="flex items-center gap-2 px-5 py-2 border border-gray-400 rounded-xl text-sm">
              <FontAwesomeIcon icon={faBed} />
              Banyak kamar tidur
            </button>
          </div>

          {/* LIST PROPERTY */}
          <div className="w-full mt-8">
            {filteredProperties.map((item) => (
              <PromoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Caripromo;
