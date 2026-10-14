# Modewear — Pakaian Kerja yang Dijahit Setelah Dipesan

Modewear Kapsul 05 "Kota": delapan potong pakaian kerja dari satu palet, dijahit setelah dipesan. Pra-pesan ditutup 25 Oktober 2026; panduan ukuran tersedia.

**Demo live:** https://landing-modewear.pintuweb.id

![Tangkapan layar Modewear](public/og.jpg)

> Template landing page untuk bisnis fiktif. Formulir di dalamnya hanya demo dan tidak mengirim data.

## Konsep

Bahasa rupa **Label Jahit**: huruf tipis berjarak lebar, warna kain tulang, dan garis jahitan sebagai pemisah.

## Halaman

- `/` — Kapsul 05 "Kota": hitung mundur pra-pesan, prinsip, lookbook
- `/koleksi` — delapan potong dengan saringan jenis
- `/koleksi/[slug]` — detail item, contoh kain, label jahit, dan simbol perawatan
- `/panduan-ukuran` — pencari ukuran dari tiga lingkar badan dan tabel ukuran

## Teknologi

- Next.js 15.5 (App Router) dan React 19
- Tailwind CSS v4
- JavaScript
- Font: Italiana, Inter (next/font)
- SEO: metadata per halaman, Open Graph, JSON-LD, sitemap.xml, dan robots.txt

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk build produksi: `npm run build` lalu `npm start`.

## Kredit foto

Foto suasana berlisensi **CC0 (domain publik)** dari StockSnap; pakaian di foto bukan produk Modewear.

- `public/images/editorial/kota.webp` — "Fashion Woman" oleh Matt Moloney ([sumber](https://stocksnap.io/photo/fashion-woman-FZXCFSBZ2W)). Dipotong ke 4:5.
- `public/images/editorial/dermaga.webp` — "Urban Fashion" oleh Matt Moloney ([sumber](https://stocksnap.io/photo/urban-fashion-TQAKNY0XO2)). Dipotong ke 4:5.
- `public/images/editorial/atap.webp` — "Man Fashion" oleh Burst ([sumber](https://stocksnap.io/photo/man-fashion-MGUA6ZIL09)). Dipotong ke 4:5.
- `public/images/editorial/pintu.webp` — "People Girl" oleh MARK ADRIANE ([sumber](https://stocksnap.io/photo/people-girl-WFICN0VTPG)). Dipotong ke 4:5.
- `public/images/editorial/kemeja.webp` — "Dressshirts Fashion" oleh Patryk Dziejma ([sumber](https://stocksnap.io/photo/dressshirts-fashion-TS7R6391UQ)). Dipotong ke 4:5.
- `public/images/editorial/lemari.webp` — "Wardrobe Closet" oleh Oliver Klein ([sumber](https://stocksnap.io/photo/wardrobe-closet-YISUDLOYC3)). Dipotong ke 4:5.

---

Bagian dari koleksi 17 template landing page di [PortalLanding](https://www.pintuweb.id/landing-page). Dibuat oleh [PintuWeb](https://www.pintuweb.id), jasa pembuatan website.
