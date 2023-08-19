// import { EditIcon } from '../../assets/IconPack/EditIcon'
import { TrashIcon } from '../../assets/IconPack/TrashIcon'
import { Button } from '../Button'
import styles from './UpdatePortfolioList.module.css'

interface UpdatePortfolioListProps extends React.HTMLAttributes<HTMLDivElement> {
  portfolioList: {
    id: string
    fuid: string
    name: string
  }[],
  handleDelete: (getPortfolio: {
    id: string
    fuid: string
    name: string
  }) => void,
  handleEdit: (getPortfolio: {
    id: string
    fuid: string
    name: string
  }) => void

}
export const UpdatePortfolioList = ({ portfolioList, handleDelete, handleEdit, ...props }: UpdatePortfolioListProps) => {
  return (
    <>
      <div className={styles.root}  {...props} >
        <span className={styles.heading} >
          All Portfolios
        </span>
        <div className={styles.container} >
          {
            Array.isArray(portfolioList) && portfolioList.length ?
              portfolioList.map((portfolio, index) => {
                return (
                  <div key={index} className={styles.portfolio} >
                    <span className={styles.name} >{portfolio.name}</span>
                    <div className={styles.controls}>
                      {/* <Button variants='outlined' onClick={() => handleEdit(portfolio.fuid)} >
                        <EditIcon />
                      </Button> */}
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

UpdatePortfolioList.displayName = 'UpdatePortfolioList'