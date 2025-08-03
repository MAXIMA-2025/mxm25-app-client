import React from 'react'
import { Outlet } from 'react-router'

const _app = () => {
  return (
    <section>
        <Outlet />
    </section>
  )
}

export default _app