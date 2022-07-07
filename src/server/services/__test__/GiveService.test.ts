import { giveInfo } from '../../../commons/__fixtures__/giveFixtureFactory';
import { GIVE_STATUS, TAX_DEDUCTIBLE } from '../../../commons/types';
import * as GenericModel from '../../models/GenericModel';
import * as GiveModel from '../../models/GiveModel';
import { getGives, updateGive } from '../../services/GiveService';

const genericModelFind = jest
  .spyOn(GenericModel, 'find')
  .mockResolvedValue({ results: [{}], cursor: '' });
const updateGiveModel = jest
  .spyOn(GiveModel, 'updateGive')
  .mockResolvedValue(giveInfo());

jest.spyOn(GiveModel, 'findGive').mockResolvedValue(giveInfo());

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getGives', () => {
  it('should project donorId when donorId is not one of the filters', async () => {
    await getGives(undefined, {
      limit: 20,
    });

    expect(genericModelFind.mock.calls[0][0].selectVal).toContain('donorId');
  });

  it('should not project donorId when donorId is one of the filters', async () => {
    await getGives(
      {
        donorId: '5634523556345',
      },
      {
        limit: 20,
      }
    );

    expect(genericModelFind.mock.calls[0][0].selectVal).not.toContain(
      'donorId'
    );
  });

  it('should project taxDeductible when taxDeductible is not one of the filters', async () => {
    await getGives(undefined, {
      limit: 20,
    });

    expect(genericModelFind.mock.calls[0][0].selectVal).toContain(
      'taxDeductible'
    );
  });

  it('should not project taxDeductible when taxDeductible is one of the filters', async () => {
    await getGives(
      {
        taxDeductible: TAX_DEDUCTIBLE.NO,
      },
      {
        limit: 20,
      }
    );

    expect(genericModelFind.mock.calls[0][0].selectVal).not.toContain(
      'taxDeductible'
    );
  });

  it('should project status when status is not one of the filters', async () => {
    await getGives(undefined, {
      limit: 20,
    });

    expect(genericModelFind.mock.calls[0][0].selectVal).toContain('status');
  });

  it('should not project status when status is one of the filters', async () => {
    await getGives(
      {
        status: GIVE_STATUS.PROCESSED,
      },
      {
        limit: 20,
      }
    );

    expect(genericModelFind.mock.calls[0][0].selectVal).not.toContain('status');
  });

  it('should set the order property when order is passed', async () => {
    await getGives(undefined, {
      order: {
        property: 'giveDate',
        isDescending: true,
      },
      limit: 20,
    });

    expect(genericModelFind.mock.calls[0][0].orders.length).toBe(1);
    expect(genericModelFind.mock.calls[0][0].orders[0]).toEqual({
      name: 'giveDate',
      sign: '-',
    });
  });

  it('should have a default order of dateCreated', async () => {
    await getGives(undefined, {
      limit: 20,
    });

    expect(genericModelFind.mock.calls[0][0].orders.length).toBe(1);
    expect(genericModelFind.mock.calls[0][0].orders[0].name).toEqual(
      'dateCreated'
    );
  });
});

describe('updateGive', () => {
  it.each([
    {
      dataToUpdate: {
        recipientName: 'recipientName',
        recipientId: '532632534532',
      },
    },
    {
      dataToUpdate: {
        donorName: 'donorName',
        donorId: '634523543542645',
      },
    },
    {
      dataToUpdate: {
        platformName: 'platformName',
        platformId: '634524523645',
      },
    },
  ])(
    'should update searchTags when searchable fields are updated',
    async ({ dataToUpdate }) => {
      await updateGive({
        id: 'testId',
        ...dataToUpdate,
      });

      expect(updateGiveModel.mock.calls[0][0].searchTags).not.toBeUndefined();
    }
  );

  it('should not update searchTags when searchable fields are not updated', async () => {
    await updateGive({
      id: 'testId',
      amount: 10,
    });

    expect(updateGiveModel.mock.calls[0][0].searchTags).toBeUndefined();
  });

  it.each([
    {
      updateData: { recipientName: 'recipient name' },
    },
    {
      updateData: { platformName: 'platform name' },
    },
    {
      updateData: { donorName: 'donor name' },
    },
    {
      updateData: { recipientId: '6436523556433' },
    },
    {
      updateData: { platformId: '753545845634' },
    },
    {
      updateData: { donorId: '643564423' },
    },
  ])(
    'should throw an error when name is updated but the id of the related kind is not updated vice versa',
    async ({ updateData }) => {
      await expect(
        updateGive({
          id: 'testId',
          ...updateData,
        })
      ).rejects.toThrow();
    }
  );
});
