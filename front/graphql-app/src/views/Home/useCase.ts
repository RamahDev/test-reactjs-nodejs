import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { HOME_QUERY } from "./gql";

export default () => {
  const [loading, setLoading] = useState<any>(false);
  const [item, setItem] = useState<any>({});

  const { refetch } = useQuery(HOME_QUERY, {
    variables: {"skip": 0, "take": 0, "filter": 10 },
    fetchPolicy: 'no-cache',
    onCompleted: async ({ getHome }) => {
      setItem(getHome);
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    refetch();
  }, []);

  return {
    item,
    loading,
  }
}
