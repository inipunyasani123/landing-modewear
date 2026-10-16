'use client';

import { useEffect, useState } from 'react';
import { gelombang } from '@/lib/koleksi';

/* Hitung mundur ke tenggat gelombang jahit yang sedang dibuka. Nilai awal
   datang dari server (props) supaya HTML dan hidrasi sama persis; setelah
   itu peramban menghitung sendiri, dan bila tenggat lewat ia pindah ke
   gelombang berikutnya — tidak pernah macet di 00:00. */
export default function HitungMundur({ tutup, tutupTeks, tutupPendek, terang = false }) {
  const [g, setG] = useState({ tutup, tutupTeks, tutupPendek });
  const [sisa, setSisa] = useState(null);

  useEffect(() => {
    const tik = () => {
      let target = g.tutup;
      if (Date.now() >= target) {
        const baru = gelombang();
        setG({ tutup: baru.tutup, tutupTeks: baru.tutupTeks, tutupPendek: baru.tutupPendek });
        target = baru.tutup;
      }
      setSisa(Math.max(0, target - Date.now()));
    };
    tik();
    const id = setInterval(tik, 30000);
    return () => clearInterval(id);
  }, [g.tutup]);

  const warna = terang ? 'text-bone' : 'text-onyx';
  const lembut = terang ? 'text-bone/80' : 'text-thread';
  const keterangan = <p className={`mt-2 text-xs ${lembut}`}>Ditutup {g.tutupTeks} · dijahit bersama, dikirim tiga minggu kemudian</p>;
  // Sebelum JavaScript jalan: struktur dan tinggi yang sama (tanggal, bukan hitungan), jadi tidak ada geser tata letak.
  if (sisa === null) {
    return (
      <div>
        <p className={`label-caps ${lembut}`}>Tenggat pra-pesan gelombang ini</p>
        <p className={`mt-2 h-10 font-[family-name:var(--font-italiana)] text-4xl leading-10 ${warna}`}>{g.tutupPendek}</p>
        {keterangan}
      </div>
    );
  }
  const hari = Math.floor(sisa / 86400000);
  const jam = Math.floor((sisa % 86400000) / 3600000);
  const menit = Math.floor((sisa % 3600000) / 60000);
  return (
    <div>
      <p className={`label-caps ${lembut}`}>Tenggat pra-pesan gelombang ini</p>
      <p className={`mt-2 flex h-10 items-baseline gap-5 overflow-hidden font-[family-name:var(--font-italiana)] text-4xl leading-10 sm:gap-6 ${warna}`}>
        {[[hari, 'hari'], [jam, 'jam'], [menit, 'menit']].map(([n, l]) => (
          <span key={l} className="tabular-nums">
            {n}
            <span className="label-caps ml-1.5 text-[0.65rem] tracking-[0.2em]">{l}</span>
          </span>
        ))}
      </p>
      {keterangan}
    </div>
  );
}
