import IUser from "../types/user.type";

export const authHeader = () => {
  const userStr = localStorage.getItem("user");
  let user;
  if (userStr) user = JSON.parse(userStr) as IUser;

  if (user && user.accessToken) {
    return {
      Authorization: "Bearer " + user.accessToken,
      username: user.username,
    };
  } else {
    return {
      Authorization: "No authorization.",
      username: "Guest",
    };
  }
};
