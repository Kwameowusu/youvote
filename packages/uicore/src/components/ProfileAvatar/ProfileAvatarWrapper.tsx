import React from "react"
import clsx from "clsx"
import styles from "./ProfileAvatar.module.css"

type ProfileAvatarWrapperProps = {
  children?: React.ReactNode
  size?: 'cSmall' | 'cMedium' | 'cLarge' | 'qSmall' | 'qMedium' | 'qLarge'
  className?: string,
  isNoFile?: boolean,

}
export const ProfileAvatarWrapper = React.forwardRef<HTMLDivElement, ProfileAvatarWrapperProps>((props, ref) => {
  const { children, size, className, isNoFile, ...rest } = props

  const classes = clsx([
    styles.root,
    size && styles[size],
    { [styles.nofile]: isNoFile },
    className
  ])

  return (
    <>
      <div className={classes} ref={ref} {...rest} >
        {children}
      </div>
    </>
  )
}
)
