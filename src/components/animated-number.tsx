"use client"

import { motion, type MotionValue, useSpring, useTransform } from "framer-motion"
import { Fragment, useEffect } from "react"
import { twMerge } from "tailwind-merge"

interface AnimatedNumberProps {
  className?: string
  fontSize?: number
  padding?: number
  value: number
}
interface DigitProps {
  height: number
  place: number
  value: number
}

interface NumberInternalProps extends Pick<DigitProps, "height"> {
  mv: MotionValue
  number: number
}
function AnimatedNumber({ className, fontSize = 30, padding = 15, value }: AnimatedNumberProps) {
  const height = fontSize + padding
  const maxPlace = 10 ** (String(Math.abs(value)).length - 1)
  const places: number[] = []
  for (let p = maxPlace; p >= 1; p = p / 10) { places.push(p) }

  return (
    <div
      className={twMerge("flex items-end gap-x-1 overflow-hidden text-fg leading-none", className)}
      style={{ fontSize }}
    >
      {places.map((p, i) => (
        <Fragment key={p}>
          <Digit height={height} place={p} value={value} />
          {i !== places.length - 1 && (places.length - i - 1) % 3 === 0 && <span>,</span>}
        </Fragment>
      ))}
    </div>
  )
}

function Digit({ height, place, value }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place)
  const animatedValue = useSpring(valueRoundedToPlace)

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <div className="relative w-[1ch]" style={{ height }}>
      {[...Array(10).keys()].map((i) => (
        <NumberInternal height={height} key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  )
}

function NumberInternal({ height, mv, number }: NumberInternalProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10
    const offset = (10 + number - placeValue) % 10
    let memo = offset * height
    if (offset > 5) {
      memo -= 10 * height
    }
    return memo
  })

  return (
    <motion.span className="absolute inset-0 flex items-center justify-center" style={{ y }}>
      {number}
    </motion.span>
  )
}

export { AnimatedNumber }
