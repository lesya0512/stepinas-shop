import type { Metadata, Viewport } from "next";
import './globalStyles/normalize.css'
import './globalStyles/globals.css';
import './globalStyles/slick.css'
import '@/public/fonts/fonts.css'
import './globalStyles/auth-popup.css'
import './globalStyles/mobilenavbar.css'
import './globalStyles/cookie-popup.css'
import './globalStyles/breadcrumbs.css'
import './globalStyles/map.css'
import PagesLayout from "@/components/layouts/PagesLayout";

export const metadata: Metadata = {
  title: "Stepinas",
  description: "Интернет - магазин женских рубашек Stepinas",
};

export const viewport: Viewport = {
  themeColor: 'white'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PagesLayout>{children}</PagesLayout>
    
  );
}
