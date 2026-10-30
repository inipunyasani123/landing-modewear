import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ITEM, KAPSUL, SITE, gelombang, itemBySlug, rp } from '@/lib/koleksi';
import { LabelJahit } from '../../components/KartuItem';
import LabelRawat from '../../components/LabelRawat';
import PraPesan from '../../components/PraPesan';

/* Deskripsi meta maksimal 155 karakter: dipotong di akhir kalimat bila bisa, kalau tidak di batas kata. */
const ringkas = (t, n = 155) => {
  if (t.length <= n) return t;
  const titik = t.lastIndexOf('. ', n - 1);
  return titik > 80 ? t.slice(0, titik + 1) : `${t.slice(0, t.lastIndexOf(' ', n - 1))}…`;
};

export function generateStaticParams() {
  return ITEM.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const i = itemBySlug(slug);
  if (!i) return {};
  return {
    title: i.nama,
    description: ringkas(`${i.nama} Modewear, Kapsul ${KAPSUL.nomor}: ${i.bahan}. ${i.ringkas} ${i.pas}`),
    alternates: { canonical: `${SITE}/koleksi/${i.slug}` },
  };
}

export default async function Item({ params }) {
  const { slug } = await params;
  const item = itemBySlug(slug);
  if (!item) notFound();
  const g = gelombang();
  const padanan = ITEM.filter((x) => x.slug !== item.slug && x.jenis !== item.jenis).slice(0, 3);
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: item.nama, image: `${SITE}/images/koleksi/${item.slug}.webp`, material: item.bahan, brand: { '@type': 'Brand', name: 'Modewear' }, offers: { '@type': 'Offer', price: item.harga, priceCurrency: 'IDR', availability: 'https://schema.org/PreOrder' } };

  return (
    <main className="bg-bone px-6 pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="self-start lg:sticky lg:top-24">
          <Image
            src={`/images/koleksi/${item.slug}.webp`}
            alt={`Foto contoh ${item.nama.toLowerCase()}`}
            width={960}
            height={1200}
            priority
            sizes="(min-width: 1024px) 28rem, 100vw"
            className="aspect-[4/5] h-auto w-full object-cover"
          />
          <p className="mt-3 text-xs leading-relaxed text-thread">Foto hanya gambaran potongan sejenis. Warna kain sebenarnya dipilih lewat chip warna di samping.</p>
          <div className="mt-6"><LabelJahit item={item} /></div>
        </div>

        <div>
          <p className="label-caps text-rouge"><Link href="/koleksi" className="hover:underline">Kapsul {KAPSUL.nomor}</Link> · {item.jenis}</p>
          <h1 className="mt-4 text-[2.8rem] leading-[1] text-onyx md:text-6xl">{item.nama}</h1>
          <p className="mt-4 text-2xl text-onyx">{rp(item.harga)}</p>
          <p className="mt-6 text-lg leading-relaxed">{item.ringkas}</p>
          <dl className="mt-8 grid gap-px border border-onyx/12 bg-onyx/12 sm:grid-cols-2">
            <div className="bg-bone p-4"><dt className="label-caps">Bahan</dt><dd className="mt-1 text-onyx">{item.bahan}</dd></div>
            <div className="bg-bone p-4"><dt className="label-caps">Berat kain</dt><dd className="mt-1 text-onyx">{item.berat}</dd></div>
            <div className="bg-bone p-4 sm:col-span-2"><dt className="label-caps">Pas di badan</dt><dd className="mt-1 text-onyx">{item.pas}</dd></div>
          </dl>
          <div className="mt-10"><PraPesan item={item} kirim={g.kirimTeks} /></div>
          <section aria-labelledby="rawat" className="mt-12 border-t border-onyx/15 pt-8">
            <h2 id="rawat" className="label-caps mb-5 text-onyx">Perawatan</h2>
            <LabelRawat kode={item.rawat} />
          </section>
        </div>
      </div>

      <section aria-labelledby="padan" className="mx-auto mt-16 max-w-6xl border-t border-onyx/15 pt-10 md:mt-20 md:pt-12">
        <h2 id="padan" className="text-4xl text-onyx">Dipadankan dengan</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {padanan.map((p) => (
            <li key={p.slug}>
              <Link href={`/koleksi/${p.slug}`} className="flex items-center gap-4 border border-onyx/12 p-4 hover:border-onyx">
                <Image src={`/images/koleksi/${p.slug}.webp`} alt="" width={56} height={70} className="h-[4.4rem] w-14 shrink-0 object-cover" />
                <span><span className="block text-onyx">{p.nama}</span><span className="text-sm">{rp(p.harga)}</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </main>
  );
}
