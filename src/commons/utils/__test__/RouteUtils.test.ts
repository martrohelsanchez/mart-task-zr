import { faker } from '@faker-js/faker';

import { replaceRouteParams } from '../RouteUtils';

describe('replaceRouteParams', () => {
  const testDonorId = String(faker.datatype.number());
  const testAdminId = String(faker.datatype.number());
  const testPageId = String(faker.datatype.number());

  it.each([
    {
      route: '/:donorId/:aDmInId/:pageId/:DoNoRiD',
      urlParams: {
        donorId: testDonorId,
        adminId: testAdminId,
        pageId: testPageId,
      },
      expected: `/${testDonorId}/${testAdminId}/${testPageId}/${testDonorId}`,
    },
    {
      route: '/dashboard',
      urlParams: {
        pageId: testPageId,
      },
      expected: '/dashboard',
    },
    {
      route: '',
      urlParams: {
        donorId: testDonorId,
      },
      expected: '',
    },
    {
      route: '/donorId',
      urlParams: {
        pageId: testPageId,
      },
      expected: '/donorId',
    },
  ])(
    'should correctly replace all params',
    ({ route, urlParams, expected }) => {
      const newRoute = replaceRouteParams(route, urlParams);

      expect(newRoute).toBe(expected);
    }
  );

  it.each([
    {
      route: undefined,
    },
    {
      route: null,
    },
    {
      route: 0,
    },
    {
      route: true,
    },
  ])('should throw an error when route is not string', ({ route }) => {
    expect(() => {
      replaceRouteParams(route as any, {
        donorId: testDonorId,
        pageId: 'pageTestId',
      });
    }).toThrow();
  });

  it.each([
    {
      urlParams: {
        donorId: undefined,
      },
    },
    {
      urlParams: {
        donorId: null,
      },
    },
    {
      urlParams: {
        donorId: 0,
      },
    },
    {
      urlParams: {
        donorId: true,
      },
    },
  ])('should throw an error when url param is not string', ({ urlParams }) => {
    expect(() => {
      replaceRouteParams('/dashboard/:donorId', urlParams as any);
    }).toThrow();
  });
});
