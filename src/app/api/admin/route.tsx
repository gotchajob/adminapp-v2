
import {
  getStaffToken,
  getExpertToken,
  getAdminToken,
  setStaffToken,
  setExpertToken,
  setAdminToken
} from 'package/cookies/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { errorSystem } from 'package/api/api-fetch';
import { UserLogin } from 'package/api/user/login';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  const params = await req.json();
  const staffToken = await getStaffToken(cookies());
  const expertToken = await getExpertToken(cookies());
  const adminToken = await getAdminToken(cookies());
  const path = searchParams.get('path') as string;
  const data = await response(params, staffToken, expertToken, adminToken, path);
  return NextResponse.json(data);
}

const response = async (params: any, staffToken: string, expertToken: string, adminToken: string, path: string) => {
  try {
    let res: any = {};
    switch (path) {
      case 'login':
        res = await UserLogin({ email: params.email, password: params.password });
        console.log("userlogin:", res);
        if (res.data.roleId && res.data.roleId === 2) {
          setStaffToken(res.data.token, cookies());
        } else if (res.data.roleId && res.data.roleId === 3) {
          setExpertToken(res.data.token, cookies());
        } else if (res.data.roleId && res.data.roleId === 1) {
          setAdminToken(res.data.token, cookies());
        } else {
          throw new Error('Sai tài khoản hoặc mật khẩu');
        }
        break;
      case 'staff-token':
        res = {
          token: staffToken
        };
        break;
      case 'expert-token':
        res = {
          token: expertToken
        };
        break;
      case 'admin-token':
        res = {
          token: adminToken
        };
        break;
      case 'logout':
        setStaffToken('', cookies());
        setExpertToken('', cookies());
        setAdminToken('', cookies());
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
