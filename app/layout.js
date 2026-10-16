import { Italiana, Inter } from "next/font/google";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import "./globals.css";

const italiana = Italiana({ variable: "--font-italiana", subsets: ["latin"], weight: "400" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const __jsonld = {"@context":"https://schema.org","@type":"ClothingStore","name":"Modewear","description":"Label pakaian kerja yang dijahit setelah dipesan","url":"https://landing-modewear.pintuweb.id"};

const DESKRIPSI = "Modewear Kapsul 05 \"Kota\": delapan potong pakaian kerja dari satu palet, dijahit setelah dipesan per gelombang bulanan. Panduan ukuran tersedia.";

// Tenggat gelombang jahit dihitung dari waktu sekarang (lib/koleksi.js), jadi halaman dibangun ulang tiap jam.
export const revalidate = 3600;

export const metadata = {
  metadataBase: new URL("https://landing-modewear.pintuweb.id"),
  title: { default: "Modewear — Pakaian Kerja yang Dijahit Setelah Dipesan", template: "%s — Modewear" },
  description: DESKRIPSI,
  applicationName: "MODEWEAR",
  keywords: ["pakaian kerja", "kemeja linen", "celana bahan", "pakaian pra-pesan", "kapsul pakaian"],
  authors: [{ name: "MODEWEAR" }],
  creator: "MODEWEAR",
  publisher: "MODEWEAR",
  alternates: { canonical: "https://landing-modewear.pintuweb.id" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://landing-modewear.pintuweb.id",
    siteName: "MODEWEAR",
    title: "Modewear — Pakaian Kerja yang Dijahit Setelah Dipesan",
    description: DESKRIPSI,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Modewear — Pakaian Kerja yang Dijahit Setelah Dipesan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modewear — Pakaian Kerja yang Dijahit Setelah Dipesan",
    description: DESKRIPSI,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${italiana.variable} ${inter.variable} antialiased`}>
        <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-onyx focus:px-4 focus:py-2 focus:text-bone">Lompat ke konten</a>
        <SiteHeader />
        <div id="konten">{children}</div>
        <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href="https://www.pintuweb.id/kontak?demo=modewear" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Buat yang seperti ini →</a>
        </aside>
        </body>
    </html>
  );
}
