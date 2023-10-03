/** @format */

import { title } from "process";
/** @format */

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface IArticle {
  title: string;
  content: boolean;
  _id: string;
  file: IFile | undefined;
}

export interface IFile {
  contentType: string;
  filename: string;
  path: string;
}

export interface IAuthResponse {
  accessToken: string;
}
