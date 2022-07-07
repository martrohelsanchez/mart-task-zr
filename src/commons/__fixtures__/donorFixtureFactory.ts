import { fixtureFactory } from '../testHelpers/fixtureFactory';
import { Donor } from '../types';

type SensitiveInfo = 'encryptedPassword';
type NotInDb = 'profilePhoto';

const defaultDonorInfo: Omit<Donor, SensitiveInfo | NotInDb> = {
  avatar: 'test.png',
  bio: 'test bio',
  birthday: '2020-12-22 (08:00:00.000) HKT',
  city: 'Middleboro',
  currentSignInAt: new Date('2021-12-11T02:36:48.879Z'),
  currentSignInIp: '999.99.99.999',
  currentYearGoalAmount: 2000,
  dateCreated: new Date('2021-01-11T02:36:48.879Z'),
  dateUpdated: new Date('2021-09-11T02:36:48.879Z'),
  descriptionCurrent: 'RESILIENT',
  descriptionFirst: 'LOVE',
  descriptionPrevious: 'STEADY',
  email: 'test@gmail.com',
  ethnicityOther: 'asian',
  genderOther: undefined,
  giveCount: 3,
  id: '32543265365463342',
  isAlternateEmail: false,
  isAvatarLegacy: true,
  isDeleted: false,
  lastSignInAt: new Date('2021-20-11T02:36:48.879Z'),
  lastSignInIp: '888.88.88.888',
  legacyId: '45',
  movementBgColor: 'choice-1',
  name: 'test name',
  occupation: 'programmer',
  registrationToken: 'kF5T6yh95hZQRxdnDF3j',
  rememberCreatedAt: new Date('2021-08-11T02:36:48.879Z'),
  resetPasswordSentAt: new Date('2021-08-11T02:36:48.879Z'),
  resetPasswordToken: 'fs8dfsda8ghtnvvnnvv884985',
  searchTags: [],
  signInCount: 8,
  state: 'MA',
  urlSafeKey: 'asodifjasodfja5345tgf8sofdjdsf',
  zip: '54784',
};

export const donorInfo = fixtureFactory<Donor>(defaultDonorInfo as Donor);
