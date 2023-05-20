
import { CheckIcon } from "../../assets/IconPack"
import { AngleArrowDown } from "../../assets/IconPack"
import { Button } from "../Button"
import { CheckCandidate } from "../CheckCandidate"
import { ProfileAvatar } from "../ProfileAvatar"
import { Spinner } from "../Spinner"
import styles from "./ElectCard.module.css"

type ElectCardProps = {
  portfolio?: string
  name?: string
  profileUrl?: string
  viewDetails?: () => void
  isList?: boolean
  votePercentage?: string
  votes?: string
  isEdit?: boolean
  handleDelete?: () => void
  handleEdit?: () => void
  isElect?: boolean
  handleVote?: () => void
  isVoted?: boolean
  handleUpdateProfile?: () => void
  isProfileUpdate?: boolean
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  aFile?: File,
  isLoading?: boolean,
  isNoFile?: boolean, isCompressing?: boolean,
} & React.HTMLAttributes<HTMLDivElement>

export const ElectCard = (
  { portfolio, name, viewDetails,
    profileUrl, votes, votePercentage,
    handleVote, isElect = false,
    isList = false, isEdit, handleDelete,
    handleEdit,
    isVoted,
    isProfileUpdate,
    handleUpdateProfile, onFileChange,
    aFile, isLoading, isNoFile, isCompressing,
    ...props

  }: ElectCardProps) => {
  return (
    <>
      <div {...props} className={styles.root}>
        <span className={styles.heading}>
          {
            portfolio?.charAt(0)
              ?.toUpperCase()
          }
          {portfolio?.substring(1)
            ?.toLowerCase()}
        </span>
        <div className={styles.container}>
          <ProfileAvatar
            isCompressing={isCompressing}
            isNoFile={isNoFile}
            size="qLarge"
            src={profileUrl}
            overlay={isEdit || isProfileUpdate}
            upload={isProfileUpdate}
            handleDelete={handleDelete}
            onFileChange={onFileChange}
            aFile={aFile}
          />
          {
            isElect ?
              <div className={styles.elect}>
                <span className={styles.name}>
                  {
                    name?.charAt(0)
                      ?.toUpperCase()
                  }
                  {name?.substring(1)
                    ?.toLowerCase()}</span>

                <Button
                  className={styles.button}
                  variants='outlined'
                  style={{ background: `${isVoted ? "var(--yov-accent-color) " : "#ffffff"}` }}
                  onClick={handleVote} >
                  {
                    isVoted ?
                      <CheckIcon /> :
                      null
                  }
                </Button>
              </div>
              : isProfileUpdate ? <>
                <div className={styles.updatProfile}>
                  <Button disabled={isLoading} onClick={handleUpdateProfile} >
                    {
                      isLoading ? <Spinner /> : "Update"
                    }
                  </Button>
                </div>
              </> :
                <div className={styles.details}>
                  <span className={styles.name}>
                    {
                      name?.charAt(0)
                        ?.toUpperCase()
                    }
                    {name?.substring(1)
                      ?.toLowerCase()}
                  </span>
                  {
                    isList ?
                      <div className={styles.resultsDetails} >
                        <span className={styles.percentage}>{votePercentage}</span>
                        <span className={styles.votes}>{votes}</span>
                      </div> :
                      isEdit ?
                        <div className={styles.resultsControls} >
                          <Button size="small" onClick={handleEdit}>
                            Edit
                          </Button>
                        </div>
                        :
                        <div className={styles.electDetails} >
                          <span className={styles.viewDetails} onClick={viewDetails} > <AngleArrowDown /> </span>
                          <CheckCandidate />
                        </div>
                  }
                </div>
          }
        </div>
      </div>
    </>
  )
}


ElectCard.displayName = "ElectCard"