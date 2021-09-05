import React from 'react'
import Header from '../components/Header.js'

export default function MainDefault ( { children } ) {
  return (
    <div>
      <Header />
      <div className="container container-flex container-main">
        { children }
      </div>
    </div>
  )
}