

import React from 'react'
import styles from './AddUserBar.module.css'
import { PlusIcon } from '../../assets/IconPack/PlusIcon'
import { AngleArrowLeft, TimesIcon } from '../../assets/IconPack'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'

interface AddUserBarProps extends React.HTMLAttributes<HTMLDivElement> {
  handleAdduser: (arg: any) => void,
  show: boolean
}
export const AddUserBar = ({ handleAdduser, show, ...props }: AddUserBarProps) => {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.root} {...props} >
        <span className={styles.back} onClick={() => { navigate(-1) }} >
          <AngleArrowLeft />
        </span>
        <div className={styles.container} >
          {
            show ?
              <Button variants='outlined' onClick={handleAdduser}>
                <TimesIcon />
              </Button>
              :
              <>
                <span className={styles.heading}>
                  Add user
                </span>
                <Button variants='outlined' onClick={handleAdduser}>
                  <PlusIcon />
                </Button>
              </>

          }

        </div>
      </div>
    </>
  )
}

AddUserBar.displayName = 'AddUserBar'