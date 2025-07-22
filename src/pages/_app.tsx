import React from 'react'
import { Outlet } from 'react-router'

const _app = () => {
  return (
    <section className='flex flex-col h-dvh w-dvw items-center justify-center'>
        <Outlet />
    </section>
  )
}

export default _app