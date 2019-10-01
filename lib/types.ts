import { IncomingHttpHeaders } from "http";

export enum ErrorNames {
  Not_User = "Not_User",
  Not_Found = "Not_Found",
  Database_Error = "Database_Error",
  Wrong_Request = "Wrong_Request",
  Wrong_FileExtension = "Wrong_FileExtension",
  Limit_File_Size = "Limit_File_Size",
  Wrong_Data = "Wrong_Data",
  Unhandled_Error = "Unhandled_Error",
  Exist_User = "Exist_User",
  Token_Expired = "Token_Expired",
  Forbidden = "Forbidden",
  Exist_Data = "Exist_Data",
  Not_Found_Board = "Not_Found_Board",
  Not_Found_Comment = "Not_Found_Comment",
  Payment_Lack_Money = "Payment_Lack_Money",
}

export type DefaultResponse = {
  success: boolean;
  data: {};
};

export type RequestHeaderWithToken = {
  headers: {
    authorization?: IncomingHttpHeaders["authorization"];
  };
};
export type UserType = "student" | "teacher" | "parent" | "graduate";
export type UserMajor = "U" | "G" | "H";
export interface HanlightUserWithoutPK {
  type: UserType;
  name: string;
  major?: UserMajor;
  grade?: number;
  classNum?: number;
  studentNum?: number;
}
export interface HanlightUser extends HanlightUserWithoutPK {
  pk: string;
}
