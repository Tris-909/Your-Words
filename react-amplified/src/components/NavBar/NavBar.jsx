import { HStack, Text, Icon } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { LinkWrapper } from "../LinkWrapper/LinkWrapper";
import { useAppContext } from "libs/context-libs";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./NavBar.scss";

const NavBar = ({ onOpen }) => {
  const { setIsAuthenticated } = useAppContext();
  const history = useHistory();

  const handlerLogOut = async () => {
    await Auth.signOut();
    history.push("/login");
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
        <Icon
          color="white"
          cursor="pointer"
          boxSize={7}
          as={HamburgerIcon}
          onClick={onOpen}
        />
        <Text className="logo" pl={6}>
          <LinkWrapper to="/">Your Words</LinkWrapper>
        </Text>
      </HStack>
      <Text color="white" fontSize="18px" onClick={() => handlerLogOut()}>
        <LinkWrapper to="/auth">Sign Out</LinkWrapper>
      </Text>
    </HStack>
  );
};

export default NavBar;
