import React from 'react'



const Form = () => {

  return (
    <form className='flex flex-col gap-4 w-full max-w-sm'>
        <input name="message" type='text' placeholder='...' className='px-8 py-3 rounded-md border-gray-200 shadow-sm sm:text-sm'/>
        <button type='submit' className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'>kirim pesan</button>
    </form>
  )
}

export default Form