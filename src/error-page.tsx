import { authHeader } from "./services/auth-header";

export const ErrorPage = () => {
  return authHeader().username === "Guest" ? (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{authHeader().Authorization}</i>
      </p>
    </div>
  ) : (
    ""
  );
};
