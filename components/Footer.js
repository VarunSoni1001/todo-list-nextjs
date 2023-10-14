import React from 'react'
import Link from 'next/link'
import { BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <>
    <footer className="text-gray-600 body-font">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <Link href={'/'} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
    <img src="/LOGO_TODO.png" className="w-12 sm:w-16" alt="Logo" />
    </Link>
    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">2023 &copy; Varun Soni</p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <Link href={'https://twitter.com/Varunsoni1001'} rel="noopener noreferrer" className="ml-3 text-gray-500 hover:text-orange-400 transition-colors duration-500" target='_blank'>
        <FaXTwitter />
      </Link>
      <Link href={'https://www.instagram.com/varunsoni.dev'} rel="noopener noreferrer" className="ml-3 text-gray-500 hover:text-orange-400 transition-colors duration-500" target='_blank'>
        <BsInstagram />
      </Link>
      <Link href={'https://www.linkedin.com/in/varunsoni1001'} rel="noopener noreferrer" className="ml-3 text-gray-500 hover:text-orange-400 transition-colors duration-500" target='_blank'>
        <BsLinkedin />
      </Link>
      <Link href={'https://github.com/VarunSoni1001'} rel="noopener noreferrer" className="ml-3 text-gray-500 hover:text-orange-400 transition-colors duration-500" target='_blank'>
        <BsGithub />
      </Link>
    </span>
  </div>
</footer>
    </>
  )
}

export default Footer
