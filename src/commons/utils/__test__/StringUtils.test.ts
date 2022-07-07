import * as StringUtils from '../StringUtils';

describe('StringUtils', () => {
  it('should be trim', () => {
    const a: string = StringUtils.toTrimmedString('  test ');

    expect(a).toBe('test');
  });

  it('should be slugify', () => {
    const a: string = StringUtils.slugify('test  ');

    expect(a).toBe('test');
  });
});

describe('generateSearchTagsFromString', () => {
  it.each([
    {
      string: '  Test   String  ',
      expectedSearchTag: ['tes', 'test', 'str', 'stri', 'strin', 'string'],
    },
    {
      string: 'Git',
      expectedSearchTag: ['git'],
    },
    {
      string: 'ab',
      expectedSearchTag: [],
    },
    {
      string: 'a',
      expectedSearchTag: [],
    },
  ])('should generate correct search tags', ({ string, expectedSearchTag }) => {
    const searchTags = StringUtils.generateSearchTagsFromString(string);

    expect([...new Set(searchTags)]).toEqual([...new Set(expectedSearchTag)]);
  });
});

describe('toTitleCase', () => {
  it.each([
    {
      string: '',
      expectedOutput: '',
    },
    {
      string: 'test-test test',
      expectedOutput: 'Test-test Test',
    },
    {
      string: 'tEsTiNg',
      expectedOutput: 'TEsTiNg',
    },
    {
      string: 'a',
      expectedOutput: 'A',
    },
    {
      string: 'test a test',
      expectedOutput: 'Test A Test',
    },
    {
      string: '   test       test  ',
      expectedOutput: 'Test Test',
    },
  ])('should convert to title case', ({ expectedOutput, string }) => {
    const titleCase = StringUtils.toTitleCase(string);

    expect(titleCase).toBe(expectedOutput);
  });
});
