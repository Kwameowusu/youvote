import { AngleArrowLeft } from "../../assets/IconPack"
import styles from './PushBack.module.css'
import { useNavigate, } from 'react-router-dom'


type PushBackProps = {
} & React.HTMLAttributes<HTMLDivElement>
export const PushBack = ({  ...props }: PushBackProps) => {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.root} {...props}>
        <span
          onClick={() => { navigate(-1) }}
          className={styles.container}
        >
          <AngleArrowLeft />
        </span>
      </div>
    </>
  )
}

PushBack.displayName = "PushBack"
