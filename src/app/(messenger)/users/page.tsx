import EmptyState from '@/components/main/EmptyState';
import React from 'react'

const  UserPage = async() => {
  return (
    //on small devices its hidden large block xl is padding left 80px height-full
    <div className='hidden lg:block lg:pl-80 h-full'>
      <EmptyState/>
    </div>
  )
}

export default UserPage