import { Request, Response, NextFunction } from "express";
import { AxiosResponse } from "axios";

import { axiosInstance } from "@Lib/utils";

import { PostMoneyParams } from "./_validation";
import { HanlightUser, DefaultResponse } from "@Lib/types";
import CustomError from "@Middleware/error/customError";

interface UserCheckResponse extends DefaultResponse {
  success: boolean;
  data: {
    user: HanlightUser;
  };
}

const getUserWithUUID = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization }: PostMoneyParams['headers'] = req.headers;
  const { user_pk }: PostMoneyParams['body'] = req.body;

  try {
    const response: AxiosResponse<UserCheckResponse> = await axiosInstance.post('/festival/admin/user-check',
    { user_pk }, {
      headers: {
        access_token: authorization,
      },
    });

    res.locals.targetUser = response.data.data.user; 
    next();
  } catch (error) {
    next(new CustomError({ name: error.response.data.name, message: error.response.data.message }));
  }
};

export default getUserWithUUID;
