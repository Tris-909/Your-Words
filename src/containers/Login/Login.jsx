import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "libs/context-libs";
import useBreakPoints from "libs/useMediaQueries";
import {
  Grid,
  GridItem,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import SignInWithGoogle from "../../components/Buttons/GoogleSignIn/GoogleSignIn";
import { createUserProfile } from "./utils/createNewUser";
import "./Login.scss";

const Login = () => {
  const { setIsAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [inputValid, setInputValid] = useState("");
  // signin || signup || confirmsignup || forgotpassword || confirmchangepassword
  const [formState, setFormState] = useState("signin");
  const history = useHistory();
  const { isSM } = useBreakPoints();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const changeFormState = (newState, forgotPassword = false) => {
    // Reset all value
    if (!forgotPassword) {
      setEmail("");
    }
    setPassword("");
    setConfirmPassword("");
    setConfirmationCode("");
    setError("");
    setInputValid("");

    setFormState(newState);
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await Auth.signIn(email, password);

      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setInputValid("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setIsLoading(false);
      setInputValid("password");
      setError("Password and Confirm Password must be the same");
      return;
    }

    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
      });

      setIsLoading(false);
      if (newUser) {
        setFormState("confirmsignup");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "UsernameExistsException") {
        setInputValid("email");
      } else if (error.code === "InvalidPasswordException") {
        setInputValid("password");
      }
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmitConfirmationSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(email, confirmationCode);
      const result = await Auth.signIn(email, password);
      createUserProfile(result.username, result.attributes.email);
      setIsAuthenticated(true);
      history.push("/");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await Auth.forgotPassword(email);
      setIsLoading(false);
      changeFormState("confirmchangepassword", true);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmitConfirmChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await Auth.forgotPasswordSubmit(email, confirmationCode, password);
      await Auth.signIn(email, password);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      if (error.code === "CodeMismatchException") {
        setInputValid("confirmationCode");
        setError("Your confirmation code is invalid");
      } else if (error.code === "InvalidPasswordException") {
        setInputValid("password");
        setError(
          "Your password must be at least 8 characters long with 1 number and 1 symbol and 1 uppercase"
        );
      }
      setIsLoading(false);
    }
  };

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      gap={6}
      alignContent="center"
      className="loginPage"
    >
      <GridItem colStart={isSM ? 2 : 4} colEnd={isSM ? 12 : 10}>
        <Box borderWidth="1px" borderRadius="lg" bg="#f2f2f7" p="10">
          <Heading
            as="p"
            fontSize={isSM ? "7rem" : "4rem"}
            className="FormHeader"
            textAlign="center"
            marginBottom={2}
          >
            {" "}
            Your Words{" "}
          </Heading>
          <Heading
            as="p"
            fontSize={isSM ? "4rem" : "2.5rem"}
            className="FormHeader"
            textAlign="center"
            marginBottom={8}
          >
            {formState === "signin" && "Sign In"}
            {formState === "signup" && "Sign Up"}
            {formState === "confirmsignup" &&
              "We've just sent the code to your email"}
            {formState === "forgotpassword" && "Forgot Password"}
            {formState === "confirmchangepassword" &&
              "Please enter the code we've just sent to your email and the new password"}
          </Heading>
          {formState === "signin" && (
            <form onSubmit={handleSubmitSignIn}>
              <FormControl isInvalid={error} id="email">
                <FormLabel fontSize={isSM ? "32px" : "16px"}>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size={isSM ? "lg" : "md"}
                  className="Input"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" marginTop={4}>
                <FormLabel fontSize={isSM ? "32px" : "16px"}>
                  Password
                </FormLabel>
                <Input
                  type="password"
                  value={password}
                  size={isSM ? "lg" : "md"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="Input"
                />
              </FormControl>
              <Grid
                templateColumns="repeat(2, 1fr)"
                alignItems="center"
                marginTop={2}
              >
                <Box marginTop={isSM ? 12 : 6}>
                  <SignInWithGoogle />

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    bg="#F56565"
                    color="white"
                    variant="solid"
                    marginTop={isSM ? 6 : 6}
                    marginBottom={isSM ? 12 : 6}
                    p={isSM ? 8 : 0}
                    fontSize={isSM ? "32px" : "16px"}
                    width="100%"
                    className="SubmitButton"
                  >
                    Login
                  </Button>
                </Box>

                <Box justifySelf="flex-end">
                  <Text
                    className="SignUp"
                    fontSize={isSM ? "32px" : "16px"}
                    onClick={() => changeFormState("signup")}
                  >
                    Sign Up Here
                  </Text>
                  <Text
                    className="SignUp"
                    marginTop={2}
                    fontSize={isSM ? "32px" : "16px"}
                    onClick={() => changeFormState("forgotpassword")}
                  >
                    Forgot Password
                  </Text>
                </Box>
              </Grid>
            </form>
          )}
          {formState === "signup" && (
            <form onSubmit={handleSubmitSignUp}>
              <FormControl id="email" isInvalid={inputValid === "email"}>
                <FormLabel fontSize={isSM ? "32px" : "16px"}>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size={isSM ? "lg" : "md"}
                  className="Input"
                />
              </FormControl>
              <FormControl
                id="password"
                isInvalid={inputValid === "password"}
                marginTop={4}
              >
                <FormLabel fontSize={isSM ? "32px" : "16px"}>
                  Password
                </FormLabel>
                <Input
                  type="password"
                  value={password}
                  size={isSM ? "lg" : "md"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="Input"
                />
              </FormControl>
              <FormControl
                id="confirmPassword"
                isInvalid={inputValid === "password"}
                marginTop={4}
              >
                <FormLabel fontSize={isSM ? "32px" : "16px"}>
                  Confirm Password
                </FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  size={isSM ? "lg" : "md"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="Input"
                />
              </FormControl>
              <Text marginTop={6} color="#ff1919" fontWeight="bold">
                {" "}
                {error}{" "}
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" alignItems="center">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={!validateForm()}
                  bg="#F56565"
                  color="white"
                  variant="solid"
                  marginTop={isSM ? 12 : 6}
                  marginBottom={isSM ? 12 : 6}
                  p={isSM ? 8 : 0}
                  fontSize={isSM ? "32px" : "16px"}
                  className="SubmitButton"
                >
                  Sign Up
                </Button>
                <Box justifySelf="flex-end">
                  <Text
                    className="SignUp"
                    fontSize={isSM ? "32px" : "16px"}
                    onClick={() => changeFormState("signin")}
                  >
                    Already has an account ? Sign In
                  </Text>
                  <Text
                    className="SignUp"
                    display="flex"
                    justifyContent="flex-end"
                    marginTop={2}
                    fontSize={isSM ? "32px" : "16px"}
                    onClick={() => changeFormState("forgotpassword")}
                  >
                    Forgot Password
                  </Text>
                </Box>
              </Grid>
            </form>
          )}
          {formState === "confirmsignup" && (
            <form onSubmit={handleSubmitConfirmationSignUp}>
              <FormControl isInvalid={error} id="code">
                <FormLabel fontSize={isSM ? "32px" : "16px"}>
                  Confirmation Code
                </FormLabel>
                <Input
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  size={isSM ? "lg" : "md"}
                  className="Input"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Grid alignItems="center">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={confirmationCode.length === 0}
                  bg="#F56565"
                  color="white"
                  variant="solid"
                  marginTop={isSM ? 12 : 6}
                  marginBottom={isSM ? 12 : 6}
                  p={isSM ? 8 : 0}
                  fontSize={isSM ? "32px" : "16px"}
                  className="SubmitButton"
                >
                  Verify
                </Button>
              </Grid>
            </form>
          )}
          {formState === "forgotpassword" && (
            <form onSubmit={handleSubmitChangePassword}>
              <FormControl isInvalid={error} id="code">
                <FormLabel fontSize={isSM ? "32px" : "16px"}>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size={isSM ? "lg" : "md"}
                  className="Input"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={email.length === 0}
                  bg="#F56565"
                  color="white"
                  variant="solid"
                  marginTop={isSM ? 12 : 6}
                  marginBottom={isSM ? 12 : 6}
                  p={6}
                  fontSize={isSM ? "32px" : "16px"}
                  className="SubmitButton"
                >
                  Reset Password
                </Button>
                <Text
                  className="SignUp"
                  fontSize={isSM ? "32px" : "16px"}
                  onClick={() => changeFormState("signin")}
                >
                  Sign In
                </Text>
              </Box>
            </form>
          )}
          {formState === "confirmchangepassword" && (
            <form onSubmit={handleSubmitConfirmChangePassword}>
              <FormControl
                isInvalid={inputValid === "confirmationCode"}
                id="code"
              >
                <FormLabel fontSize={isSM ? "32px" : "16px"}>
                  Confirmation Code
                </FormLabel>
                <Input
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  size={isSM ? "lg" : "md"}
                  className="Input"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={inputValid === "password"}
                id="code"
                marginTop={4}
              >
                <FormLabel fontSize={isSM ? "32px" : "16px"}>
                  New Password
                </FormLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size={isSM ? "lg" : "md"}
                  className="Input"
                  type="password"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  isLoading={isLoading}
                  bg="#F56565"
                  color="white"
                  variant="solid"
                  marginTop={isSM ? 12 : 6}
                  marginBottom={isSM ? 12 : 6}
                  p={6}
                  fontSize={isSM ? "32px" : "16px"}
                  className="SubmitButton"
                >
                  Confirm Change Password
                </Button>
                <Text
                  className="SignUp"
                  fontSize={isSM ? "32px" : "16px"}
                  onClick={() => changeFormState("signin")}
                >
                  Sign In
                </Text>
              </Box>
            </form>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Login;
