type RouteParams = {
  donorId?: string;
  pageId?: string;
  adminId?: string;
  giveId?: string;
  token?: string;
};

export function replaceRouteParams(
  route: string,
  routeParams: RouteParams
): string {
  let routeWithReplacedParams = route;

  Object.entries(routeParams).forEach(([key, value]) => {
    if (typeof value !== 'string') {
      throw new Error(`${key} is not a string`);
    }

    routeWithReplacedParams = routeWithReplacedParams.replace(
      new RegExp(`:${key}`, 'ig'),
      value
    );
  });

  return routeWithReplacedParams;
}
