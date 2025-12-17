"use client"

import { composeRenderProps } from "react-aria-components"
import { type ClassNameValue, twMerge } from "tailwind-merge"

type CxArgs<T> = [...ClassNameValue[], Render<T>] | [[...ClassNameValue[], Render<T>]]

type Render<T> = ((v: T) => string) | string | undefined

export function cx<T = unknown>(...args: CxArgs<T>): ((v: T) => string) | string {
  let resolvedArgs = args
  if (args.length === 1 && Array.isArray(args[0])) {
    resolvedArgs = args[0] as [...ClassNameValue[], Render<T>]
  }

  const className = resolvedArgs.pop() as Render<T>
  const tailwinds = resolvedArgs as ClassNameValue[]

  const fixed = twMerge(...tailwinds)

  return composeRenderProps(className, (cn) => twMerge(fixed, cn))
}
