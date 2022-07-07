export enum Order {
  ASCEND = 'ascend',
  DESCEND = 'descend',
}

export type DatastoreOrder<Property = string> = {
  isDescending: boolean;
  property: Property;
};
