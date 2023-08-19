import { ProfileAvatar } from "../ProfileAvatar";
import styles from "./CongratCard.module.css"

type CongratCardProps = {
  profileUrl: string
} & React.HTMLAttributes<HTMLDivElement>
export const CongratCard = ({ profileUrl,...props }: CongratCardProps) => {
  return (
    <>
      <div className={styles.root} {...props}>
        <ProfileAvatar
          size="cMedium"
          src={profileUrl}
        />
        <span className={styles.message}>
          Thank you <br></br>
          for voting
        </span>
        <span className={styles.time}>
          {
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        </span>
      </div>
    </>
  )
}
CongratCard.displayName = 'CongratCard';

