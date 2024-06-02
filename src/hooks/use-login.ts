'use client';
import { apiClientFetch } from 'package/api/api-fetch';
import { UserLoginResponse } from 'package/api/user/login';
import { useEffect, useState } from 'react';

export const Login = async (email: string, password: string) => {
  try {
    const data: UserLoginResponse = await apiClientFetch('login', {
      email,
      password
    });
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

export const AdminToken = () => {
  const [adminToken, setAdminToken] = useState('');
  const getAdminToken = async () => {
    try {
      const res = await apiClientFetch('admin-token', {});
      if (res.status === 'error') {
        throw new Error('Không thể đăng xuất');
      }
      setAdminToken(res.token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getAdminToken();
  }, []);
  return {
    adminToken
  };
};

export const SuperAdminToken = () => {
  const [superAdminToken, setSuperAdminToken] = useState('');
  const getAdminToken = async () => {
    try {
      const res = await apiClientFetch('super-admin-token', {});
      if (res.status === 'error') {
        throw new Error('Không thể đăng xuất');
      }
      setSuperAdminToken(res.token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getAdminToken();
  }, []);
  return {
    superAdminToken
  };
};

export const MentorToken = () => {
  const [mentorToken, setMentorToken] = useState('');
  const getMentorToken = async () => {
    try {
      const res = await apiClientFetch('mentor-token', {});
      if (res.status === 'error') {
        throw new Error('Không thể đăng xuất');
      }
      setMentorToken(res.token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getMentorToken();
  }, []);
  return {
    mentorToken
  };
};

export const CustomerToken = () => {
  const [customerToken, setCustomerToken] = useState('');
  const getCustomerToken = async () => {
    try {
      const res = await apiClientFetch('customer-token', {});
      if (res.status === 'error') {
        throw new Error('Không thể lấy token');
      }
      setCustomerToken(res.token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getCustomerToken();
  }, []);
  return {
    customerToken
  };
};
