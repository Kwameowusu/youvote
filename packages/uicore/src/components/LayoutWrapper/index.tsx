import React from 'react'
import styles from './LayoutWrapper.module.css'
import { clsx } from 'clsx'
import { useStickyNavbar } from '../../libs/hooks';

type LayoutWrapperProps = {
  children: React.ReactNode
  className?: string
  viewOverlay?: boolean
  Navbar?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const LayoutWrapper = React.memo(({ className, viewOverlay, Navbar, children, ...props }: LayoutWrapperProps) => {
  const { showani } = useStickyNavbar(viewOverlay)



  const classes = clsx([
    styles.navigation,
    showani === true ? 'slideUp' : showani === false ? 'slideDown' : '',
    className
  ])
  return (
    <>
      <div className={styles.root}  >
        <div className={styles.container} {...props} >
          {children}
          {
            location.pathname === '/login' || location.pathname === '/congrat' ?
              null :
              <div className={classes}>
                {Navbar}
              </div>
          }
        </div>
      </div>
    </>
  )
})

LayoutWrapper.displayName = "LayoutWrapper"