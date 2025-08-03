import HeroMain from '@/components/main/HeroMain'
import Navbar from '@/components/main/Navbar'
import React from 'react'
import { Outlet } from 'react-router'

const _layout = () => {
  return (
    <div className='flex flex-col items-center'>
        <Outlet/>
        <Navbar/>
    </div>
  )
}

export default _layout