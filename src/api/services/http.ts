import instance from '../instance';
export const http = {
  get: (url: string, params: any = undefined || null, headers?: string) => {
    return instance({
      method: 'GET',
      url,
      data: params || undefined,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      transformResponse: [data => JSON.parse(data)],
    });
  },
};
