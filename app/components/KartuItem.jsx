import Link from 'next/link';
import { rp } from '@/lib/koleksi';
import LabelRawat from './LabelRawat';

/* Kartu potongan pakaian: contoh kain (warna pertama) dengan tekstur tenun,
   label jahit menempel di atasnya. Tidak memakai foto produk. */
export function ContohKain({ hex, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        backgroundColor: hex,
        backgroundImage:
          'repeating-linear-gradient(0deg, rgb(255 255 255 / 0.07) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgb(0 0 0 / 0.06) 0 1px, transparent 1px 3px)',
      }}
    />
  );
}

export function LabelJahit({ item, kecil = false }) {
  return (
    <div className={`label-jahit ${kecil ? 'px-3 py-3 sm:px-5 sm:py-4' : 'px-7 py-6'}`}>
      <p className="label-caps text-rouge">Modewear</p>
      <p className={`mt-2 font-[family-name:var(--font-italiana)] ${kecil ? 'text-base leading-tight sm:text-xl' : 'text-3xl'}`}>{item.nama}</p>
      <p className={`mt-2 text-xs leading-relaxed text-thread ${kecil ? 'hidden sm:block' : ''}`}>{item.bahan}</p>
      <p className="label-caps mt-2 text-onyx">{item.ukuran[0]}–{item.ukuran[item.ukuran.length - 1]}</p>
      {!kecil && <div className="mt-4"><LabelRawat kode={item.rawat} ringkas /></div>}
    </div>
  );
}

export default function KartuItem({ item, tingkat = 'h3' }) {
  const H = tingkat;
  return (
    <Link href={`/koleksi/${item.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <ContohKain hex={item.warna[0][1]} className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute right-3 bottom-3 left-3 sm:right-5 sm:bottom-5 sm:left-5">
          <LabelJahit item={item} kecil />
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-0.5 sm:mt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <H className="text-lg leading-tight text-onyx sm:text-xl">{item.nama}</H>
        <span className="shrink-0 text-sm text-onyx">{rp(item.harga)}</span>
      </div>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {item.warna.map(([n, h]) => (
          <span key={n} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-3 w-3 rounded-full border border-onyx/20" style={{ background: h }} />
            <span className="sr-only sm:not-sr-only">{n}</span>
          </span>
        ))}
        <span className="text-xs sm:hidden" aria-hidden="true">{item.warna.length} warna</span>
      </p>
    </Link>
  );
}
