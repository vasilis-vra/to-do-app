import { useRouter } from "next/router";

const getProjectId = () => {
  const router = useRouter();
  const { pid } = router.query;
  //return only the project id string from the query object
  return { pid }.pid;
};

export default getProjectId;
