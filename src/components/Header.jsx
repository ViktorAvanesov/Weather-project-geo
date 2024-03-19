import { useState } from "react"

export const Header = () => {

    const [now, setNow] = useState(new Date())

    setInterval(() =>setNow(new Date()),1000)
  return (
    <header className="mx-auto w-52">
        <span>Время сейчас: {now.toLocaleTimeString()}</span>
    </header>
  )
}


