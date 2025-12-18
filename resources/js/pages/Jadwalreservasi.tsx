import { FC, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import MainLayout from '@/component/MainLayoutCompany'

/* =========================
   TYPE DATA RESERVASI
========================= */
type Reservasi = {
  ID_RESERVASI: number
  TANGGAL_MELAKUKAN_RESERVASI: string
  JAM_RESERVASI: string
  NAMA_CUSTOMER: string
  NO_TELEPON: string
  NAMA_RUMAH: string
  LOKASI_RUMAH: string
  STATUS_RESERVASI: 'belum' | 'proses' | 'selesai'
}

const Jadwalreservasi: FC = () => {
  /* =========================
     TAB (TETAP)
  ========================= */
  const [tab, setTab] = useState<'proses' | 'belum' | 'selesai'>('proses')

  /* =========================
     DATA DARI BACKEND
     (TIDAK MENGGANGGU DATA DUMMY)
  ========================= */
  const { reservasi = [] } = usePage<{
    reservasi?: Reservasi[]
  }>().props

  /* =========================
     FILTER SESUAI TAB
  ========================= */
  const displayedData = reservasi.filter(
    (r: Reservasi) => r.STATUS_RESERVASI === tab
  )

  /* =========================
     UPDATE STATUS
  ========================= */
  const updateStatus = (
    id: number,
    status: 'belum' | 'proses' | 'selesai'
  ) => {
    router.patch(
      `/company/jadwal-reservasi/${id}/status`,
      { status },
      { preserveScroll: true }
    )
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center w-full min-h-screen bg-[#F7F4EE] pt-40 pb-10">

        {/* TAB BUTTON (TIDAK DIUBAH) */}
        <div className="w-[92%] md:w-[65%] bg-[#E6E1D4] rounded-xl flex justify-between px-2 py-3 mb-8 shadow-md">
          {['Proses', 'Belum', 'Selesai'].map((item) => {
            const key = item.toLowerCase() as 'proses' | 'belum' | 'selesai'
            return (
              <button
                key={item}
                onClick={() => setTab(key)}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition ${
                  tab === key
                    ? 'bg-white shadow'
                    : 'hover:bg-[#D9D4C7]'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>

        {/* TABEL DATA (TIDAK DIUBAH, HANYA TAMBAH AKSI) */}
        <div className="w-[92%] md:w-9/12 bg-white rounded-xl shadow-md overflow-hidden border text-center">
          <table className="w-full text-md">
            <thead className="bg-[#EFEDE6] font-semibold text-lg">
              <tr>
                <th className="py-3 px-4">Waktu Reservasi</th>
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">Lokasi Rumah</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {displayedData.map((d: Reservasi) => (
                <tr
                  key={d.ID_RESERVASI}
                  className="border-t hover:bg-gray-50 transition text-[#404040]"
                >
                  <td className="py-3 px-4 whitespace-pre-line">
                    {d.TANGGAL_MELAKUKAN_RESERVASI}
                    {'\n'}
                    {d.JAM_RESERVASI}
                  </td>

                  <td className="py-3 px-4 whitespace-pre-line">
                    {d.NAMA_CUSTOMER}
                    {'\n'}
                    {d.NO_TELEPON}
                  </td>

                  <td className="py-3 px-4 whitespace-pre-line">
                    {d.NAMA_RUMAH}
                    {'\n'}
                    {d.LOKASI_RUMAH}
                  </td>

                  {/* TOMBOL STATUS */}
                  <td className="space-x-2">
                    {d.STATUS_RESERVASI !== 'proses' && (
                      <button
                        onClick={() =>
                          updateStatus(d.ID_RESERVASI, 'proses')
                        }
                        className="px-3 py-1 bg-yellow-400 text-white rounded"
                      >
                        Proses
                      </button>
                    )}

                    {d.STATUS_RESERVASI !== 'selesai' && (
                      <button
                        onClick={() =>
                          updateStatus(d.ID_RESERVASI, 'selesai')
                        }
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Selesai
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {displayedData.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-gray-400">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </MainLayout>
  )
}

export default Jadwalreservasi