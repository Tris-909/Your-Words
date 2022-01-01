import {
  HStack,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { LinkWrapper } from "../LinkWrapper/LinkWrapper";
import { useAppContext } from "libs/context-libs";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { BiUser, BiExit } from "react-icons/bi";
import "./NavBar.scss";
import { clearUserState } from "redux/features/user/userInfo";
import { clearAudiosState } from "redux/features/audio/audio";
import { clearHeadingState } from "redux/features/heading/heading";
import { clearNotesState } from "redux/features/notes/note";
import { clearImagesState } from "redux/features/images/images";
import { clearStickerState } from "redux/features/stickers/sticker";
import { useSelector, useDispatch } from "react-redux";
import config from "aws-exports-env";
import NoAvatarImage from "containers/Profile/no-avatar.jpg";
const ENV = process.env.REACT_APP_DEV_ENV;

const NavBar = () => {
  const { setIsAuthenticated } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { auth } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlerLogOut = async () => {
    // Clearing redux state
    dispatch(clearStickerState());
    dispatch(clearHeadingState());
    dispatch(clearNotesState());
    dispatch(clearImagesState());
    dispatch(clearAudiosState());
    dispatch(clearUserState());

    // Redirect to login page
    await Auth.signOut();
    history.push("/auth");
    setIsAuthenticated(false);
  };

  return (
    <HStack
      justifyContent="space-between"
      flexDirection="row"
      px={6}
      py={4}
      className="navbar"
    >
      <HStack alignItems="center">
        <Text className="logo">
          <LinkWrapper to="/">Your Words</LinkWrapper>
        </Text>
      </HStack>
      <Box>
        <Menu isOpen={isOpen}>
          <MenuButton
            as={Avatar}
            onMouseEnter={() => onOpen()}
            onMouseLeave={() => onClose()}
            src={
              auth?.data?.id && userInfo?.data?.avatarSource
                ? `https://${config[ENV].aws_user_files_s3_bucket}.s3.${config[ENV].aws_user_files_s3_bucket_region}.amazonaws.com/private/${auth.data.id}/${userInfo.data.avatarSource}`
                : NoAvatarImage
            }
          ></MenuButton>
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            <MenuItem
              icon={<BiUser className="icon" boxSize="3em" />}
              onClick={() => {
                history.push("/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              icon={<BiExit className="icon" boxSize="3em" />}
              onClick={handlerLogOut}
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
};

export default NavBar;
