import { Geist, Geist_Mono } from "next/font/google";
import Hero from "./componetns/Hero";
import GameImages from "./componetns/GameImages";
import Search from './componetns/Search';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from '@/config/Firebase';
import { useEffect, useState } from "react";
import Posts from "./componetns/Posts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
   

 



export default function Home() {
  const db = getFirestore(app);
  const [posts, setPosts]=useState([]);

  useEffect(() => {
    getPost();
  }, [])

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setPosts(posts =>[...posts,doc.data()])
    });
  }
  return (
    < >
      <Hero />
      <Search />
      <GameImages />
      {posts? <Posts posts={posts}/>: null}
    </>
  )
}
