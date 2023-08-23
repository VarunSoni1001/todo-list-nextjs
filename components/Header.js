import Link from 'next/link'
import React from 'react'
import { BsTwitter, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs'

const Header = () => {
  return (
    <>
    <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      <Link href={'/'} className="mr-5 hover:text-orange-400 cursor-pointer transition-colors duration-500">Home</Link>
      <Link href={'/todos'} className="mr-5 hover:text-orange-400 cursor-pointer transition-colors duration-500">TODO's</Link>
    </nav>
    <Link href={'/'} className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
    <img src="LOGO_TODO.png" className="w-14 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
    </Link>
    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <Link href={'https://twitter.com/Varunsoni1001'} className="ml-3 text-gray-500 hover:text-orange-400 transition-colors duration-500" target='_blank'>
        <BsTwitter />
      </Link>
      <Link href={'https://www.instagram.com/varunsoni.dev'} className="ml-3 text-gray-500 hover:text-orange-400 transition-colors duration-500" target='_blank'>
        <BsInstagram />
      </Link>
      <Link href={'https://www.linkedin.com/in/varunsoni1001'} className="ml-3 text-gray-500 hover:text-orange-400 transition-colors duration-500" target='_blank'>
        <BsLinkedin />
      </Link>
      <Link href={'https://github.com/VarunSoni1001'} className="ml-3 text-gray-500 hover:text-orange-400 transition-colors duration-500" target='_blank'>
        <BsGithub />
      </Link>
    </span>
    </div>
  </div>
</header>
    </>
  )
}

export default Header