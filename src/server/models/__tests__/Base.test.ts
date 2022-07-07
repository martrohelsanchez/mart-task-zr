import { giveInfo } from '../../../commons/__fixtures__/giveFixtureFactory';

import datastore from '../../libs/DatastoreClient';

import * as GenericModel from '../../models/GenericModel';
import { findGives } from '../../models/GiveModel';

const genericModelFind = jest
  .spyOn(GenericModel, 'find')
  .mockResolvedValue({ results: [], cursor: '' });

const datastoreGet = jest.spyOn(datastore, 'get').mockImplementation();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('find', () => {
  it('should filter out deleted entities', async () => {
    await findGives();

    expect(genericModelFind.mock.calls[0][0].filters.length).toBe(1);
    expect(genericModelFind.mock.calls[0][0].filters[0]).toEqual({
      name: 'isDeleted',
      op: '=',
      val: false,
    });
  });

  it('should get all entities when filter is undefined', async () => {
    await findGives();

    expect(genericModelFind.mock.calls[0][0].filters.length).toBe(1);
    expect(genericModelFind.mock.calls[0][0].filters[0].name).toBe('isDeleted');

    await findGives({});
  });

  it('should not query anyting when filter is ampty', async () => {
    const { results: testResults1 } = await findGives({});

    expect(testResults1.length).toBe(0);

    const { results: testResults2 } = await findGives({});

    expect(testResults2.length).toBe(0);
  });

  it('should only return an array with one entity when id is present', async () => {
    datastoreGet.mockResolvedValue([giveInfo()] as never);

    const { results } = await findGives({
      id: 'testId',
    });

    expect(results.length).toBe(1);
  });
});
