import type { Metadata } from 'next';
import { Inter,  DM_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import "./styles.css"

const inter = Inter({ subsets: ['latin'] });

const dmSans = DM_Sans({
  weight: ["100","200", "300","500",'400',"600", '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='text-darkestblue overflow-x-hidden'>
      <body className={dmSans.className}>
        <Header />
        
        {children}
        <Footer />
      </body>
    </html>
  );
}


