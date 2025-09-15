import React from 'react'
import Contactus from './_component/ContactUs'
import { NavbarDemo } from '@/app/_components/Navbar'

function ContactUs() {
  return (
    <div>
        <div className="sticky top-0 z-50  dark:bg-transparent transition-all duration-300">
        <div className="mx-auto w-full max-w-screen-xl">
          <NavbarDemo />
        </div>
      </div>
        <div className=''>
        <Contactus/>
        </div>
    </div>
  )
}

export default ContactUs