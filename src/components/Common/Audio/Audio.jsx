import React from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import config from "aws-exports-env";
import "./Audio.scss";
const ENV = process.env.REACT_APP_DEV_ENV;

const CommonAudio = ({ source, editIsLocked }) => {
  const { auth } = useSelector((state) => state.user);

  if (auth && auth.data) {
    return (
      <div
        style={{
          width: "300px",
          height: "54px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: !editIsLocked ? "white" : "initial",
        }}
      >
        <audio id="audio" controls={editIsLocked}>
          <source
            src={`https://${config[ENV].aws_user_files_s3_bucket}.s3.${config[ENV].aws_user_files_s3_bucket_region}.amazonaws.com/private/${auth.data.id}/${source}`}
            type="audio/mpeg"
          />
        </audio>
        {!editIsLocked && (
          <Box className="AudioEdit">Audio is in edit state</Box>
        )}
      </div>
    );
  }

  return null;
};

export default CommonAudio;
