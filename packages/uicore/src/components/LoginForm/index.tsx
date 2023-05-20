// import React from 'react'
import styles from './LoginForm.module.css'
import { Input } from '../Input'
import { Button } from '../Button'
import { Logo } from '../../assets/images/Logo'

type LoginFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setpassword: (e: React.ChangeEvent<HTMLInputElement>) => void
  email: string
  setemail: (e: React.ChangeEvent<HTMLInputElement>) => void
  password: string
  isLoading: boolean
  title: string
}
export const LoginForm = ({ handleSubmit, setpassword, email, setemail, isLoading, password, title }: LoginFormProps) => {


  return (
    <>
      <div className={styles.root} >
        <div className={styles.logo}>
          <Logo />
        </div>
        <span className={styles.heading}>
          {title}
        </span>
        <form onSubmit={handleSubmit} className={styles.container}>
          <Input
            type='email'
            placeholder='Enter email address'
            onChange={setemail}
            name="email"
            value={email}
            id="email"
            required
          />
          <Input
            type='password'
            placeholder='Enter password'
            onChange={
              setpassword
            }
            name="password"
            id="password"
            required
            value={password}
          />
          <Button isFullwidth={true} disabled={isLoading} >
            {isLoading === false
              ? "Login"
              : "Loging in..."}
          </Button>
        </form>
      </div>
    </>
  )
}
