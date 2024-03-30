import { apiClientFetch } from 'package/api/api-fetch';
import { UserLoginResponse } from 'package/api/user/login';

export const Login = async (email: string, password: string) => {
  try {
    const data: UserLoginResponse = await apiClientFetch('login', {
      email,
      password,
    });
    console.log(data)
    if (data.status === 'error') {
      throw new Error('Đăng nhập thất bại');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const Logout = async () => {
  try {
    const res = await apiClientFetch('logout', {});
    if (res.status === 'error') {
      throw new Error('Không thể đăng xuất');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
