import { TimesIcon } from '../../assets/IconPack'
import { Button } from '../Button'
import { ElectCard } from '../ElectCard'
import { Input } from '../Input'
import { Select } from '../Select'
import { Spinner } from '../Spinner'

import { UpdateForm } from '../UpdateForm'
import styles from './EditCandidateModal.module.css'

type EditCandidateModalProps = {
  handleClose?: () => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  aFile?: File
  optionList: { id: string, option: string, value: string }[]
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectedValue: string
  username: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isNameLoading: boolean
  isPortfolioLoading: boolean
  isCompressing: boolean
  isNoFile: boolean
  isFileLoading: boolean
  profileUrl: string
  handleUpdateProfile: () => void
  handleNameSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleSelectSubmit: (e: React.FormEvent<HTMLFormElement>) => void
} & React.HTMLAttributes<HTMLDivElement>


export const EditCandidateModal = ({ handleClose,
  onFileChange, aFile, isCompressing, profileUrl, handleUpdateProfile,
  isNoFile, isFileLoading, isNameLoading, isPortfolioLoading, optionList, handleNameSubmit, handleSelectSubmit,
  handleSelectChange, handleNameChange, username, selectedValue, ...props }: EditCandidateModalProps) => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.container} {...props} >
          <div className={styles.cardContainer} >

            <span className={styles.closeModal} onClick={handleClose} >
              <TimesIcon />
            </span>
            <ElectCard
              isCompressing={isCompressing}
              isNoFile={isNoFile}
              isLoading={isFileLoading}
              portfolio='Update Infomation'
              profileUrl={profileUrl}
              isProfileUpdate={true}
              handleUpdateProfile={handleUpdateProfile}
              onFileChange={onFileChange}
              aFile={aFile}
            />
            <UpdateForm onSubmit={handleNameSubmit} >
              <Input type="text" placeholder="Enter name" value={username} onChange={handleNameChange} required isFullwidth />
              <Button disabled={isNameLoading} isFullwidth >
                {isNameLoading ? <Spinner /> : "Update"}
              </Button>
            </UpdateForm>
            <UpdateForm onSubmit={handleSelectSubmit} >
              <Select
                isFullwidth={true}
                selected={selectedValue}
                handleChange={handleSelectChange}
                optionList={optionList}
                placeholder={'Select portfolio'}
              />
              <Button disabled={isPortfolioLoading} isFullwidth >
                {
                  isPortfolioLoading ? <Spinner /> : "Update"
                }
              </Button>
            </UpdateForm>
          </div>
        </div>
      </div>
    </>
  )
}

