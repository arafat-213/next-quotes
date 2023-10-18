'use client'

import Typed from 'typed.js'
import { useEffect, useRef } from 'react'
const TypedText = () => {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Inspirational',
        'Powerful',
        'Uplifting',
        'Motivational',
        'Thought provoking',
        'Profound',
        'Empowering',
        'Meaningful',
        'Encouraging'
      ],
      shuffle: true,
      startDelay: 200,
      typeSpeed: 40,
    //   backSpeed: 20,
      backDelay: 700,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "...",
    })

    return () => {
      typed.destroy()
    }
  }, [])
  return <span ref={el}></span>
}

export default TypedText
