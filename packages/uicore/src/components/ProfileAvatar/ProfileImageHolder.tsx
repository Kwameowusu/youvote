import { useState } from 'react'
import styles from "./ProfileAvatar.module.css"
import clsx from "clsx"
import { AvartarHolder } from '../../assets/images/AvartarHolder'

type ProfileAvatarProps = {
  size?: 'cSmall' | 'cMedium' | 'cLarge' | 'qSmall' | 'qMedium' | 'qLarge'
  alt?: string
  src?: string
  className?: string
  aFile?: File
}

export const ProfileImageHolder = ({ size, alt, src, className, aFile }: ProfileAvatarProps) => {
  const [imageError, setimageError] = useState(false);

  const classes = clsx([
    styles.avatar,
    styles[`avatar-${size}`],
    className
  ])
  return (
    <>
      <div className={styles.container} >
        <div className={classes}>
          <AvartarHolder />
        </div>
        {
          src && !imageError && !aFile ?
            <img
              src={src}
              alt={alt}
              className={styles.image}
              onError={(event) => {
                setimageError(true)
                const target = event.target as HTMLImageElement
                target.style.visibility = "hidden"
              }
              }
              onLoad={(event) => {
                const target = event.target as HTMLImageElement
                target.style.visibility = "visible"
              }
              } />
            :
            <img
              src={aFile && window.URL.createObjectURL(aFile)}
              alt={""}
              
              className={styles.image}

              onError={(event) => {
                const target = event.target as HTMLImageElement
                target.style.visibility = "hidden"
              }
              }
              onLoad={(event) => {
                const target = event.target as HTMLImageElement
                target.style.visibility = "visible"
              }
              }
            />
        }

      </div>
    </>
  )
}
