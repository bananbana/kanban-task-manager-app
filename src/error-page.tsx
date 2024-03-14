import { Link } from "react-router-dom";
import { authHeader } from "./services/auth-header";

export const ErrorPage = () => {
  return authHeader().username === "Guest" ? (
    <div id="error-page" className="error-page">
      <div className="error-content">
        <h1>Oops!</h1>
        <p>You need to be logged in to start using the app.</p>
        <p>
          <i>{authHeader().Authorization}</i>
        </p>
        <Link
          to="/"
          className="text-body-m font-light text-main-purple hover:text-main-purple-hover"
        >
          Back to main page
        </Link>
      </div>
    </div>
  ) : (
    <div id="error-page" className="error-page">
      <div className="error-content">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <Link
          to="/"
          className="text-body-m font-light text-main-purple hover:text-main-purple-hover"
        >
          Back to main page
        </Link>
      </div>
    </div>
  );
};
