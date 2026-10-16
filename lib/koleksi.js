/* ==========================================================================
   MODEWEAR — label kecil pakaian kerja. Kapsul 05 "Kota": delapan potong
   yang bisa dipadu satu sama lain, dibuat lewat pra-pesan per ukuran.
   Satu sumber isi untuk beranda, koleksi, detail, dan panduan ukuran.
   Nama, harga, dan jadwal adalah contoh untuk purwarupa desain.
   ========================================================================== */

export const SITE = 'https://landing-modewear.pintuweb.id';

export const KAPSUL = {
  nomor: '05',
  nama: 'Kota',
  produksi: 'tiga minggu',
};

/* --------------------------------------------------------------------------
   Gelombang jahit. Pra-pesan dikumpulkan per bulan dan ditutup setiap Minggu
   terakhir pukul 23.59 WIB; semua pesanan gelombang itu dijahit bersama dan
   dikirim mulai Senin tiga minggu kemudian (tutup + 22 hari). Dihitung dari
   waktu sekarang — di server saat render (revalidate tiap jam di layout) dan
   di peramban oleh hitung mundur — jadi tenggatnya tidak pernah basi.
   -------------------------------------------------------------------------- */
const WIB = 7 * 3600 * 1000;
const HARI = 86400 * 1000;

function mingguTerakhir(tahun, bulan) {
  const akhir = new Date(Date.UTC(tahun, bulan + 1, 0)); // hari terakhir bulan itu
  return new Date(Date.UTC(tahun, bulan, akhir.getUTCDate() - akhir.getUTCDay()));
}

const fmt = (d, o) => d.toLocaleDateString('id-ID', { ...o, timeZone: 'UTC' });

/** Gelombang pra-pesan yang sedang dibuka pada waktu `sekarang` (ms). */
export function gelombang(sekarang = Date.now()) {
  const t = new Date(sekarang + WIB);
  let bulan = t.getUTCMonth();
  let hari = mingguTerakhir(t.getUTCFullYear(), bulan);
  // tutup = 23.59 WIB pada hari itu, dinyatakan dalam milidetik UTC
  while (hari.getTime() + (23 * 60 + 59) * 60000 - WIB < sekarang) {
    bulan += 1;
    hari = mingguTerakhir(t.getUTCFullYear(), bulan);
  }
  const kirim = new Date(hari.getTime() + 22 * HARI);
  return {
    tutup: hari.getTime() + (23 * 60 + 59) * 60000 - WIB,
    bulan: fmt(hari, { month: 'long' }),
    tutupTeks: `${fmt(hari, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} pukul 23.59 WIB`,
    tutupPendek: fmt(hari, { day: 'numeric', month: 'long' }),
    kirimTeks: fmt(kirim, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

export const rp = (n) => `Rp ${n.toLocaleString('id-ID')}`;

/* Kode perawatan → keterangan; simbolnya digambar di komponen LabelRawat. */
export const RAWAT = {
  cuci30: 'Cuci mesin 30 °C',
  cuciTangan: 'Cuci tangan',
  tanpaPemutih: 'Jangan diberi pemutih',
  setrikaSedang: 'Setrika suhu sedang',
  setrikaRendah: 'Setrika suhu rendah',
  tanpaPengering: 'Jangan masuk mesin pengering',
  jemurTeduh: 'Jemur di tempat teduh',
};

export const ITEM = [
  {
    slug: 'kemeja-linen-rami', nama: 'Kemeja Linen Rami', jenis: 'atasan', harga: 489000,
    bahan: 'Linen 55% · rami 45%', berat: '150 g/m²',
    warna: [['Putih tulang', '#efe9dd'], ['Biru batu', '#6f8193']],
    ukuran: ['XS', 'S', 'M', 'L', 'XL'], rawat: ['cuci30', 'tanpaPemutih', 'setrikaSedang', 'jemurTeduh'],
    ringkas: 'Kemeja longgar yang tetap rapi setelah delapan jam duduk. Kusutnya halus, bukan berantakan.',
    pas: 'Potongan longgar; pilih ukuran biasa Anda. Lengan sedikit lebih panjang untuk digulung.',
  },
  {
    slug: 'kemeja-oxford', nama: 'Kemeja Katun Oxford', jenis: 'atasan', harga: 429000,
    bahan: 'Katun oxford 100%', berat: '130 g/m²',
    warna: [['Biru muda', '#a9bed3'], ['Putih', '#f6f5f1']],
    ukuran: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], rawat: ['cuci30', 'tanpaPemutih', 'setrikaSedang'],
    ringkas: 'Kemeja kantor yang tidak menuntut setrika setiap pagi. Kerah lunak, kancing kerah tersembunyi.',
    pas: 'Potongan sedang. Bila ragu di antara dua ukuran, pilih yang lebih kecil.',
  },
  {
    slug: 'kaus-tebal', nama: 'Kaus Kerah Bulat Tebal', jenis: 'atasan', harga: 229000,
    bahan: 'Katun sisir 100%', berat: '220 g/m²',
    warna: [['Arang', '#33312e'], ['Krem', '#e8dfcf'], ['Hijau zaitun', '#6b6d4b']],
    ukuran: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], rawat: ['cuci30', 'tanpaPengering', 'setrikaRendah'],
    ringkas: 'Kaus yang cukup tebal untuk dipakai sendiri di bawah outer, tanpa terlihat seperti kaus dalam.',
    pas: 'Potongan lurus, menyusut sekitar 2% setelah cuci pertama.',
  },
  {
    slug: 'outer-tanpa-kerah', nama: 'Outer Tanpa Kerah', jenis: 'luaran', harga: 789000,
    bahan: 'Katun twill 98% · elastan 2%', berat: '280 g/m²',
    warna: [['Cokelat unta', '#a77b4f'], ['Hitam', '#1d1c1a']],
    ukuran: ['XS', 'S', 'M', 'L', 'XL'], rawat: ['cuciTangan', 'tanpaPemutih', 'tanpaPengering', 'setrikaSedang'],
    ringkas: 'Pengganti blazer untuk kota yang panas: tanpa lapisan dalam, tanpa bantalan bahu, tetap berbentuk.',
    pas: 'Dirancang dipakai di atas kemeja; pilih ukuran biasa Anda.',
  },
  {
    slug: 'celana-lurus', nama: 'Celana Bahan Lurus', jenis: 'bawahan', harga: 549000,
    bahan: 'Poliester daur ulang 64% · viskosa 34% · elastan 2%', berat: '240 g/m²',
    warna: [['Abu batu', '#6e6a64'], ['Biru dongker', '#25304a']],
    ukuran: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], rawat: ['cuci30', 'tanpaPemutih', 'setrikaRendah'],
    ringkas: 'Celana kerja berpotongan lurus dengan pinggang karet tersembunyi di bagian belakang.',
    pas: 'Panjang jahit 102 cm; kami potong gratis sesuai tinggi Anda saat pra-pesan.',
  },
  {
    slug: 'kulot-lebar', nama: 'Celana Kulot Lebar', jenis: 'bawahan', harga: 519000,
    bahan: 'Linen 55% · rami 45%', berat: '170 g/m²',
    warna: [['Pasir', '#cdb999'], ['Hitam', '#1d1c1a']],
    ukuran: ['XS', 'S', 'M', 'L', 'XL'], rawat: ['cuci30', 'tanpaPemutih', 'setrikaSedang', 'jemurTeduh'],
    ringkas: 'Kulot berlipit depan yang jatuh lurus — cukup formal untuk rapat, cukup longgar untuk naik motor.',
    pas: 'Pinggang tinggi. Ikuti ukuran pinggang di panduan, bukan ukuran pinggul.',
  },
  {
    slug: 'rok-midi', nama: 'Rok A Midi', jenis: 'bawahan', harga: 459000,
    bahan: 'Katun twill 100%', berat: '230 g/m²',
    warna: [['Hijau zaitun', '#6b6d4b'], ['Cokelat unta', '#a77b4f']],
    ukuran: ['XS', 'S', 'M', 'L', 'XL'], rawat: ['cuci30', 'tanpaPemutih', 'setrikaSedang'],
    ringkas: 'Rok sebetis dengan saku samping yang cukup dalam untuk ponsel.',
    pas: 'Panjang 78 cm dari pinggang. Ikuti ukuran pinggang.',
  },
  {
    slug: 'gaun-kemeja', nama: 'Gaun Kemeja', jenis: 'terusan', harga: 629000,
    bahan: 'Katun oxford 100%', berat: '130 g/m²',
    warna: [['Biru muda', '#a9bed3'], ['Arang', '#33312e']],
    ukuran: ['XS', 'S', 'M', 'L', 'XL'], rawat: ['cuci30', 'tanpaPemutih', 'setrikaSedang'],
    ringkas: 'Gaun berkancing penuh dengan tali pinggang lepas — bisa dipakai terbuka sebagai luaran.',
    pas: 'Potongan longgar. Ikuti ukuran lingkar dada.',
  },
];

export const JENIS = [['semua', 'Semua'], ['atasan', 'Atasan'], ['luaran', 'Luaran'], ['bawahan', 'Bawahan'], ['terusan', 'Terusan']];

// Ukuran tubuh (cm): [ukuran, dada min, dada maks, pinggang min, pinggang maks, pinggul min, pinggul maks]
export const TABEL_UKURAN = [
  ['XS', 80, 85, 64, 69, 86, 91],
  ['S', 86, 91, 70, 75, 92, 97],
  ['M', 92, 97, 76, 81, 98, 103],
  ['L', 98, 104, 82, 88, 104, 110],
  ['XL', 105, 111, 89, 95, 111, 117],
  ['XXL', 112, 119, 96, 103, 118, 125],
];

export const itemBySlug = (s) => ITEM.find((i) => i.slug === s);

export const PRINSIP = [
  ['Dibuat setelah dipesan', `Kami menjahit sejumlah yang dipesan per ukuran, jadi tidak ada stok yang akhirnya diobral. Produksi ${KAPSUL.produksi}.`],
  ['Delapan potong yang saling cocok', 'Setiap atasan bisa dipakai dengan setiap bawahan. Warna dipilih dari satu palet: tulang, pasir, unta, zaitun, arang.'],
  ['Diperbaiki, bukan diganti', 'Kancing lepas atau jahitan terbuka kami perbaiki gratis selama dua tahun.'],
];

export const FAQ = [
  { t: 'Kenapa harus pra-pesan?', j: `Karena kami hanya menjahit yang dipesan. Pra-pesan Kapsul ${KAPSUL.nomor} dikumpulkan per gelombang: ditutup setiap Minggu terakhir bulan pukul 23.59 WIB, dijahit bersama, lalu dikirim tiga minggu kemudian.` },
  { t: 'Bagaimana kalau ukurannya tidak pas?', j: 'Tukar ukuran gratis satu kali dalam 14 hari, selama label masih terpasang. Panduan ukuran kami membantu mengurangi kemungkinan itu.' },
  { t: 'Apakah warnanya sama dengan di layar?', j: 'Kami kirim potongan kain contoh gratis bila Anda ragu. Warna di layar bergantung pada pengaturan perangkat Anda.' },
  { t: 'Di mana pakaiannya dijahit?', j: 'Di bengkel jahit kecil berisi sembilan penjahit tetap. Kami tidak memakai pabrik borongan.' },
];
