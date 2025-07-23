import React from 'react'
import { Outlet } from 'react-router'

const app = () => {
  return (
    <section>
        <Outlet />
    </section>
  )
}

export default app