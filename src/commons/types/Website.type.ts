import { DefaultProperties } from './Common.type';

export type Website = {
  projectId: string;
  url: string;
  baselineScan: Scan;
  currentScan: Scan;
} & DefaultProperties;

type Scan = {
  image: string;
  dateCreated: Date;
  dateUpdated: Date;
};
