import { FC, useEffect, useState, useRef,  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faBed,
  faBath,
  faCar,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { router, usePage, useForm} from '@inertiajs/react';
import MainLayout from '@/component/MainLayoutCompany';


interface Agent {
    ID_AGEN: number;
    NAMA_AGEN: string;
    NOMOR_HP_AGEN:string;
    EMAIL_AGEN: string;
    IMAGE: string;
}

const Uploadrumah: FC = () => {
  const [step, setStep] = useState(1);

  const [namaRumah, setNamaRumah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [kamar, setKamar] = useState("");
  const [kamarMandi, setKamarMandi] = useState("");
  const [luas, setLuas] = useState("");
  const [diskon, setDiskon] = useState("");
  const [garasi, setGarasi] = useState("");
  const [batasDiskon, setBatasDiskon] = useState("");
  const [harga, setHarga] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [agentId, setAgentId] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [jenisPembayaran, setJenisPembayaran] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { agens = []} = usePage().props as { agens?: Agent[] };
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    setStep(1);
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  setImage([...image, ...Array.from(e.target.files)]);
};

  const handleSave = () => {
    const formData = new FormData();
  image.forEach((img, index) => {
  formData.append("foto_rumah[]", img); // bisa pakai array notation agar backend Laravel bisa menerima
});


    formData.append("nama_rumah", namaRumah);
    formData.append("lokasi_rumah", lokasi);
    formData.append("deskripsi", deskripsi);  
    formData.append("kategori", kategori);
    formData.append("jumlah_KT", kamar);
    formData.append("jumlah_km", kamarMandi);
    formData.append("luas_rumah", luas);
    formData.append("parkir_rumah", garasi);
    formData.append("diskon", diskon);
    formData.append("waktu_diskon", batasDiskon);
    formData.append("harga_rumah", harga);
    formData.append("fasilitas", fasilitas);
    formData.append("jumlah_rumah", jumlah);
    formData.append("jenis_pembayaran", jenisPembayaran.join(", ")); // sementara
    formData.append("agent_id", agentId);
    for (let pair of formData.entries()) {
  console.log(pair[0]+ ': '+ pair[1]); 
}

    router.post("/input-rumah/upload-rumah", formData, {
    forceFormData: true,
    onSuccess: () => {
        alert("Rumah berhasil ditambahkan!");
        router.visit('/input-rumah'); // otomatis balik ke list
      }
 
  });
  };
  


  const handleRemove = () => {
    setNamaRumah("");
    setDeskripsi("");
    setKategori("");
    setKamar("");
    setKamarMandi("");
    setLuas("");
    setDiskon("");
    setGarasi("");
    setBatasDiskon("");
    setHarga("");
    setFasilitas("");
    setJumlah("");
    setLokasi("");
    setAgentId("");
    setSelectedAgent(null);
    setName("");
    setPhone("");
    setEmail("");
    setImage([]);

    if (fileRef.current) fileRef.current.value = "";
  };

  const steps = ["Detail Rumah", "Agen", "Persetujuan"];
  const togglePembayaran = (value: string) => {
  setJenisPembayaran(prev =>
    prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value]
  );
};

  return (
    <MainLayout>
      <div className="min-h-screen bg-white pb-30 pt-30">
        <div className="flex items-center justify-center px-10 py-10 bg-[#DDD7C9] relative">
          <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={() => router.visit('/input-rumah')}
            className="absolute fa-3x left-20 cursor-pointer"
          />
          <h1 className="text-3xl font-semibold">EDIT RUMAH</h1>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex flex-col items-center mt-10 max-w-4xl mx-auto relative">
          <div className="absolute top-5 left-[100px] right-[100px] h-[3px] bg-gray-300" />
          <div
            className="absolute top-5 left-[100px] h-[3px] bg-black transition-all"
            style={{
              width: `${((step - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
          <div className="flex justify-between w-full px-16">
            {steps.map((label, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step === i + 1
                      ? "bg-black text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="mt-2">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (

                <div className='w-full md:max-w-4xl max-w-3xl mx-auto px-6 mt-10'>
                      <label className='block font-bold mb-2 text-lg'>Gambar Rumah</label>

  {/* input file multiple */}
  <input
    name='foto_rumah[]'
    type='file'
    accept='image/*'
    multiple
    id='fileInput'
    className='hidden'
    ref={fileRef}
    onChange={handleImage}
  />

  {/* preview */}
  <div
    onClick={() => fileRef.current?.click()}
    className='flex flex-wrap gap-3 mt-5'
  >
    {image.length > 0 ? (
      image.map((img, i) => (
        <div key={i} className='w-32 h-32 border-2 border-gray-400 rounded-lg overflow-hidden relative cursor-pointer'>
          <img
            src={URL.createObjectURL(img)}
            className='w-full h-full object-cover'
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // supaya tidak buka file dialog
              setImage(image.filter((_, index) => index !== i));
            }}
            className='absolute top-1 right-1 bg-white rounded-full p-1 shadow'
          >
            X
          </button>
        </div>
      ))
    ) : (
      <div className='w-32 h-32 border-2 border-gray-400 rounded-lg flex justify-center items-center text-3xl text-gray-500'>
        +
      </div>
    )}
  </div>
                    <label className='block mt-6 text-lg font-bold'>Nama Rumah</label>
                    <input name='nama_rumah' value={namaRumah} onChange={(e) => setNamaRumah(e.target.value)} type='text' placeholder='Masukkan nama rumah' className='w-full border  rounded-md p-3 mt-2'/>
                    <label className='block mt-6 text-lg font-bold'>Lokasi Rumah</label>
                    <input name='lokasi_rumah' value={lokasi} onChange={(e) => setLokasi(e.target.value)} type='text' placeholder='Masukkan nama rumah' className='w-full border  rounded-md p-3 mt-2'/>
                    <label className='block mt-6 text-lg font-bold'>Deskripsi Rumah</label>
                    <textarea name='deskripsi' value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder='Masukkan deskripsi rumah secara lengkap' className='w-full border  rounded-md p-3 mt-2 h-40'/>
                    <label className='block mt-6 text-lg font-bold'>Kategori Rumah</label>
                    <select name='kategori' value={kategori} onChange={(e) => setKategori(e.target.value)} className='w-full border  rounded-md p-3 mt-2' >
                        <option>Pilih kategori bangunan </option>
                        <option>Cluster</option>
                        <option>Apartemen</option>
                        <option>Villa</option>
                        <option>Perumahan Subsidi</option>
                    </select>
                    <label className='block mt-6 text-lg font-bold'>Detail Jumlah</label>
                    <div className='grid grid-cols-4 gap-1 mt-3'>
                        <div className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faBed} className='fa-2x mb-1 text-[#6F6C65]'/>
                            <input name='jumlah_KT' value={kamar} onChange={(e) => setKamar(e.target.value)} type='number' className='border rounded-md w-2/3 py-4 px-3'></input>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faBath} className='fa-2x mb-1 text-[#6F6C65]'/>
                            <input name='jumlah_km' value={kamarMandi} onChange={(e) => setKamarMandi(e.target.value)} type='number' className='border rounded-md w-2/3 py-4 px-3'></input>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faSquare} className='fa-2x mb-1 text-[#6F6C65]'/>
                            <input name='luas_rumah' value={luas} onChange={(e) => setLuas(e.target.value)} type='number' className='border rounded-md w-2/3 py-4 px-3'></input>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faCar} className='fa-2x mb-1 text-[#6F6C65]'/>
                            <input name='parkir_rumah' value={garasi} onChange={(e) => setGarasi(e.target.value)} type='number' className='border rounded-md w-2/3 py-4 px-3'></input>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div className='mt-6 flex items-center gap-4'>
                            <label className='font-semibold'>Diskon</label>
                            <div className='flex gap-2 mt-1'>
                                <input name='diskon' value={diskon} onChange={(e) => setDiskon(e.target.value)} type='number' placeholder='0' className='border p-2 rounded w-30'/>
                                <span className='flex items-center text-xl font-semibold'>%</span>
                            </div>
                        </div>
                        <div className='mt-6 flex items-center gap-4'>
                            <label className='font-semibold'>Batas Waktu Diskon</label>
                            <input name='waktu_diskon' value={batasDiskon} onChange={(e) => setBatasDiskon(e.target.value)} type='date'  className="border rounded-md p-2 w-full mt-1" ></input>
                        </div>
                    </div>
                    <label className='block mt-6 text-lg font-bold'>Harga</label>
                    <input name='harga_rumah' value={harga} onChange={(e) => setHarga(e.target.value)} type='text' placeholder='Masukkan harga' className='w-full border  rounded-md p-3 mt-2'/>
                    <label className='block mt-6 text-lg font-bold'>Jenis Pembayaran</label>
                    <div className='grid md:grid-cols-4  grid-cols-2 mt-3'>
                        <label className='flex gap-3 items-center'>
                            DP<input type='checkbox' name='jenis_pembayaran' value='DP'  checked={jenisPembayaran.includes("DP")} onChange={() => togglePembayaran("DP")} /> 
                        </label>
                        <label className='flex gap-3 items-center text-wrap'>
                            Angsuran /Bulan<input type='checkbox' name='jenis_pembayaran' value='Angsuran / Bulan' checked={jenisPembayaran.includes("Angsuran / Bulan")} onChange={() => togglePembayaran("Angsuran / Bulan")}/>
                        </label>
                        <label className='flex gap-3 items-center'>
                           Angsuran /Tahun<input type='checkbox' name='jenis_pembayaran' value='Angsuran / Tahun' checked={jenisPembayaran.includes("Angsuran / Tahun")} onChange={() => togglePembayaran("Angsuran / Tahun")} />
                        </label>
                        <label className='flex gap-3 items-center'>
                           Lunas<input type='checkbox' name='jenis_pembayaran' value='Lunas' checked={jenisPembayaran.includes("Lunas")}  onChange={() => togglePembayaran("Lunas")} />
                        </label>
                    </div>
                     <label className='block mt-6 text-lg font-bold'>Fasilitas Rumah</label>
                    <textarea name='fasilitas' value={fasilitas} onChange={(e) => setFasilitas(e.target.value)} placeholder='Masukkan fasilitas rumah secara lengkap' className='w-full border  rounded-md p-3 mt-2 h-40'/>
                    <label className='block mt-6 text-lg font-bold'>Jumlah Rumah Tersedia</label>
                    <input name='jumlah_rumah' value={jumlah} onChange={(e) => setJumlah (e.target.value)} type='number' placeholder='Berapa rumah yang tersedia' className='w-full border  rounded-md p-3 mt-2'/>
                    <div className='flex gap-6 mt-10'>
                        <button className='px-5 py-3 bg-[#C3C1BF] text-black rounded-md font-bold cursor-pointer'>Remove</button>
                        <button type='button' onClick={() => setStep(2)} className='px-8 py-3 bg-[#707070] text-white rounded-md font-bold cursor-pointer'>Next</button>
                    </div>
                </div>
            )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto px-6 mt-10">
            <label className="font-bold">Nama Agen</label>
            <select
              className="w-full border p-3 mt-2"
              name='agent_id'
              value={agentId}
              onChange={(e) => {
                const id = Number(e.target.value);
                setAgentId(e.target.value);
                setSelectedAgent( agens.find(a => a.ID_AGEN === id) || null
);

              }}
            >
              <option value="">Pilih Agen</option>
               {agens.length > 0 && agens.map(ag => (
                <option key={ag.ID_AGEN} value={ag.ID_AGEN}>{ag.NAMA_AGEN}</option>
              ))} 
            </select>

            <div className="flex gap-6 mt-10">
              <button type='button' onClick={() => setStep(1)} className="px-6 py-3 bg-gray-300 rounded">
                Before
              </button>
              <button type='button' onClick={() => setStep(3)} className="px-6 py-3 bg-gray-600 text-white rounded">
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
                <div className='w-full max-w-4xl mx-auto px-3 mt-10'>
                    <h2 className='text-center items-center text-2xl font-bold mb-8'>Konfirmasi & Persetujuan</h2>
                    <p className='text-xl mb-6 '>Silakan pastikan semua data yang Anda isi pada langkah sebelumnya. </p>
                    <p className='text-xl mb-6'>Pastikan bahwa: <br/>1.  Informasi rumah sudah lengkap dan sesuai. <br/>2. Data agen sudah benar dan sesuai pilihan anda.</p>
                    <p className='text-xl mb-6'>Dengan menekan tombol "Save", Anda menyatakan bahwa seluruh data yang anda berikan adalah benar dan valid.</p>
                    <div className='flex gap-6 mt-10'>
                        <button type='button' onClick={() => setStep(2)} className='px-8 py-3 bg-[#C3C1BF] text-black rounded-md font-bold cursor-pointer'>Before</button>
<button type="button" onClick={() => router.visit('/input-rumah')}>
  Batal
</button>

                        <button type='button' onClick={() => {handleSave() }} className='px-8 py-3 bg-[#707070] text-white rounded-md font-bold cursor-pointer'>Save</button>
                    </div>
                </div>
            )}
      </div>
    </MainLayout>
  );
};

export default Uploadrumah;
