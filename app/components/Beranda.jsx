import Image from 'next/image';
import Link from 'next/link';
import { FAQ as DAFTAR, ITEM, KAPSUL, PRINSIP, gelombang } from '@/lib/koleksi';
import HitungMundur from './HitungMundur';
import KartuItem from './KartuItem';

export function Hero() {
  const g = gelombang();
  return (
    <section className="bg-bone px-6 pt-24 pb-14 md:pt-32 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-end gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="lg:pb-10">
          <p className="label-caps text-rouge">Kapsul {KAPSUL.nomor} · {KAPSUL.nama}</p>
          <h1 className="mt-5 text-[3rem] leading-[0.98] text-onyx sm:text-7xl md:mt-6 lg:text-[5.4rem]">Delapan potong untuk lima hari kerja</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed md:mt-7">
            Kemeja, celana, outer, dan gaun dari satu palet — setiap atasan cocok dengan setiap bawahan. Dijahit setelah Anda memesan, jadi tidak ada yang berakhir di rak obral.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-9">
            <Link href="/koleksi" className="inline-flex justify-center bg-onyx px-8 py-4 text-sm font-semibold tracking-wide text-bone hover:bg-rouge">Lihat delapan potong</Link>
            <Link href="/panduan-ukuran" className="inline-flex justify-center border border-onyx/30 px-8 py-4 text-sm font-semibold tracking-wide text-onyx hover:border-onyx">Cari ukuran Anda</Link>
          </div>
          <div className="mt-10 border-t border-onyx/15 pt-6 md:mt-12"><HitungMundur tutup={g.tutup} tutupTeks={g.tutupTeks} tutupPendek={g.tutupPendek} /></div>
        </div>
        <figure>
          <Image src="/images/editorial/kota.webp" alt="Perempuan bermantel cokelat dan celana lebar berjalan di trotoar bata" width={960} height={1200} priority sizes="(min-width: 1024px) 31rem, 100vw" className="h-auto w-full" />
          <figcaption className="label-caps mt-3 text-thread">Foto suasana (CC0) — bukan produk Modewear</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Kapsul() {
  return (
    <section className="bg-bone-2 px-6 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end md:mb-12">
          <div>
            <p className="label-caps text-rouge">Isi kapsul</p>
            <h2 className="mt-4 text-[2.4rem] leading-[1.05] text-onyx md:text-6xl">Satu palet, delapan label</h2>
          </div>
          <Link href="/koleksi" className="label-caps shrink-0 border-b border-onyx pb-1 text-onyx">Saring per jenis</Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {ITEM.map((i) => <li key={i.slug}><KartuItem item={i} /></li>)}
        </ul>
      </div>
    </section>
  );
}

export function Prinsip() {
  return (
    <section className="bg-bone px-6 py-16 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="aspect-[16/10] overflow-hidden sm:aspect-auto">
          <Image src="/images/editorial/kemeja.webp" alt="Tumpukan kemeja terlipat rapi di atas meja kayu toko" width={960} height={1200} sizes="(min-width: 1024px) 28rem, 100vw" className="h-full w-full object-cover sm:h-auto" />
        </div>
        <div>
          <p className="label-caps text-rouge">Cara kami membuat</p>
          <h2 className="mt-4 text-[2.4rem] leading-[1.05] text-onyx md:text-6xl">Sedikit, tapi tahan lama</h2>
          <ol className="mt-8 space-y-6 md:mt-10 md:space-y-8">
            {PRINSIP.map(([j, d], i) => (
              <li key={j} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3">
                <span className="font-[family-name:var(--font-italiana)] text-3xl text-rouge">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl text-onyx">{j}</h3>
                  <p className="mt-2 leading-relaxed">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const LOOK = [
  ['dermaga', 'Perempuan bersweater krem berdiri di tepi dermaga', 'Kaus tebal · Krem', 'kaus-tebal'],
  ['atap', 'Laki-laki berjas duduk di kursi di atap gedung', 'Celana bahan lurus · Abu batu', 'celana-lurus'],
  ['pintu', 'Perempuan bergaun biru muda bersandar di pintu toska', 'Gaun kemeja · Biru muda', 'gaun-kemeja'],
];

export function Lookbook() {
  return (
    <section id="lookbook" className="scroll-mt-16 bg-onyx px-6 py-16 text-bone md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="label-caps text-bone/80">Lookbook</p>
        <h2 className="mt-4 max-w-2xl text-[2.4rem] leading-[1.05] text-bone md:text-6xl">Dipakai di jalan, bukan di studio</h2>
        <ul className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {LOOK.map(([f, alt, ket, slug]) => (
            <li key={f} className="w-[72%] shrink-0 snap-center md:w-auto">
              <Link href={`/koleksi/${slug}`} className="group block">
                <Image src={`/images/editorial/${f}.webp`} alt={alt} width={960} height={1200} sizes="(min-width: 768px) 30vw, 72vw" className="h-auto w-full transition-opacity group-hover:opacity-90" />
                <span className="label-caps mt-4 block text-bone/80">{ket}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-bone/70 md:mt-8">Foto suasana dari StockSnap (CC0); pakaian di foto bukan produk Modewear.</p>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="tanya" className="scroll-mt-16 bg-bone px-6 py-16 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 md:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="label-caps text-rouge">Pertanyaan</p>
          <h2 className="mt-4 text-[2.4rem] leading-[1.05] text-onyx md:text-5xl">Sebelum pra-pesan</h2>
          <div className="relative mt-10 hidden aspect-[4/5] max-w-xs lg:block">
            <Image src="/images/editorial/lemari.webp" alt="Lemari pakaian terbuka berisi kemeja tergantung dan sepatu tersusun" fill sizes="20rem" className="object-cover" />
          </div>
        </div>
        <div className="border-t border-onyx">
          {DAFTAR.map((f) => (
            <details key={f.t} className="group border-b border-onyx/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg text-onyx [&::-webkit-details-marker]:hidden">
                {f.t}
                <span aria-hidden="true" className="text-rouge transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 leading-relaxed">{f.j}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
