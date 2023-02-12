import LaunchesService from '.';
const json = import('@@/tests/fixtures/launches.json');

beforeEach(() => {
  fetch['resetMocks']();
});

describe('LaunchesService', () => {

  it('queries the launches service and returns mapped values', async () => {
    const data = (await json).body.docs
    fetch['mockResponseOnce'](JSON.stringify(data));
  
    const mappedData = await LaunchesService.all()
    expect(mappedData[0]).toEqual({
      date_utc: '2006-03-24T22:30:00.000Z',
      failures: [{ altitude: null, reason: 'merlin engine failure', time: 33 }],
      flight_number: 1,
      id: '5eb87cd9ffd86e000604b32a',
      image: 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png',
      name: 'FalconSat',
      payload_id: '5eb0e4b5b6c3bb0006eeb1e1',
      serial: '5e9e289df35918033d3b2623',
      success: false,
    });
  })
})
