import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { HiCalendarDateRange } from 'react-icons/hi2';

const PostDetails = ({ post }) => {
  const formattedDate = post?.date ?
    new Date(post.date.seconds * 1000).toLocaleString() : "No date available";
    
  return (
    <div>
      <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post?.title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">{post?.desc}</p>
        <p className="mb-3 font-normal flex items-center text-[#e88b00]">
          <span className='mr-3'><HiCalendarDateRange /></span>
          {formattedDate}
        </p>
        <p className="mb-3 font-normal flex items-center text-gray-700">
          <span className='mr-3'><IoLocationOutline /></span>
          {post?.location}
        </p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Read more
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default PostDetails;