import { Loader } from 'lucide-react';

function Loading() {
  return (
    <div className='h-screen flex justify-center items-center' >
      <Loader className='size-20 animate-spin ' />
    </div>
  )
}

export default Loading