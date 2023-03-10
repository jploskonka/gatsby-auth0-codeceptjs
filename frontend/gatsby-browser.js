import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { navigate } from "gatsby";

const onRedirectCallback = (appState) => {
  navigate(appState?.returnTo || "/", { replace: true });
}

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={process.env.GATSBY_AUTH0_DOMAIN}
    clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    {element}
  </Auth0Provider>
)