import React, {useEffect, useState} from 'react'
import gamesImg from "../../gamesImagesData/Data"
function GameImages() {
  const [games,setGames] = useState()

  useEffect(()=>{
    setGames(gamesImg)
  },[])
  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mt-5'>
      {games?.map((item)=>(
        <div className='flex flex-col items-center mt-4'>
          <img className='hover:animate-bounce transition-all duration-150 cursor-pointer' width={40} height={40} src={item.image}/>
          <h2>{item.name}</h2>
          </div>
      ))}
    </div>
  )
}

export default GameImages
