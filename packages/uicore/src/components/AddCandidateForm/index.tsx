import styles from './AddCandidateForm.module.css'
import { ProfileAvatar } from '../ProfileAvatar'
import { Input } from '../Input'
import { Button } from '../Button'

import { Select } from '../Select'
import { Spinner } from '../Spinner'
import React from 'react'

type AddCandidateFormProps = {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  aFile?: File
  portfolioList: { id: string, option: string, value: string }[]
  isCandidateLoading: boolean
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectValue: string
  isNoFile: boolean
  isCompressing: boolean
  nameOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  username: string
} & React.HTMLAttributes<HTMLFormElement>

export const AddCandidateForm = ({ onFileChange, portfolioList, isCandidateLoading, selectValue, nameOnChange, username, onSelectChange, aFile, isNoFile, isCompressing, ...props }: AddCandidateFormProps) => {


  return (
    <form
      className={styles.root}

      {...props}
    >
      <span className={styles.heading} >Add New Candidate</span>
      <ProfileAvatar
        onFileChange={onFileChange}
        aFile={aFile}
        size='qLarge'
        overlay={true}
        upload={true}
        isNoFile={isNoFile}
        isCompressing={isCompressing}
      />
      <Input type="text" placeholder="Enter username" value={username} onChange={nameOnChange} required isFullwidth />
      <Select
        placeholder="Select portfolio"
        isFullwidth={true}
        selected={selectValue}
        handleChange={onSelectChange}
        optionList={portfolioList}

      />
      <Button disabled={isCandidateLoading} isFullwidth >
        {
          isCandidateLoading ? <Spinner /> : "Submit"
        }
      </Button>
    </form>
  )
}
