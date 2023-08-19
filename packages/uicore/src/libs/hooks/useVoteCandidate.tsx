import React, { useCallback, useEffect } from "react";


// let votedCandidates:
//   {
//     id: string,
//     portfolio: string,
//     name: string,
//   }[] = []

type voteCandidate = {
  fuid: string,
  portfolio: string,
  name: string,
}

export const useVoteCandidate = (getSelectedChoice: (a: any) => void) => {
  const [aCandidate, setACandidate] = React.useState<voteCandidate[]>([])

  useEffect(() => {
    getSelectedChoice(aCandidate)
  }, [aCandidate])

  const VoteFunc = useCallback(
    (candidate: voteCandidate) => {
      if (aCandidate?.some((iter) => iter.portfolio.trim() === candidate.portfolio.trim())) {
        setACandidate((prev: voteCandidate[]) => {
          const newCandidates = prev.filter((iter) => {
            return iter.portfolio.trim() !== candidate.portfolio.trim()
          });
          return [...newCandidates, candidate]
        });
        return;
      }
      setACandidate((prev) => [...prev, candidate]);
    },
    [aCandidate],
  )

  return {
    aCandidate,
    VoteFunc,
  }
}
