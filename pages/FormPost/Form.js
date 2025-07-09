import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { getFirestore } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Timestamp } from "firebase/firestore";
import { useRouter } from 'next/router';
import app from "@/config/Firebase";
import { doc, setDoc } from "firebase/firestore"; 
import gamesImg from './../../gamesImagesData/Data';
import 'react-toastify/dist/ReactToastify.css'; 

function Form() {
  const db = getFirestore(app);
  const router = useRouter();
  const [games, setGames] = useState()
  const [inputs, setInputs] = useState({})
  const { data: session } = useSession()

  useEffect(() => {
    setGames(gamesImg)
    setInputs((values) => ({...values, userName: session?.user?.name}))
    setInputs((values) => ({...values, email: session?.user?.email}))
  }, [])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({...values, [name]: value}))
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!session) {
    toast.error("يجب تسجيل الدخول أولاً");
    return;
  }

  const formData = {
    ...inputs,
    userId: session.user.id, // تأكد من وجود هذا الحقل
    userEmail: session.user.email,
    createdAt: Timestamp.now(),
    date: Timestamp.fromDate(new Date(inputs.date))
  };

  try {
    await setDoc(doc(db, "posts", Date.now().toString()), formData);
    toast.success("✅ تم إنشاء المنشور بنجاح!");
    setTimeout(() => router.push("/"), 2000);
  } catch (error) {
    console.error("Firebase Error:", error);
    toast.error("❌ فشل في إنشاء المنشور");
  }
};
  return (
    <div>
      <ToastContainer />

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto border w-[500px] p-5 border-amber-300 rounded-2xl">
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input 
            onChange={handleChange} 
            name='title' 
            type="text" 
            id="title" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder='Title' 
            required 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
          <textarea 
            onChange={handleChange}  
            name='desc'  
            id="desc" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder='Description' 
            required 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
          <input 
            onChange={handleChange}  
            name='date' 
            type="date" 
            id="date" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            required 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
          <input 
            onChange={handleChange}  
            name='location' 
            type="text" 
            id="location" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder='Location' 
            required 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="game" className="block mb-2 text-sm font-medium text-gray-900">Game</label>
          <select 
            onChange={handleChange}  
            name='game' 
            id="game" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Choose a Game</option>
            {games?.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="text-white mt-4 bg-[#e88b00] hover:bg-[#c47200] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 w-full cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form