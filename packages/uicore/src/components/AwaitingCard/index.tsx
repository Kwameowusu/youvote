import styles from './AwaitingCard.module.css'
import Confetti from 'react-confetti'

type AwaitingCardProps = {

} & React.HTMLAttributes<HTMLDivElement>

export const AwaitingCard = ({ ...props }: AwaitingCardProps) => {
  return (
    <>
      <div className={styles.root} {...props}>
        <Confetti
          // recycle={false}
          gravity={0.02}
          width={600}
          height={700}
          colors={[
            '#e4cedf',
            '#989dba',
            '#bddac2',
          ]}
        />
       
          <span className={styles.text}>
            Elections <br></br>
            commence <br></br>
            soon!!
          </span>
       
      </div>
    </>
  )
}

  AwaitingCard.displayName = 'AwaitingCard'