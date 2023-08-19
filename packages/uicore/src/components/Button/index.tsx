import clsx from "clsx"
import React from "react"
import styles from "./Button.module.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFullwidth?: boolean
  size?: "small" | "large"
  variants?: "outlined" | "primary"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    isFullwidth,
    size = "large",
    variants = "primary",
    ...rest
  } = props

  const classes = clsx([
    styles.root,
    {
      [styles.isFullwidth]: isFullwidth,
    },
    styles[size],
    styles[variants],
    className
  ])

  


  return (
    <>
        <button className={classes} {...rest} ref={ref} >
          {children}
        </button>
    </>
  )
})

Button.displayName = "Button"