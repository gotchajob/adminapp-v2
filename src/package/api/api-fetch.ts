export const apiClientFetch = async (path: string, body?: any): Promise<any> => {
  const res = await fetch('/api/admin?path=' + path, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify(body)
  });
  return await res.json();
};

export const apiServerFetch = async (url: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', body?: any, accessToken?: string): Promise<any> => {
  let headers: any = {
    'Content-type': 'application/json'
  };
  let newBody: any = {};
  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }
  if (body) {
    newBody = { body: JSON.stringify(body) };
  }
  const res = await fetch('https://gcj2.azurewebsites.net' + url, {
    method,
    headers,
    cache: 'no-cache',
    ...newBody
  });
  
  // const res = await fetch('https://2d38-2401-d800-bf1-1b01-d8d8-6195-1994-94a4.ngrok-free.app' + url, {
  //   method,
  //   headers,
  //   cache: 'no-cache',
  //   ...newBody
  // });

  if (res.status !== 200) {
    throw new Error('Backend error');
  }
  return await res.json();
};

export const errorSystem = (error: string, data: any) => {
  return {
    status: 'error',
    responseText: error,
    data
  };
};
