import React from 'react'
import Link from 'next/link'

export default function Header () {
  return (
    <header className="header">
      <div className="container">
        <Link href="/"><a className="header__logo">
          <strong>&quot;Дерево горожан&quot;</strong> || Задание для собеседования в SteadyControl</a>
        </Link>
      </div>
    </header>
  )
}