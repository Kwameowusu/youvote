import { useState } from 'react'
import { TrashIcon } from '../../assets/IconPack'
import { Button } from '../Button'
import styles from './UsersGroup.module.css'

interface UsersGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  usersList: {
    id: string
    email: string
    role: string
    fuid: string
  }[],
  fetchUsers: () => void,
  handleDelete: (arg: any) => void,
}
export const UsersGroup = ({ usersList, handleDelete, fetchUsers,  ...props }: UsersGroupProps) => {
  const [filter, setFilter] = useState('')
  
  return (
    <>
      <div {...props} className={styles.root}>
        <div className={styles.bar} >
          <span className={styles.heading} onClick={() => {
            fetchUsers()
            setFilter('')
          }} >All Users</span>
          <div className={styles.headingControls}>
            <span onClick={() => setFilter("admin")} >Admins</span>
            <span onClick={() => setFilter("voter")} >Voters</span>
          </div>
        </div>
        <div className={styles.usersList} >
          {
            Array.isArray(usersList) && usersList.length ?
              usersList.filter((item) => {
                if (item.role === filter) {
                  return item
                } else if (!filter) {
                  return item
                }
              }).map((portfolio, index) => {
                return (
                  <div key={index} className={styles.aUser} >
                    <span className={styles.email} >{portfolio.email}</span>
                    <div className={styles.controls}>
                      <Button variants='outlined' onClick={() => handleDelete(portfolio)}>
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                )
              })
              : null
          }
        </div>
      </div>
    </>
  )
}

UsersGroup.displayName = 'UsersGroup'