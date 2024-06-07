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

export const StaffToken = () => {
  const [staffToken, setStaffToken] = useState('');
  const getStaffToken = async () => {
    try {
      const res = await apiClientFetch('staff-token', {});
      if (res.status === 'error') {
        throw new Error('Không thể đăng xuất');
      }
      setStaffToken(res.token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getStaffToken();
  }, []);
  return {
    staffToken
  };
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

export const ExpertToken = () => {
  const [expertToken, setExpertToken] = useState('');
  const getExpertToken = async () => {
    try {
      const res = await apiClientFetch('expert-token', {});
      if (res.status === 'error') {
        throw new Error('Không thể đăng xuất');
      }
      setExpertToken(res.token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getExpertToken();
  }, []);
  return {
    expertToken
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
