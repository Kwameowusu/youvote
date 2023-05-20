import React from 'react'

import styles from "./ProfileAvatar.module.css"
import { UploadIcon } from '../../assets/IconPack/UploadIcon'
import { Spinner } from '../Spinner'

type ProfileOverlaysProps = {
  overlay?: boolean
  upload?: boolean
  handleDelete?: () => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isCompressing?: boolean,
}
const ProfileOverlays = ({ overlay, upload, handleDelete, isCompressing, onFileChange }: ProfileOverlaysProps) => {
  return (
    <>
      {
        overlay ?
          <div className={styles.overlay} >
            {
              upload ?
                <div className={styles.upload}>
                  {
                    isCompressing ?
                      <>
                        <Spinner />
                      </>
                      : <>
                        <input type="file" name="" id="" onChange={onFileChange}
                          onClick={(event) => {
                            const target = event.target as HTMLInputElement
                            target.value = '';
                          }}
                        />
                        <UploadIcon />
                      </>
                  }


                </div>
                :
                <div onClick={handleDelete} className={styles.delete}>Delete</div>
            }
          </div>
          : null
      }
    </>
  )
}

export default ProfileOverlays