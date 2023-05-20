import React from 'react'
import styles from './UpdateForm.module.css'


type UpdateFormProps = {
  children: React.ReactNode
  title?: string
} & React.HTMLAttributes<HTMLFormElement>

export const UpdateForm = ({ children, title, ...props }: UpdateFormProps) => {
  return (
    <>
      <form className={styles.root} {...props} >
        <span className={styles.title}>{title}</span>
        <div className={styles.container} >
          {children}
       </div>
      </form>
    </>
  )
}

UpdateForm.displayName = 'UpdateForm'


