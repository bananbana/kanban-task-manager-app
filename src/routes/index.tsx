import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import IUser from "../types/user.type";
import AuthService from "../services/auth.service";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user && user.roles) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div
      id="index"
      className="flex flex-col dark:bg-very-dark-grey dark:text-white bg-light-grey h-full w-full justify-start items-center"
    >
      {currentUser ? (
        <div
          id="user-modal"
          className="flex flex-col justify-center items-center mt-28"
        >
          <p className="text-medium-grey text-heading-l pb-2">
            Nothing here 🤷
          </p>
          <p className="text-medium-grey text-heading-l pb-8">
            Create a new board or select one from the list to get started
          </p>
          <NavLink to={"/user/boards/new"}>
            <div className="h-12 hover:bg-main-purple-hover bg-main-purple text-white rounded-full text-heading-m flex justify-center items-center px-4 py-2">
              <h3>+ Add New Board</h3>
            </div>
          </NavLink>
        </div>
      ) : (
        <div
          id="auth-modal"
          className="flex flex-col dark:bg-very-dark-grey dark:text-white bg-white rounded-lg p-4 shadow-md"
        >
          <p>Log in or create an account to begin</p>

          <div className="flex justify-around w-full mt-3">
            <NavLink to={"/login"}>
              <div className="hover:bg-main-purple-hover bg-main-purple text-white rounded-full text-heading-m flex justify-center items-center py-2 px-4">
                Login
              </div>
            </NavLink>
            <NavLink to={"/register"}>
              <div className=" hover:bg-main-purple-hover bg-main-purple text-white rounded-full text-heading-m flex justify-center items-center py-2 px-4">
                Sign up
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
