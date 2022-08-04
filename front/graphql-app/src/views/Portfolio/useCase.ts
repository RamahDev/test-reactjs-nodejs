import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { PORTFOLIO_QUERY, PORTFOLIO_UPDATE } from "./gql";

export default () => {
  const [loading, setLoading] = useState<any>(false);
  const [item, setItem] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const [about, setPortfolio] = useState<any>({});

  const { refetch } = useQuery(PORTFOLIO_QUERY, {
    variables: {"skip": 0, "take": 0, "filter": 10 },
    fetchPolicy: 'no-cache',
    onCompleted: async ({ getAllPortfolio }) => {
      setPortfolio(getAllPortfolio);
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    refetch({ "skip": 0, "take": 10, "filter": item?.value });
  }, [item?.value]);

  return {
    item,
    loading,
    data,
    about,
  }
}
