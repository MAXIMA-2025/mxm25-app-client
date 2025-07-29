import React from 'react'
import { Outlet } from 'react-router'

const _app = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default _app