import { Geist, Geist_Mono } from "next/font/google";
import Hero from "./componetns/Hero";
import GameImages from "./componetns/GameImages";
import Search from './componetns/Search';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div >
<Hero/>
<GameImages/>
<Search/>
    </div>
  );
}
