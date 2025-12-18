import { useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faDollarSign, faBath, faBed, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faHouse, faSquare } from "@fortawesome/free-regular-svg-icons";
import Rumah from "../assets/rumah.jpg";
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayout'

// =======================
// TYPE DEFINITIONS
// =======================

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



function DaftarCard({ item }: { item: Property }) {


  return (
    <div>
      <div className="w-[350px] md:w-full  bg-gray-300 h-px"></div>

      <div
        onClick={() => router.visit(`/home/daftar-properti/deskripsi-rumah/${item.id}`)}
        className="flex flex-col md:flex-row md:items-start  md:gap-6 py-6 cursor-pointer"
      >
        <img
          src={item.image}
          className="w-[350px] md:w-[300px]  mb-2 h-auto rounded-2xl mx-3"
          alt="rumah"
        />

        <div className="flex flex-col justify-start flex-1">
          <h2 className="font-semibold text-xl md:text-3xl mb-2">{item.title}</h2>

          <div className="flex items-center text-sm text-[#2C3638] gap-2 mb-3">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="font-semibold">{item.address}</p>
          </div>

          <div className="flex items-center text-gray-700 text-sm gap-2 md:gap-6 mb-4">
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

          <div className="flex flex-col mt-5 md:items-end items-start">
            <p className="text-sm font-bold text-[#687373] mb-1">
              Starting from
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

// =======================
// MAIN PAGE COMPONENT
// =======================

function Daftarproperti() {
    const [properties, setProperties] = useState<Property[]>([]);
    const page = usePage();
    const state = page.props as LocationState;
useEffect(() => {
  const props = page.props as any;
  if (props.properties) {
    setProperties(props.properties.map((p: any) => ({
      id: p.ID_RUMAH,
      title: p.NAMA_RUMAH,
      address: p.LOKASI_RUMAH ?? "-",
      city: p.KOTA ?? "-",
      location: p.LOKASI_RUMAH ?? "-",
      type: p.KATEGORI_RUMAH ?? "-",
      beds: p.JUMLAH_KT ?? 0,
      baths: p.JUMLAH_KM ?? 0,
      area: p.LUAS_BANGUNAN ?? 0,
      price: p.HARGA_ASLI ?? 0,
      promo: p.DISKON ?? 0,
      image: p.IMAGE ?? "default.jpg",
    })));
  }
}, [page.props]);
  

  const [cityInput, setCityInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  type DropdownType = "luas" | "harga" | "kamarmandi" | "kamartidur" | null;
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (type: DropdownType) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
  const luasOptions = [
    "150 m²",
    "160 m²",
    "170 m²",
    "180 m²",
    "190 m²",
    "200 m²",
    "210 m²",
    "220 m²",
    "230 m²",
    "240 m²",
  ];
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

 

  return (
    <MainLayout>
      <div className="min-h-screen w-full  flex bg-white">
        <div className="pt-35 px-5 md:px-20 flex-1">
          {/* FILTER BAR */}
          <div className="bg-[#F7F4EE] w-[90%] md:w-full rounded-xl px-4 py-4 shadow-md mb-6 flex flex-col md:flex-row md:items-center md:gap-6">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="sm:hidden md:block" />

            <input
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="md:px-3 px-2 py-2 text-black font-bold flex-1 min-w-[100px]"
              placeholder="City"
            />

            <div className="h-6 w-px  bg-gray-400 hidden md:block"></div>

            <input
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="md:px-3 px-2 py-2 text-black font-bold flex-1 min-w-[100px]"
              placeholder="Location"
            />

            <div className="h-6 w-px bg-gray-400 hidden md:block"></div>

            <input
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value)}
              className="md:px-3 px-2 py-2 text-black font-bold flex-1 min-w-[100px]"
              placeholder="Type"
            />

            <div className="h-6 w-px bg-gray-400 hidden md:block"></div>

            <input
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="md:px-3 px-2 py-2 text-black font-bold flex-1 min-w-[100px]"
              placeholder="Price"
            />

            <button className="px-6 py-2 bg-gradient-to-r from-black to-[#6F6C65] rounded-md text-white cursor-pointer">
              Search
            </button>
          </div>

          {/* FILTER BUTTONS */}
          <div ref={dropdownRef} className="relative">
          <div className="flex md:gap-10 gap-2 pt-3">
            <button onClick={() => toggleDropdown("luas")} className="flex items-center md:gap-3 gap-1 md:px-5 px-1 md:py-2 py-1 border border-gray-400 rounded-xl md:text-sm text-[12px] cursor-pointer">
              <FontAwesomeIcon icon={faHouse} />
              Luas
            </button>

            <button onClick={() => toggleDropdown("harga")} className="flex items-center md:gap-3 gap-1 md:px-5 px-1 md:py-2 py-1 border border-gray-400 rounded-xl md:text-sm text-[12px] cursor-pointer">
              <FontAwesomeIcon icon={faDollarSign} />
              Harga
            </button>

            <button onClick={() => toggleDropdown("kamarmandi")} className="flex items-center md:gap-3 md:px-5 px-1 py-1 md:py-2 border border-gray-400 rounded-xl  md:text-sm text-[10px] cursor-pointer">
              <FontAwesomeIcon icon={faBath} />
              Banyak kamar mandi
            </button>

            <button onClick={() => toggleDropdown("kamartidur")} className="flex items-center md:gap-3  md:px-5 px-1 py-1 md:py-2 border border-gray-400 rounded-xl md:text-sm text-[10px] cursor-pointer">
              <FontAwesomeIcon icon={faBed} />
              Banyak kamar tidur
            </button>
          </div>
          </div>

          {openDropdown === "luas" && (
            <div className="absolute mt-3 md:w-[600px] w-[330px] bg-white shadow-lg rounded-xl md:p-5 p-3 z-50">
              <p className="font-bold mb-4 text-lg">Mau tipe luas rumah yang mana?</p>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {luasOptions.map((luas) => (
                  <button key={luas} className="border md:px-4 px-1 py-1 rounded-full hover:bg-black hover:text-white cursor-pointer">{luas}</button>
                ))}
              </div>
            </div>
          )}
          {openDropdown === "harga" && (
            <div className="absolute mt-3 md:w-[600px] w-[330px] bg-white shadow-lg rounded-xl md:p-5 p-4 z-50">
              <p className="font-bold mb-4 text-lg">Pilih rentang harga:</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                  <button  className="border md:px-4 px-2 py-1 rounded-full hover:bg-black hover:text-white cursor-pointer">
                     0 - 500 Juta
                  </button>
                  <button  className="border  md:px-4 px-2 py-1 rounded-full hover:bg-black hover:text-white cursor-pointer">
                     0 - 500 Juta
                  </button>
                  <button  className="border md:px-4 px-2 py-1 rounded-full hover:bg-black hover:text-white cursor-pointer">
                     0 - 500 Juta
                  </button>
              </div>
            </div>
          )}
          {openDropdown === "kamarmandi" && (
            <div className="absolute mt-3md:w-[600px] w-[330px] bg-white shadow-lg rounded-xl p-5 z-50">
              <p className="font-bold mb-4 text-lg">Pilih jumlah kamar mandi:</p>
              <div className="grid grid-cols-4 gap-4 mt-4">
                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      className="border px-2 py-1 rounded-lg hover:bg-black hover:text-white cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
              </div>
            </div>
          )}
          {openDropdown === "kamartidur" && (
            <div className="absolute mt-3 md:w-[600px] w-[330px] bg-white shadow-lg rounded-xl p-5 z-50">
              <p className="font-bold mb-4 text-lg">Pilih jumlah kamar tidur:</p>
              <div className="grid grid-cols-4 gap-4 mt-4">
                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      className="border px-2 py-1 rounded-lg hover:bg-black hover:text-white cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* LIST PROPERTY */}
          <div className="w-[400px] md:w-full grid grid-cols-1 mt-8">
            {filteredProperties.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                Tidak ada properti yang sesuai kriteria.
              </p>
            ) : (
                filteredProperties.map((item) => <DaftarCard key={item.id} item={item} />)
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Daftarproperti;
