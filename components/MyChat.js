import Image from 'next/image'
import React from 'react'
import { AiFillHeart } from "react-icons/ai"
import { FaRegLaughSquint } from "react-icons/fa"

const MyChat = ({post : {postedBy, message, _id, likes, wow}, handleLike }) => {
  
  return (
    <div className='bg-[#242424] m-4 p-2 rounded-lg'>
      <div className='flex'>
      <div className=''>
        <img 
        src={postedBy?.image}
        alt="user-profile"
        className='h-20 w-20 p-2 rounded-full'
        />
      </div>
      <div className='flex flex-col '>
        <h1 className='text-md text-gray-500 capitalize'>Sent by @{postedBy.userName}</h1>
        <h1 className='text-md text-white py-1'>{message}</h1>
        <div className='flex justify-between items-center mx-3'>
          <div className='mx-5'>
          <AiFillHeart className='text-2xl mt-1 text-red-500 bg-[#4a4949] p-1 rounded-md' />
          <p className='text-md ml-2 text-white'>{likes?.length || 0}</p>
          </div>

          <div className='mx-5'>
          <FaRegLaughSquint className='text-2xl mt-1 text-[#e1aca5] bg-[#4a4949] p-1 rounded-md' />
          <p className='ml-2 text-white'>{wow?.length || 0}</p>
          </div>

      </div>
      </div>
      </div>
    </div>
  )
}

export default MyChat