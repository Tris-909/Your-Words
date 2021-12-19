import React from "react";
import { Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import config from "aws-exports-env";
const ENV = process.env.REACT_APP_DEV_ENV;

const CommonImage = (props) => {
  const { auth } = useSelector((state) => state.user);

  return (
    <>
      {auth && auth.data ? (
        <Image
          src={`https://${config[ENV].aws_user_files_s3_bucket}.s3.${config[ENV].aws_user_files_s3_bucket_region}.amazonaws.com/private/${auth.data.id}/${props.source}`}
          {...props}
        />
      ) : null}
    </>
  );
};

export default CommonImage;
