import React, { useEffect, useState } from 'react'
import { getFirestore } from "firebase/firestore";
import app from "@/config/Firebase";
import { useSession } from "next-auth/react"
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineHourglassEmpty } from "react-icons/md"; // أيقونة لا توجد بيانات
import PostDetails from './../componetns/PostDetails';

function Profile() {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    userPosts();
  }, [session]);

  const userPosts = async () => {
    if (session?.user?.email) {
      const q = query(collection(db, "posts"), where("userId", "==", session?.user?.id));
      const querySnapshot = await getDocs(q);
      const posts = [];

      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });

      setUserProfile(posts);
    }
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    toast.success("✅ Data has been deleted successfully!");
    setUserProfile((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className='m-20'>
      <ToastContainer />
      <h1 className='my-10 font-bold text-[35px] text-[#e88b00]'>Your Posts</h1>

      {userProfile.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-600 mt-20">
          <MdOutlineHourglassEmpty className="text-6xl mb-4 text-[#e88b00]" />
          <p className="text-lg font-medium">No posts yet. Start adding something cool!</p>
        </div>
      ) : (
        <div className='p-10 mt-10 gap-6 grid  md:grid-cols-3  sm:grid-cols-1'>
          {userProfile.map((item) => (
            <div key={item.id} className='relative'>
              <PostDetails post={item} />
              <button
                onClick={() => deletePost(item.id)}
                className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded absolute top-2 right-2'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
