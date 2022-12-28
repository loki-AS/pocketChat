import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Image from 'next/image'
import useAuthStore from '../store/authStore'
import { BASE_URL, createOrGetUser } from '../utils'
import MyChat from "../components/MyChat"
import NoResults from "../components/NoResults"
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

export default function Home({ messages }) {

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(messages)

  const messageRef = useRef(null)

  const { userProfile, addUser, removeUser } = useAuthStore()

  const handleSubmit = async() => {
    if (message == ""){
      alert("Enter the message")
    } else {
      const doc = {
        _type: 'message',
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        message,
      };

      await axios.post(`${BASE_URL}/api/post`, doc)

      setMessage("")
    }
  }

  const handleLike = async (like) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });
      setPost({ ...post, like:res.data.likes })
    }
  }

  useEffect(() => {
    messageRef.current?.scrollIntoView()
  }, [message])

  return (
      <div className='h-screen bg-[#242424] w-full sm:px-16 px-6 overflow-hidden'>
        <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-4xl font-bold text-gray-300 py-5 lg:text-5xl uppercase font-poppins tracking-[2px] flex justify-center items-center'>Pocket Chat</h1>
        {
            userProfile ? (
              <div className='flex flex-col justify-between items-center'>
                <div className='flex justify-between items-center'>
                {
                userProfile.image && (
                  <div>
                  <Image
                    className='rounded-full cursor-pointer'
                    src={userProfile.image}
                    alt='user'
                    width={80}
                    height={80}
                  />
                </div>           
                )
              }
              <div className='mx-3'>
              <h1 className='text-lg capitalize text-gray-50 font-poppins tracking-[1px]'>Hello, {userProfile.userName}!</h1>
              <button
              className='border-0 p-2 rounded-full bg-rose-500 hover:bg-rose-600 w-full my-3 text-gray-100 font-poppins text-lg uppercase tracking-[1px]'
              onClick={() => {
                googleLogout()
                removeUser()
              }}
              >
              Log Out
              </button>
              </div>                
              </div>
              <div className='bg-[#4a4949] h-[25rem] lg:h-[22rem] w-full rounded-md my-3 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-[#242424]'>
              {
                messages?.length > 0 ? messages?.map((m) => (
                  <MyChat 
                  post={m}
                  key={m._id}
                  handleLike={() => handleLike(m._id)}
                  /> 
                )) : <NoResults />
              } 
              
              <div ref={messageRef} /> 

              </div>

              <div>
                <input 
                onChange={(e) => setMessage(e.target.value)}
                type="text" 
                placeholder='Message..' 
                className='p-2 rounded-full bg-[#4a4949] text-white' />
                <button 
                className='text-white font-poppins rounder-full bg-[#4a4949] p-2 rounded-full mx-2 px-4 hover:bg-[#242121]'
                onClick={handleSubmit}
                >
                {loading ? 'Sending...' : 'Send'}
                </button>
              </div>  
              </div>
            ) : (
              <GoogleLogin 
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log('Login Failed')}              
              />
            )
          }           
        </div>
      </div>
  )
}

export const getServerSideProps = async () => {
  let response = await axios.get(`${BASE_URL}/api/post`)

  return {
    props: {messages: response.data}
  }
}