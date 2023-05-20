
import React from 'react'
import styles from './DeleteItemModal.module.css'
import { Button } from '../Button'
import { Spinner } from '../Spinner'

type DeleteItemModalProps = {
  confirmations?: Array<{ transform: boolean, handleDelete: () => void, handleClose: () => void, isDeleting: boolean }>
} & React.HTMLAttributes<HTMLDivElement>
export const DeleteItemModal = ({ confirmations, ...props }: DeleteItemModalProps) => {
  return (
    <>
      {
        Array.isArray(confirmations) && confirmations?.map((item, index) => (
          <div key={index} className={styles.root}
            style={{
              transform: `${item.transform ? "translateY(0)" : "translateY(100vh)"}`,
            }}
            {...props} >
            <Button onClick={item.handleDelete} size='small' >
              {
                item.isDeleting ? <Spinner /> : "Delete"
              }
            </Button>
            <Button onClick={item.handleClose} size='small' variants='outlined' >
              Discard
            </Button>
          </div>
        ))
      }

    </>
  )
}

DeleteItemModal.storyName = "DeleteItemModal"