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

const NavBar = () => {
  const { setIsAuthenticated } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const handlerLogOut = async () => {
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
            src="https://bit.ly/code-beast"
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
