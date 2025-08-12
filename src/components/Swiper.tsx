import SwiperClass from "swiper"
import { ComponentChildren, createContext, toChildArray } from "preact"
import { useContext, useEffect, useRef, useState } from "preact/hooks"
import { SwiperOptions } from "swiper/types"

export const Swiper = ({
  children,
  id,
  onChange,
  current = 0,
  options = {},
}: {
  current: number
  children: ComponentChildren
  id: string
  onChange?: (swiper: SwiperClass) => void
  options?: SwiperOptions
}) => {
  const swiperRef = useRef<SwiperClass>()

  useEffect(() => {
    const swiper = new SwiperClass(`#${id}`, {
      initialSlide: current,
      ...options,
    })

    swiperRef.current = swiper

    swiper.on("slideChange", (swiper: SwiperClass) => {
      onChange?.(swiper)
    })

    return () => {
      swiper.destroy()
    }
  }, [])

  useEffect(() => {
    const swiper = swiperRef.current

    if (!swiper) return

    if (current !== swiper.realIndex) {
      swiper.slideToLoop(current)
    }
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
