import { UserLogin, UserLoginResponse } from 'package/api/user/login';
import {
  getAdminToken,
  getMentorToken,
  getSuperAdminToken,
  setAdminToken,
  setMentorToken,
  setSuperAdminToken
} from 'package/cookies/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { errorSystem } from 'package/api/api-fetch';
import { S } from '@fullcalendar/core/internal-common';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  const params = await req.json();
  const adminToken = await getAdminToken(cookies());
  const mentorToken = await getMentorToken(cookies());
  const superAdminToken = await getSuperAdminToken(cookies());
  const path = searchParams.get('path') as string;
  const data = await response(params, adminToken, mentorToken, superAdminToken, path);
  return NextResponse.json(data);
}

const response = async (params: any, adminToken: string, mentorToken: string, superAdminToken: string, path: string) => {
  try {
    let res: any = {};
    switch (path) {
      case 'login':
        res = await UserLogin({ email: params.email, password: params.password });
        if (res.data.user.roleId && res.data.user.roleId === 1) {
          setAdminToken(res.data.token, cookies());
        } else {
          throw new Error('Sai tài khoản hoặc mật khẩu');
        }
        break;
      case 'admin-token':
        res = {
          token: adminToken
        };
        break;
      case 'mentor-token':
        res = {
          token: mentorToken
        };
        break;
      case 'super-admin-token':
        res = {
          token: superAdminToken
        };
        break;
      case 'logout':
        setAdminToken('', cookies());
        setMentorToken('', cookies());
        setSuperAdminToken('', cookies());
        res = {
          responseText: 'Đăng xuất thành công',
          status: 'success'
        };
        break;
      default:
        res = {};
    }
    return res;
  } catch (error: any) {
    return errorSystem(error.message, {});
  }
};
