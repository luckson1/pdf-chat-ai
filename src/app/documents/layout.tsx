import React, { ReactNode } from 'react'

export default function Layout({children}: {children:ReactNode}) {
  return (
    <div className='container py-4'>{children}</div>
  )
}
