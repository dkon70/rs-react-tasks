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
  http.get('https://dummyjson.com/products/', () => {
    return HttpResponse.json({
      products: [
        {
          id: 1,
          title: 'sup!',
          description: 'testDescription',
          thumbnail: 'http://test.test/test',
          price: 500,
        },
        {
          id: 2,
          title: 'sup!2',
          description: 'testDescription3',
          thumbnail: 'http://test.test/test2',
          price: 200,
        },
        {
          id: 3,
          title: 'sup!3',
          description: 'testDescription3',
          thumbnail: 'http://test.test/test3',
          price: 300,
        },
      ],
      total: 3,
    });
  }),
];
