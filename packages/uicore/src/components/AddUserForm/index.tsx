import { Button } from '../Button'
import { Input } from '../Input'
import { Select } from '../Select'
import { Spinner } from '../Spinner'
import styles from './AddUserForm.module.css'

type AddUserFromProps = {
  selectedValue: string
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  isUserLoading: boolean
  email: string
  password: string
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.HTMLAttributes<HTMLFormElement>

export const AddUserFrom = ({ selectedValue, handleSelectChange, isUserLoading, email, password, handleEmailChange, handlePasswordChange, ...props }: AddUserFromProps) => {
  return (
    <>
      <form  className={styles.root} {...props}  >
        <Input type='text' placeholder='Candidate email' value={email} onChange={handleEmailChange} required isFullwidth />
        <Input type='text' placeholder='Password' value={password} onChange={handlePasswordChange} required isFullwidth />
        <Select
          isFullwidth
          selected={selectedValue}
          handleChange={handleSelectChange}
          optionList={[
            { id: '1', value: "admin", option: "admin" },
            { id: '2', value: "voter", option: "voter" }
          ]}
          placeholder={'Select role'}
        />
        <Button disabled={isUserLoading} >
          {
            isUserLoading ? <Spinner /> : "Submit"
          }
        </Button>
      </form>
    </>
  )
}

AddUserFrom.displayEmail = 'AddUserFrom'
