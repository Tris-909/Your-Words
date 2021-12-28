import React, { useState } from "react";
import { Box, Avatar, Input, Button } from "@chakra-ui/react";
import { BiEdit, BiCheck } from "react-icons/bi";
import { updateUserInfoLocally } from "redux/features/user/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { executeGraphqlRequest } from "libs/awsLib";
import { updateUser } from "graphql/mutations";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [name, setName] = useState(
    userInfo.data.name ? userInfo.data.name : ""
  );
  const [onEditName, setOnEditName] = useState(false);
  const dispatch = useDispatch();

  const changeNameHandler = async () => {
    dispatch(updateUserInfoLocally({ name }));

    await executeGraphqlRequest(updateUser, {
      id: userInfo.data.id,
      name: name,
    });

    setOnEditName(false);
  };

  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="30"
    >
      <Box
        display="flex"
        flexDirection="row"
        width="90%"
        height="700px"
        borderRadius="15px"
        bgColor="white"
        border="2px dashed black"
      >
        <Box width="30%" display="flex" flexDirection="column">
          <Box
            height="60%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRight="2px dashed black"
            borderBottom="2px dashed black"
          >
            <Avatar
              width="250px"
              height="250px"
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
            />
          </Box>
          <Box
            height="40%"
            display="flex"
            flexDirection="column"
            ml="20px"
            borderRight="2px dashed black"
          >
            <Box fontSize="20px" fontFamily={"cursive"} color="black">
              List of buddies :
            </Box>
          </Box>
        </Box>
        <Box width="70%" display="flex" flexDirection="column" pl="20px">
          <Box fontSize="50px" fontFamily={"cursive"} color="black" mt="20px">
            Personal Info :
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            fontSize="30px"
            alignItems="center"
            fontFamily={"cursive"}
            color="black"
            mt="20px"
          >
            {onEditName ? (
              <>
                <Box marginRight="20px">Name :</Box>
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  width="content-fit"
                  marginRigt="20px"
                />
                <BiCheck
                  width="20px"
                  height="20px"
                  cursor="pointer"
                  onClick={() => changeNameHandler()}
                />
              </>
            ) : (
              <>
                <Box marginRight="20px">Name : {name}</Box>
                <BiEdit
                  width="20px"
                  height="20px"
                  cursor="pointer"
                  onClick={() => setOnEditName(true)}
                />
              </>
            )}
          </Box>
          <Box fontSize="30px" fontFamily={"cursive"} color="black" mt="20px">
            Email : tranminhtri9090@gmail.com
          </Box>
          <Box fontSize="50px" fontFamily={"cursive"} color="black" mt="30px">
            Security :
          </Box>
          <Box display="flex" flexDirection="row">
            <Box width="50%">
              <Box
                fontSize="30px"
                fontFamily={"cursive"}
                color="black"
                mt="20px"
              >
                Reset Password :
              </Box>
              <Box flexDirection="column" display="flex" fontFamily={"cursive"}>
                Current Password
                <Input placeholder="Old Password" width="70%" mt="10px" />
              </Box>
              <Box
                flexDirection="column"
                display="flex"
                mt="15px"
                fontFamily={"cursive"}
              >
                New Password
                <Input placeholder="New Password" width="70%" mt="10px" />
              </Box>
              <Button width="fit-content" marginTop="20px">
                Change Password
              </Button>
            </Box>
            <Box width="50%" pl="20px">
              <Box
                fontSize="30px"
                fontFamily={"cursive"}
                color="black"
                mt="20px"
              >
                Phone :
              </Box>
              <Box
                fontSize="20px"
                fontFamily={"cursive"}
                color="black"
                mt="20px"
              >
                + Your phone number is 0415985410
              </Box>
              <Box
                fontSize="20px"
                fontFamily={"cursive"}
                color="black"
                mt="20px"
              >
                + 2 factors authentication is currently off
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
