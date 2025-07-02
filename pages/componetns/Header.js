import React from 'react'
import {HiMiniPencilSquare} from 'react-icons/hi2';
function Header() {
  return (
    <header className='flex justify-between '>
        <img width={100} src="/images/logo.png" alt="logo" />

      <div className='flex items-center gap-3'>
<button className='bg-black p-3 rounded-full text-white'>Sign Up</button>
<button className='bg-[#e88b00] p-3 rounded-full text-black'>
<span className='hidden sm:block  '>
    Create Post
</span>
 <HiMiniPencilSquare className='blook sm:hidden' /></button>
<img width={70} src="/images/profile.png" alt="logo"  />

      </div>




    </header>
  )
}

export default Header