// @ts-ignore
/* eslint-disable */
// @ts-ignore
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/login/account */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 GET /api/user/search */
export async function searchUsers(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<API.PageResponse<API.CurrentUser>>('/api/user/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新用户 GET /api/user/update */
export async function updateUser(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/delete */
export async function deleteUser(body: number | undefined, options?: { [p: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户 POST /api/user/add */
export async function addUser(body: API.AddUserFromData | undefined, options?: { [p: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取邮箱验证码 POST /api/user/mailCaptcha */
export async function getMailCaptcha(email: string | undefined, options?: { [p: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/mailCaptcha', {
    method: 'GET',
      params: {
        "email": email,
      },
    ...(options || {}),
  });
}
