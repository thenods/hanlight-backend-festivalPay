import { Request, Response, NextFunction } from "express";
import Axios, { AxiosResponse } from 'axios';
import { IncomingHttpHeaders } from "http";
import * as jwt from 'jsonwebtoken';

import { HANLIGHT_STAGING_URL, HANLIGHT_DEPLOY_URL } from "@Lib/constants";

import CustomError from "@Middleware/error/customError";

interface VerifyToken {
  data: {
    type: string;
    name: string;
    major: string;
    grade: number;
    classNum: number;
    studentNum: number;
  }
}

interface DecodedToken {
  pk: string;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization }: IncomingHttpHeaders = req.headers;
  const url: string = process.env.NODE_ENV === 'development' ? HANLIGHT_STAGING_URL : HANLIGHT_DEPLOY_URL;

  try {
    if (authorization) {
      const response: AxiosResponse<VerifyToken> = await Axios.get(url + '/user', {

import CustomError from "@Middleware/error/customError";

import { axiosInstance } from "@Lib/utils";
import { HanlightUserWithoutPK, HanlightUser } from "@Lib/types";

interface VerifyToken {
  data: {
    user: HanlightUserWithoutPK;
  };
}

type decodedToken = { pk: HanlightUser['pk'] };

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization }: IncomingHttpHeaders = req.headers;

  try {
    if (authorization) {
      const response: AxiosResponse<VerifyToken> = await axiosInstance.get('/user', {
        headers: {
          access_token: authorization,
        },
      });

      const decodedToken: DecodedToken = jwt.decode(authorization) as DecodedToken;

      res.locals.user = {
        pk: decodedToken.pk,
        ...response.data.data,

      const decodedToken: decodedToken = jwt.decode(authorization) as decodedToken;

      res.locals.user = {
        pk: decodedToken.pk,
        ...response.data.data.user,
      };

      next();
    } else {
      next(new CustomError({ name: 'Wrong_Request' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: error.response.data.name, message: error.response.data.message }));
  }
};

export default verifyToken;
