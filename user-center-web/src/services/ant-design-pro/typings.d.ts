// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: number,
    userName?: string;
    loginName?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    status?: number;
    userRole?: number;
    createTime?: Date;
  };

  /**
   * 通用请求响应类
   */
  type BaseResponse<T> = {
    code: number;
    message: string;
    details: string;
    data: T;
  }

  type PageResponse<T> = {
    code: number;
    message: string;
    details: string;
    data: PageData<T>;
  }

  type PageData<T> = {
    current: number,
    pages: number,
    size: number,
    total: number,
    records: T[];
  }

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  type AddUserFromData = {
    userName?: string;
    loginName?: string;
    loginPwd?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userRole?: number;
  };

  type LoginParams = {
    loginName?: string;
    loginPwd?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    loginName?: string;
    loginPwd?: string;
    checkPwd?: string;
    type?: string;
  };
}
