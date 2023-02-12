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
      apoapsis_km: 368.04,
      arg_of_pericenter: 174.2326,
      customers: ['SpaceX'],
      dragon: {
        capsule: null,
        flight_time_sec: null,
        land_landing: null,
        manifest: null,
        mass_returned_kg: null,
        mass_returned_lbs: null,
        water_landing: null,
      },
      eccentricity: 0.0012995,
      epoch: '2020-06-13T13:46:31.000Z',
      id: '5eb0e4b5b6c3bb0006eeb1e1',
      inclination_deg: 97.4444,
      launch: '5eb87cd9ffd86e000604b32a',
      lifespan_years: 1,
      longitude: null,
      manufacturers: ['SpaceX'],
      mass_kg: 800,
      mass_lbs: 1763.7,
      mean_anomaly: 185.9087,
      mean_motion: 15.69864906,
      name: 'Tintin A & B',
      nationalities: ['United States'],
      norad_ids: [43216, 43217],
      orbit: 'SSO',
      periapsis_km: 350.53,
      period_min: 91.727,
      raan: 176.6734,
      reference_system: 'geocentric',
      regime: 'low-earth',
      reused: false,
      semi_major_axis_km: 6737.42,
      type: 'Satellite',
    });
  });
});
