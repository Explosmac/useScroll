import { useState, useEffect, useRef } from "react"

const useScroll = () => {
  const [scrollTop, _setScrollTop] = useState(0)
  const [scrolling, setScrolling] = useState(false)
  const [clientHeight, setClientHeight] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const scrollTopRef = useRef(scrollTop)
  const scrollPage = scrollTop / clientHeight
  const scrollBottom = scrollHeight - scrollTop - clientHeight

  const setScrollTop = (data: number) => {
    scrollTopRef.current = data
    _setScrollTop(data)
  }

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop)
      setScrolling(e.target.documentElement.scrollTop !== scrollTopRef.current)
    }
    setClientHeight(window.document.documentElement.clientHeight)
    setScrollHeight(window.document.documentElement.scrollHeight)
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return { scrollTop, scrollPage, scrolling, clientHeight, scrollHeight, scrollBottom }
}

export default useScroll
