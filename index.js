import { useState, useEffect, useRef } from "react"

const useScroll = () => {
  const [scrollTop, _setScrollTop] = useState(0)
  const [scrolling, setScrolling] = useState(false)
  const [clientHeight, setClientHeight] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const scrollTopRef = useRef(scrollTop)
  const scrollPage = scrollTop / clientHeight
  const scrollBottom = scrollHeight - scrollTop + clientHeight

  const setScrollTop = (data) => {
    scrollTopRef.current = data
    _setScrollTop(data)
  }

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop)
      setScrolling(e.target.documentElement.scrollTop !== scrollTopRef.current)
    }
    const onResize = () => {
      setScrollTop(window.document.documentElement.scrollTop)
      setClientHeight(window.document.documentElement.clientHeight)
      setScrollHeight(window.document.documentElement.scrollHeight)
    }
    onResize()
    window.addEventListener("scroll", onScroll)
    window.addEventListener("resize", onResize)
    window.document.documentElement.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.document.documentElement.removeEventListener("resize", onResize)
    }
  }, [])
  return { scrollTop, scrollPage, scrolling, clientHeight, scrollHeight, scrollBottom }
}

export default useScroll
