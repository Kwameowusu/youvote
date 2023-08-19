import clsx from "clsx"
import styles from "./Spinner.module.css"

export type SpinnerProps = {
  size?: "small" | "medium" | "large"
} & React.HTMLAttributes<HTMLDivElement>

export const Spinner = ({ size = 'small', ...props }: SpinnerProps) => {

  const classes = clsx([styles.root, styles[size]])
  return (
    <>
      <div className={classes} {...props} >

      </div>
    </>
  )
}
Spinner.displayName = 'Spinner'