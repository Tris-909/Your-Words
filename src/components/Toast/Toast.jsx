import { Box, Icon } from "@chakra-ui/react";

const ToastBody = ({ icon, content, color, bg }) => {
  return (
    <Box color={color} bg={bg} p={3}>
      {icon && (
        <Icon
          as={icon}
          mr={2}
          marginBottom={1}
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
        />
      )}
      {content}
    </Box>
  );
};

export default ToastBody;
