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

export const setSuperAdminToken = async (superAdminToken: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  config.superAdminToken = superAdminToken;
  setConfig(config, cookies);
};

export const getSuperAdminToken = async (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  return config.superAdminToken;
};

export const setMentorToken = async (mentorToken: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  config.mentorToken = mentorToken;
  setConfig(config, cookies);
};

export const getMentorToken = async (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies);
  return config.mentorToken;
};
