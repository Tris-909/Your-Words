import { Storage } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

export const uploadToS3 = async (file) => {
  const fileName = `${Date.now()}-${file.Name}`;

  const stored = await Storage.vault.put(fileName, file, {
    contentType: file.type,
  });

  return stored.key;
};

export const deleteFromS3 = async (attachmentKey) => {
  await Storage.vault.remove(attachmentKey);
};

export const executeGraphqlRequest = async (method, input) => {
  return await API.graphql(
    graphqlOperation(method, {
      input: input,
    })
  );
};
