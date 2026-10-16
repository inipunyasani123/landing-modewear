'use client';

import { useState } from 'react';
import Link from 'next/link';
import { rp } from '@/lib/koleksi';

export default function PraPesan({ item, kirim }) {
  const [warna, setWarna] = useState(item.warna[0][0]);
  const [ukuran, setUkuran] = useState('');
  const [selesai, setSelesai] = useState(false);

  if (selesai) {
    return (
      <div role="status" className="label-jahit px-7 py-8">
        <p className="label-caps text-rouge">Tercatat</p>
        <p className="mt-3 font-[family-name:var(--font-italiana)] text-3xl">{item.nama} · {warna} · {ukuran}</p>
        <p className="mt-3 text-sm leading-relaxed text-thread">Ini purwarupa desain: tidak ada pesanan atau pembayaran yang benar-benar terjadi.</p>
        <button type="button" onClick={() => setSelesai(false)} className="label-caps mt-5 border border-onyx/25 px-4 py-2.5 hover:border-onyx">Ubah pilihan</button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSelesai(true); }} className="space-y-6">
      <fieldset>
        <legend className="label-caps mb-3 text-onyx">Warna: {warna}</legend>
        <div className="flex gap-3">
          {item.warna.map(([n, h]) => (
            <label key={n} className={`cursor-pointer rounded-full p-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rouge ${warna === n ? 'ring-2 ring-onyx' : 'ring-1 ring-onyx/20'}`}>
              <input type="radio" name="warna" value={n} checked={warna === n} onChange={() => setWarna(n)} className="sr-only" />
              <span className="block h-9 w-9 rounded-full" style={{ background: h }} />
              <span className="sr-only">{n}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="label-caps mb-3 text-onyx">Ukuran</legend>
        <div className="flex flex-wrap gap-2">
          {item.ukuran.map((u) => (
            <label key={u} className={`flex h-11 min-w-12 cursor-pointer items-center justify-center border px-3 text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rouge ${ukuran === u ? 'border-onyx bg-onyx text-bone' : 'border-onyx/25 text-onyx hover:border-onyx'}`}>
              <input type="radio" name="ukuran" value={u} required checked={ukuran === u} onChange={() => setUkuran(u)} className="sr-only" />
              {u}
            </label>
          ))}
        </div>
        <Link href={`/panduan-ukuran?item=${item.slug}`} className="mt-3 inline-block text-sm text-rouge underline underline-offset-4">Belum yakin ukurannya? Buka panduan ukuran</Link>
      </fieldset>
      <button type="submit" className="w-full bg-onyx py-4 text-sm font-semibold tracking-wide text-bone hover:bg-rouge">
        Pra-pesan · {rp(item.harga)}
      </button>
      <p className="text-xs leading-relaxed text-thread">Gelombang ini dikirim mulai {kirim}. Purwarupa desain — tidak ada data yang dikirim.</p>
    </form>
  );
}
