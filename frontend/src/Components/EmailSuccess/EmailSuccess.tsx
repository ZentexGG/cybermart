import React from 'react'
import { BsFillClipboardCheckFill } from 'react-icons/bs';

export default function EmailSuccess() {
  return (
    <div className='flex gap-3 text-7xl text-green-700'>
          <BsFillClipboardCheckFill />
          <h1>Success!</h1>
    </div>
  );
}
