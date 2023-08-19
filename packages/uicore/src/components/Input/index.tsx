import clsx from "clsx"
import styles from "./Input.module.css"
import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  noBorder?: boolean
  isFullwidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    noBorder,
    isFullwidth,
    className,
    ...rest
  } = props
  const classes = clsx([
    styles.root,
    {
      [styles.noBorder]: noBorder,
      [styles.isFullwidth]: isFullwidth,
    },
    className
  ])
  return <input className={classes} {...rest} ref={ref} />
})

Input.displayName = "Input"