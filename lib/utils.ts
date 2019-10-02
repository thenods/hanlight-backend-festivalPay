import Axios, { AxiosInstance } from "axios";
import * as dotenv from 'dotenv';

import { HANLIGHT_DEPLOY_URL, HANLIGHT_STAGING_URL } from "./constants";

dotenv.config();

export const isProduction: () => boolean = () => {
  return process.env.NODE_ENV === 'production';
};

export const axiosInstance: AxiosInstance = Axios.create({ 
  baseURL: isProduction() ? HANLIGHT_DEPLOY_URL : HANLIGHT_STAGING_URL,
});