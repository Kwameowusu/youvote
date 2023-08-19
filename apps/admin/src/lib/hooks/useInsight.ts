import { useCandidateProvider } from "../../contextapi/CandidateProvider";
import { spreadVotes } from "../reducers/candidate-reducer";

export const useInsight = () => {
	const { CandidateState } = useCandidateProvider();

	const resultsFunc = () => {
		const ff = CandidateState.votesList.reduce((acc: spreadVotes[], curr) => {
			return [...acc, ...curr.choice];
		}, []);
  

		// Group by portfolio
		const portfolioGroup = ff.reduce((acc: any, curr) => {
			const portfolio = curr.portfolio;
			if (!acc[portfolio]) {
				acc[portfolio] = [];
			}
			acc[portfolio].push(curr);
			return acc;
    }, {});

		// Group portfolioGroup sub objects by candidate name
		const candidateGroup = Object.keys(portfolioGroup).reduce((acc: any, curr: any) => {
			acc[curr] = portfolioGroup[curr].reduce((acc: any, curr: any) => {
				const name = curr.name;
				if (!acc[name]) {
					acc[name] = [];
				}
				acc[name].push(curr);
				return acc;
			}, {});
			return acc;
		}, {});
		// console.log("candidateGroup", candidateGroup);

		// Pick all the candidates with the highest array length ignoring base on the portfolio
		const results = Object.keys(candidateGroup).reduce((acc: any, curr1: any) => {
			const curr = candidateGroup[curr1];
			const highest = Object.keys(curr).reduce((acc: any, curr2: any) => {
				if (acc.length < curr[curr2].length) {
					acc = curr[curr2];
				}
				return acc;
			}, []);
			acc.push(highest);
			return acc;
		}, []);

		// use the results with CandidateState.candidateList to get the candidate details profileUrl
		const resultsWithUrl = results.map((item: any) => {
			const candidate = CandidateState.candidateList.find(
				(candidate: any) => candidate.name === item[0].name
			);
			return { ...item[0], profileUrl: candidate?.profileUrl };
		});

		return resultsWithUrl;
	};

	const aPortfolioResultsFunc = (portfolio: string) => {
		const ff = CandidateState.votesList.reduce((acc: spreadVotes[], curr) => {
			return [...acc, ...curr.choice];
		}, []);

		// Group by portfolio
		const portfolioGroup = ff.reduce((acc: any, curr: any) => {
			const portfolio = curr.portfolio;
			if (!acc[portfolio]) {
				acc[portfolio] = [];
			}
			acc[portfolio].push(curr);
			return acc;
		}, {});

		// Group portfolioGroup sub objects by candidate name
		const candidateGroup = Object.keys(portfolioGroup).reduce((acc: any, curr: any) => {
			acc[curr] = portfolioGroup[curr].reduce((acc: any, curr: any) => {
				const name = curr.name;
				if (!acc[name]) {
					acc[name] = [];
				}
				acc[name].push(curr);
				return acc;
			}, {});
			return acc;
		}, {});

		// Pick all the candidates base on the portfolio passed in the function argument
		const candidates =
			candidateGroup[portfolio] &&
			Object.keys(candidateGroup[portfolio]).map((item: any) => {
				return {
					name: item,
					votes: candidateGroup[portfolio][item].length,
					profileUrl: CandidateState.candidateList.find((candidate: any) => candidate.name === item)
						?.profileUrl,
					votePercentage: (
						(candidateGroup[portfolio][item].length / CandidateState.votesList?.length) *
						100.0
					).toFixed(2) + "%"
				};
			});

		// Sort the candidates by votes
		const sortedCandidates = candidates && candidates.sort((a: any, b: any) => b.votes - a.votes);
		return sortedCandidates;
	};

	return {
		resultsFunc,
		aPortfolioResultsFunc,
	};
};
