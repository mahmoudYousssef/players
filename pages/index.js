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
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id, // تأكد من إضافة ID لكل مستند
        ...doc.data()
      }));
      
      setPosts(fetchedPosts);
      setAllPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    if (!text.trim()) {
      setPosts(allPosts); // إعادة تعيين إلى جميع المنشورات إذا كان البحث فارغًا
      return;
    }
    
    const filtered = allPosts.filter((post) => 
      post.title?.toLowerCase().includes(text.toLowerCase())
    );
    setPosts(filtered);
  };

  return (
    <main className={`${geistSans.variable} ${geistMono.variable}`}>
      <Hero />
      <Search onSearch={handleSearch} />
      <GameImages />
      
      {loading ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : posts.length > 0 ? (
        <Posts posts={posts} />
      ) : (
        <div className="text-center py-8">لا توجد منشورات متاحة</div>
      )}
    </main>
  );
}