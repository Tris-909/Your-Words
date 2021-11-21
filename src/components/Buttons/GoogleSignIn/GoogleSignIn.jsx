import React, { useEffect } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useAppContext } from "libs/context-libs";
import { createUserProfile } from "containers/Login/utils/createNewUser";
import { useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";
import { getUser } from "graphql/queries";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// To federated sign in from Google
const SignInWithGoogle = () => {
  const history = useHistory();
  const { setIsAuthenticated } = useAppContext();

  useEffect(() => {
    const ga =
      window.gapi && window.gapi.auth2
        ? window.gapi.auth2.getAuthInstance()
        : null;

    if (!ga) createScript();
  }, []);

  const signIn = () => {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn().then(
      (googleUser) => {
        getAWSCredentials(googleUser);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAWSCredentials = async (googleUser) => {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName(),
    };

    await Auth.federatedSignIn("google", { token: id_token, expires_at }, user);
    const federatedUser = await Auth.currentAuthenticatedUser();

    const result = await API.graphql(
      graphqlOperation(getUser, {
        id: federatedUser.id,
      })
    );

    if (!result?.data?.getUser?.username) {
      createUserProfile(federatedUser.id, federatedUser.email);
    }

    setIsAuthenticated(true);
    history.push("/");
  };

  const createScript = () => {
    // load the Google SDK
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.onload = initGapi;
    document.body.appendChild(script);
  };

  const initGapi = () => {
    // init the Google SDK client
    const g = window.gapi;

    console.log("Debug", GOOGLE_CLIENT_ID);

    g.load("auth2", function () {
      g.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        // authorized scopes
        scope: "profile email openid",
      });
    });
  };

  return (
    <GoogleButton type="dark" onClick={signIn} style={{ width: "100%" }} />
  );
};

export default SignInWithGoogle;
