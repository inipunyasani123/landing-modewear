'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV = [
  ['/koleksi', 'Koleksi'],
  ['/#lookbook', 'Lookbook'],
  ['/panduan-ukuran', 'Panduan ukuran'],
  ['/#tanya', 'Pertanyaan'],
];

/* Navigasi utama + menu ponsel. Di ponsel panelnya berupa label jahit: kain putih tulang dengan jahitan putus-putus, nama halaman dalam huruf Italiana.
   Menu tertutup sendiri saat pindah halaman, menekan Escape (fokus kembali ke
   tombol), atau mengetuk di luar panel. */
export default function Navigasi({ children }) {
  const path = usePathname();
  const [buka, setBuka] = useState(false);
  const tombol = useRef(null);
  const panel = useRef(null);

  useEffect(() => setBuka(false), [path]);

  useEffect(() => {
    if (!buka) return undefined;
    const tutup = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      if (e.type === 'pointerdown' && (panel.current?.contains(e.target) || tombol.current?.contains(e.target))) return;
      setBuka(false);
      if (e.type === 'keydown') tombol.current?.focus();
    };
    document.addEventListener('keydown', tutup);
    document.addEventListener('pointerdown', tutup);
    return () => {
      document.removeEventListener('keydown', tutup);
      document.removeEventListener('pointerdown', tutup);
    };
  }, [buka]);

  const aktif = (href) => (!href.includes('#') && href !== '/' && path.startsWith(href) ? 'page' : undefined);

  return (
    <>
      <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} aria-current={aktif(href)} className="label-caps text-thread hover:text-onyx aria-[current=page]:text-rouge">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {children}
        <button
          ref={tombol}
          type="button"
          aria-expanded={buka}
          aria-controls="menu-ponsel"
          onClick={() => setBuka((b) => !b)}
          className="label-caps inline-flex h-11 min-w-[5.25rem] items-center justify-center border border-onyx/25 px-3 text-onyx md:hidden"
        >
          {buka ? 'Tutup' : 'Menu'}
        </button>
      </div>
      <nav id="menu-ponsel" ref={panel} aria-label="Navigasi ponsel" hidden={!buka} className="absolute inset-x-0 top-full border-b border-onyx/15 bg-bone px-4 pt-1 pb-4 shadow-[0_18px_30px_-24px_rgb(20_20_20/0.5)] md:hidden">
        <ol className="label-jahit mx-auto max-w-6xl px-5 py-2">
          {NAV.map(([href, label], i) => (
            <li key={href} className="border-b border-onyx/10 last:border-b-0">
              <Link href={href} onClick={() => setBuka(false)} aria-current={aktif(href)} className="flex items-baseline gap-4 py-3.5 text-onyx aria-[current=page]:text-rouge">
                <span className="label-caps text-rouge">0{i + 1}</span>
                <span className="font-[family-name:var(--font-italiana)] text-2xl">{label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
