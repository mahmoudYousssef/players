import React from 'react'
import { HiMiniPencilSquare } from "react-icons/hi2";
import { HiArrowLeftStartOnRectangle } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  console.log("session", session)

  return (
    <div className='flex justify-between p-4'>
      <img width={130} src='/images/logo.png' />

      <div className='flex items-center gap-3'>
        {!session ? <button onClick={() => signIn()} className='bg-black p-3 rounded-full cursor-pointer text-white'>

          <span className='hidden sm:block'>Sign In  </span>  <HiArrowLeftStartOnRectangle className='block sm:hidden' /></button>
          : <button onClick={() => signOut()} className='bg-black p-3 rounded-full cursor-pointer text-white'>

            <span className='hidden sm:block'>Sign Out  </span>  <HiArrowLeftStartOnRectangle className='block sm:hidden' /></button>}
        <button onClick={() => router.push("/create-post")} className='bg-[#e88b00] p-3 rounded-full text-black cursor-pointer'>

          <span className='hidden sm:block'>Create Post  </span>  <HiMiniPencilSquare className='block sm:hidden' /></button>
        <img onClick={() => router.push("/profile")} className='rounded-full cursor-pointer' height={50} width={50} src={session?.user?.image || "./images/profile.png"} />


      </div>


    </div>
  )
}

export default Header