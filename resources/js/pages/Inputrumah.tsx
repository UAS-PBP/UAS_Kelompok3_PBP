import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBed, faBath, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/component/MainLayoutCompany';
import Uploadrumah from './Uploadrumah';

interface PropertyCompany {
  ID_RUMAH: number;
  NAMA_RUMAH: string;
  LOKASI_RUMAH: string;
  JUMLAH_KT: number;
  JUMLAH_KM: number;
  LUAS_BANGUNAN: number;
  HARGA_ASLI: number;
  DISKON: number;
  JUMLAH_LIKE: number;
  IMAGE: string;
}

const CompanyCard: FC<{ item: PropertyCompany }> = ({ item }) => {
  const hargaDiskon =
    item.DISKON > 0
      ? item.HARGA_ASLI - (item.HARGA_ASLI * item.DISKON) / 100
      : null;
       const handleDelete = () => {
    if (confirm('Yakin mau hapus rumah ini?')) {
      router.delete(`/input-rumah/${item.ID_RUMAH}`);
    }
  };
  const images = JSON.parse(item.IMAGE);
const thumbnail = images[0];


  return (
    <div className="flex flex-col mt-10">
      <div className="flex bg-white rounded-2xl shadow-xl px-5 py-5 gap-4">
        <img
          src={`/storage/${thumbnail}`}
          className="w-[450px] rounded-2xl object-cover"
          alt={item.NAMA_RUMAH}
        />

        <div className="px-10 pt-5">
          <h2 className="font-bold text-3xl text-[#2C3638] uppercase mb-2">
            {item.NAMA_RUMAH}
          </h2>

          <div className="flex items-center text-sm text-[#2C3638] gap-2 mb-4">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{item.LOKASI_RUMAH}</span>
          </div>

          <div className="flex items-center text-gray-700 text-md gap-6 mb-8">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBed} />
              <span>{item.JUMLAH_KT} KT</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBath} />
              <span>{item.JUMLAH_KM} KM</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSquare} />
              <span>{item.LUAS_BANGUNAN} m²</span>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            {hargaDiskon ? (
              <>
                <span className="line-through text-gray-400 text-sm">
                  Rp {item.HARGA_ASLI.toLocaleString('id-ID')}
                </span>
                <span className="text-xl font-bold">
                  Rp {hargaDiskon.toLocaleString('id-ID')}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">
                Rp {item.HARGA_ASLI.toLocaleString('id-ID')}
              </span>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-gray-400 text-white rounded-md flex items-center gap-2" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> {/* ikon sampah */}
                Hapus
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Inputrumah() {
  const { props, url } = usePage<any>();
  const propertiesCompany = props.propertiesCompany as PropertyCompany[];


  const isUploadPage = url === '/input-rumah/upload-rumah';


  return (
    <MainLayout>
      <div className="flex flex-col items-center w-full pt-30 bg-[#F7F4EE]">
        {!isUploadPage && (
          <div className="w-full flex justify-end gap-10 pt-10 pb-10 pr-30">
            <button
              onClick={() => router.visit('/input-rumah/upload-rumah')}
              className="px-10 py-6 rounded-3xl bg-[#6F6C65] text-xl text-white font-semibold hover:bg-[#DDD7C9]"
            >
              Input Rumah
            </button>

          </div>
        )}


        {!isUploadPage && (
          <div className="w-full min-h-screen flex flex-col px-50 pb-30">
            {propertiesCompany.map((item) => (
              <CompanyCard key={item.ID_RUMAH} item={item} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Inputrumah;