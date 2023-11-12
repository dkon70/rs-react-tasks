import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://dummyjson.com/products/:id', () => {
    return HttpResponse.json({
      id: 1,
      title: 'sup!',
      description: 'testDescription',
      thumbnail: 'http://test.test/test',
      price: 500,
    });
  }),
];
