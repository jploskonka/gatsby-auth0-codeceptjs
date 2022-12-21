import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const IndexPage = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()

  return (
    <main>
      <h1>
        Hello world
      </h1>

      {isAuthenticated ? 
        <div>
          {user.email}<br />
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
        </div>
        :
        <button onClick={() => loginWithRedirect()}>Log in</button>
      }
    </main>
  )
}

export default IndexPage
