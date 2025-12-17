"use client"

import { type MotionValue, motion, useSpring, useTransform } from "framer-motion"
import { Fragment, useEffect } from "react"
import { twMerge } from "tailwind-merge"

interface DigitProps {
  place: number
  value: number
  height: number
}
function Digit({ place, value, height }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place)
  const animatedValue = useSpring(valueRoundedToPlace)

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <div style={{ height }} className="relative w-[1ch]">
      {[...Array(10).keys()].map((i) => (
        <NumberInternal key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  )
}

interface NumberInternalProps extends Pick<DigitProps, "height"> {
  mv: MotionValue
  number: number
}
function NumberInternal({ mv, number, height }: NumberInternalProps) {
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
    <motion.span style={{ y }} className="absolute inset-0 flex items-center justify-center">
      {number}
    </motion.span>
  )
}

interface AnimatedNumberProps {
  value: number
  fontSize?: number
  padding?: number
  className?: string
}

function AnimatedNumber({ value, fontSize = 30, padding = 15, className }: AnimatedNumberProps) {
  const height = fontSize + padding
  const maxPlace = 10 ** (String(Math.abs(value)).length - 1)
  const places: number[] = []
  for (let p = maxPlace; p >= 1; p = p / 10) places.push(p)

  return (
    <div
      style={{ fontSize }}
      className={twMerge("flex items-end gap-x-1 overflow-hidden text-fg leading-none", className)}
    >
      {places.map((p, i) => (
        <Fragment key={p}>
          <Digit place={p} value={value} height={height} />
          {i !== places.length - 1 && (places.length - i - 1) % 3 === 0 && <span>,</span>}
        </Fragment>
      ))}
    </div>
  )
}

export { AnimatedNumber }
