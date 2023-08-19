
import React from 'react'
import clsx from 'clsx'
import styles from "./Navigation.module.css"
import { NavLink, useLocation } from "react-router-dom";
import { ProfileAvatar } from '../ProfileAvatar';

type NavigationProps = {
  className?: string
  allRoutes?: {
    id: string
    path: string
    Icon: React.ReactNode
  }[]
  src?: string

}
export const Navigation = React.forwardRef<HTMLDivElement, NavigationProps>((props, ref) => {
  const { className, allRoutes, src, ...rest } = props
  const location = useLocation();

  const classes = clsx([
    styles.root,
    className
  ])


  const iconClasses = clsx([
    styles.icon,
  ])

  return (
    <>
      <div className={classes} ref={ref} {...rest} >
        {Array.isArray(allRoutes) && allRoutes.length > 0
          ? allRoutes?.map((route, index) => (
            <NavLink
              key={index}
              to={route.path}
              className={styles.iconContainer}>
              <span
                className={iconClasses}
                style={{
                  color: `${location.pathname === route.path
                    ? "#2F80ED"
                    : "var(--yov-dark-text-color1)"
                    }`,
                }}>
                {route.Icon}
              </span>
            </NavLink>
          ))
          : ""}

        <NavLink
          to={'/profile'}
          className={styles.profileContainer}
          style={{
            border: `2px solid ${location.pathname === '/profile'
              ? "#2F80ED"
              : "white"}`,
          }}
        >
          <ProfileAvatar
            src={src}
            alt='profile' />
        </NavLink>
      </div>
    </>
  )
})
Navigation.displayName = "Navigation"
