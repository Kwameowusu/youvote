import useSWR from "swr";

interface DataResponse {
	userData: any;
	userError: any;
}
const fetcher = (args: RequestInfo | URL, init: RequestInit) => fetch(args, init).then((res) => res.json());

export const GetRequest = (args: any): DataResponse => {
	const { data, error } = useSWR(args, fetcher);
	return {
		userData: data,
		userError: error,
	};
};
