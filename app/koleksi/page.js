import { KAPSUL, SITE, gelombang } from '@/lib/koleksi';
import SaringKoleksi from '../components/SaringKoleksi';
import HitungMundur from '../components/HitungMundur';

export const metadata = {
  title: `Kapsul ${KAPSUL.nomor} “${KAPSUL.nama}”`,
  description: `Delapan potong Kapsul ${KAPSUL.nomor} “${KAPSUL.nama}” Modewear: kemeja, kaus, blazer, celana, kulot, rok, dan gaun dari satu palet, dijahit setelah dipesan.`,
  alternates: { canonical: `${SITE}/koleksi` },
};

export default function Koleksi() {
  const g = gelombang();
  return (
    <main className="bg-bone px-6 pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 md:mb-12 md:gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="label-caps text-rouge">Kapsul {KAPSUL.nomor} · {KAPSUL.nama}</p>
            <h1 className="mt-4 text-[2.8rem] leading-[1] text-onyx md:text-7xl">Delapan potong, satu palet</h1>
          </div>
          <HitungMundur tutup={g.tutup} tutupTeks={g.tutupTeks} tutupPendek={g.tutupPendek} />
        </div>
        <SaringKoleksi />
      </div>
    </main>
  );
}
