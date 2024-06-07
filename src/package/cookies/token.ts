import { getConfig, setConfig } from './cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const setAdminToken = async (adminToken: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  config.adminToken = adminToken;
  setConfig(config, cookies);
};

export const getAdminToken = async (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  return config.adminToken;
};

export const setStaffToken = async (staffToken: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  config.staffToken = staffToken;
  setConfig(config, cookies);
};

export const getStaffToken = async (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  return config.staffToken;
};

export const setExpertToken = async (expertToken: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  config.expertToken = expertToken;
  setConfig(config, cookies);
};

export const getExpertToken = async (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  return config.expertToken;
};
