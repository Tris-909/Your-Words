import { executeGraphqlRequest } from "libs/awsLib";
import { createUser } from "graphql/mutations";

export const createUserProfile = async (sub, username) => {
  const user = {
    id: sub,
    username: username,
    type: "USER",
    boardHeight: 1100,
  };

  await executeGraphqlRequest(createUser, user);
};
