import Link from "next/link"

export default function Home() {
  return (
    <div className="home-buttons">
      <Link href="/sql"><a className="btn btn-a">Сгенерировать код для Базы данных</a></Link>
      <Link href="/tree"><a className="btn btn-a">Получить дерево горожан</a></Link>
    </div>
  )
}
