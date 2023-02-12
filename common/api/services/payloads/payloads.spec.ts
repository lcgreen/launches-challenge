import PayloadsService from '.';
const json = import('@@/tests/fixtures/payloads.json');

beforeEach(() => {
  fetch['resetMocks']();
});

describe('Payloads Service', () => {
  it('queries the payloads service and returns mapped values', async () => {
    const data = (await json).body.docs;
    fetch['mockResponseOnce'](JSON.stringify(data));

    const mappedData = await PayloadsService.all();
    expect(mappedData[0]).toEqual({
      id: '5eb0e4c6b6c3bb0006eeb21e',
      type: 'Satellite',
    });
  });
});
