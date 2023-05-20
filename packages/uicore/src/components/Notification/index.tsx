import clsx from "clsx"
import styles from "./Notification.module.css"
import React from "react"
import { AlertIcon } from "../../assets/IconPack/AlertIcon"
import { useHexes } from "../../libs/hooks/useHexes"
import { CircleCheckIcon, TimesIcon } from "../../assets/IconPack"
import { ErrorIcon } from "../../assets/IconPack/ErrorIcon"

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: 'success' | 'error' | 'info'
  isFullwidth?: boolean,
  noteText?: string,
  hexColor: string
  isClose?: boolean
  onClose?: () => void

}

export const Notification: React.FC<NotificationProps> = React.forwardRef<HTMLDivElement, NotificationProps>((props, ref) => {
  const {
    status,
    isFullwidth,
    className,
    noteText,
    hexColor,
    isClose, onClose,
    ...rest
  } = props

  const classes = clsx([
    styles.root,
    status && styles[status],
    className
  ])

  const { AddMidOpacity, AddLightOpacity, AddDeepOpacity } = useHexes()
  return (
    <>
      <span
        style={{
          border: `1.5px solid ${AddMidOpacity(hexColor)}`,
          backgroundColor: AddLightOpacity(hexColor),
          color: AddDeepOpacity(hexColor),
          gridTemplateColumns: `38px ${isClose ? "68%" : "88%"} ${isClose ? "38px" : ""}`,
          gap: `${isClose ? "5px" : "10px"}`,
          padding: `${isClose ? "4px 8px " : "4px 15px 4px 18px"}`,
          justifyContent: `${isClose ? "space-between" : "center"}`,
          ...rest.style
        }}
        onClick={onClose}
        className={classes} ref={ref} >
        <span className={styles.noteIcon} >
          {status === "success" ? <CircleCheckIcon style={{ fontSize: "calc(var(--yov-font-size-14) * 2)" }} /> :
            status === "error" ? <ErrorIcon /> :
              status === "info" ? <AlertIcon /> : null
          }
        </span>
        <span className={styles.noteText}>
          {noteText}
        </span>
        {
          isClose ?
            <span className={styles.close}>
              <TimesIcon />
            </span> : null
        }


      </span>
    </>
  )
})

Notification.displayName = "Notification"