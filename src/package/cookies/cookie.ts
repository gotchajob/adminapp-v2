import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { CookieConfig } from './types';

export const prepareSetCookie = (name: string, value: string) => {
  const encodedValue = Buffer.from(value).toString('base64');
  return {
    name,
    encodedValue
  };
};

export const parseCookie = (cookie: RequestCookie) => {
  const value = Buffer.from(cookie.value, 'base64').toString('ascii');
  return {
    name: cookie.name,
    value
  };
};

export const setConfig = (config: CookieConfig, cookies: ReadonlyRequestCookies) => {
  const value = JSON.stringify(config);
  const cookie = prepareSetCookie('config', value);
  cookies.set(cookie.name, cookie.encodedValue);
};

export const getConfig = (cookies: ReadonlyRequestCookies) => {
  const cookie = cookies.get('config');
  if (cookie === undefined) {
    const config: CookieConfig = {
      superAdminToken: '',
      mentorToken: '',
      adminToken: ''
    };
    return config;
  } else {
    const config: CookieConfig = JSON.parse(parseCookie(cookie).value);
    return config;
  }
};
