export default interface IUser {
  id?: undefined | number;
  username?: string | undefined;
  email?: string;
  password?: string;
  roles?: Array<string>;
  accessToken: string;
}
