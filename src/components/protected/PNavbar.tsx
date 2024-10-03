import React from 'react'
import UserBtn from '../navbar/UserBtn';

const PNavbar = () => {
  return (
    <div className="fixed w-full z-10  border-b-2 border-orange-2 box-shadow-none bg-white dark:bg-black">
      <div
        className="
        py-4
      "
      >
        <UserBtn/>
      </div>
      </div>
  )
}

export default PNavbar