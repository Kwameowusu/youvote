
import React from 'react'
import clsx from 'clsx'
import styles from "./SubmitNavigate.module.css"
import { NavLink, useLocation } from "react-router-dom";
import { ProfileAvatar } from '../ProfileAvatar';
import { Button } from '../Button';
import { Spinner } from '../Spinner';


type SubmitNavigateProps = {
  className?: string
  handleSubmit?: () => void
  src: string
  activate: boolean
  isVoteLoading: boolean
}
export const SubmitNavigate = React.forwardRef<HTMLDivElement, SubmitNavigateProps>((props, ref) => {
  const { className, handleSubmit, activate, src, isVoteLoading, ...rest } = props
  const location = useLocation();

  const classes = clsx([
    styles.root,
    className
  ])

  return (
    <>
      <div className={classes} ref={ref} {...rest} >
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
        {
          activate ?
            <Button
              onClick={handleSubmit}
              size='small'
              disabled={location.pathname === '/profile' || isVoteLoading ? true : false}
            >
              {
                isVoteLoading ? <Spinner /> : 'Submit'
              }
            </Button> : null
        }

      </div>
    </>
  )
})
SubmitNavigate.displayName = "SubmitNavigate"
