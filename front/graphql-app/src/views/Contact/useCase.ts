import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { CONTACT_QUERY, CONTACT_UPDATE } from "./gql";

export default () => {
  const [loading, setLoading] = useState<any>(false);
  const [item, setItem] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const [about, setContact] = useState<any>({});

  const { refetch } = useQuery(CONTACT_QUERY, {
    variables: {"skip": 0, "take": 0, "filter": 10 },
    fetchPolicy: 'no-cache',
    onCompleted: async ({ getAllContact }) => {
      setContact(getAllContact);
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
