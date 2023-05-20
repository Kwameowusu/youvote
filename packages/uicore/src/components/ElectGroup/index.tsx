import React from 'react'
import { ElectCard } from '../ElectCard'
import ElectGroupWrapper from './ElectGroupWrapper'

type ElectGroupProps = {
  Results: {
    fuid: string
    portfolio: string
    name: string
    profileUrl: string
  }[]
  viewDetails: (id: {
    fuid: string
    portfolio: string
    name: string
    profileUrl?: string
  }) => void
}
export const ElectGroup = ({ Results, viewDetails }: ElectGroupProps) => {


  return (
    <>
      <ElectGroupWrapper>
        {
          Array.isArray(Results) && Results.length ?
            Results?.map((element, index) => {
              return (
                <React.Fragment key={index}>
                  <ElectCard
                    viewDetails={() => viewDetails(element)}
                    portfolio={element.portfolio}
                    name={element.name}
                    profileUrl={element.profileUrl}
                  />
                </React.Fragment>
              )
            }
            ) : null
        }
      </ElectGroupWrapper>
    </>
  )
}


ElectGroup.displayName = "ElectGroup"