import React, { useEffect } from 'react'
import PostDetails from './PostDetails';

function Posts({posts}) {
  useEffect(() => {


console.log("posts", posts);

  })

  
  return (
    <div className='gap-6 mt-10 p-10 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 '>
{posts.map((item)=>(
  <PostDetails post={item}/>
))}
</div>  )
}

export default Posts