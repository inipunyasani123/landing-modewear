'use client';

import { useState } from 'react';
import { ITEM, JENIS } from '@/lib/koleksi';
import KartuItem from './KartuItem';

export default function SaringKoleksi() {
  const [jenis, setJenis] = useState('semua');
  const data = jenis === 'semua' ? ITEM : ITEM.filter((i) => i.jenis === jenis);
  return (
    <div>
      <div role="group" aria-label="Saring menurut jenis" className="-mx-6 flex gap-2 overflow-x-auto border-b border-onyx/15 px-6 pb-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-6">
        {JENIS.map(([k, l]) => (
          <button key={k} type="button" aria-pressed={jenis === k} onClick={() => setJenis(k)}
            className={`label-caps shrink-0 px-4 py-2.5 ${jenis === k ? 'bg-onyx text-bone' : 'border border-onyx/20 text-onyx hover:border-onyx'}`}>
            {l}
          </button>
        ))}
      </div>
      <p className="label-caps mt-6" aria-live="polite">{data.length} potong</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
        {data.map((i) => <li key={i.slug}><KartuItem item={i} tingkat="h2" /></li>)}
      </ul>
    </div>
  );
}
