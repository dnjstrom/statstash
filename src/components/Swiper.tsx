import SwiperClass from "swiper"
import { ComponentChildren, createContext, toChildArray } from "preact"
import { useContext, useEffect, useRef, useState } from "preact/hooks"

export const Swiper = ({
  children,
  id,
}: {
  children: ComponentChildren
  id: string
}) => {
  const { current, setCurrent } = useSwiper()
  const swiperRef = useRef<SwiperClass>()

  useEffect(() => {
    const swiper = new SwiperClass(`#${id}`, {
      initialSlide: current,
    })

    swiperRef.current = swiper

    swiper.on("slideChange", (swiper: SwiperClass) => {
      setCurrent(swiper.activeIndex)
    })

    return () => {
      swiper.destroy()
    }
  }, [])

  useEffect(() => {
    const swiper = swiperRef.current

    if (!swiper) return

    swiper.slideTo(current)
  }, [current])

  return (
    <div id={id} className="swiper h-full">
      <div className="swiper-wrapper">
        {toChildArray(children).map((child) => (
          <div className="swiper-slide">{child}</div>
        ))}
      </div>
    </div>
  )
}

type SwiperContext = {
  current: number
  setCurrent: (id: number) => void
}

const SwiperContext = createContext<SwiperContext | undefined>(undefined)

export const SwiperProvider = ({
  startingIndex = 0,
  children,
}: {
  startingIndex?: number
  children: ComponentChildren
}) => {
  const [current, setCurrent] = useState(startingIndex)

  return (
    <SwiperContext.Provider
      value={{
        current,
        setCurrent,
      }}
    >
      {children}
    </SwiperContext.Provider>
  )
}

export const useSwiper = () => {
  const context = useContext(SwiperContext)

  if (!context)
    throw new Error("useSwiper must be used within a SwiperProvider")

  return context
}
