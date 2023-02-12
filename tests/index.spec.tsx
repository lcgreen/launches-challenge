import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Launches from '../pages';
import LaunchDocument from '@@/api/schema/v5/launchDocument';
import { LaunchesService } from '@@/api/services';

let data = [];
beforeEach(async () => {
  const launches = import('@@/tests/fixtures/launches.json');
  const payloads = import('@@/tests/fixtures/payloads.json');

  const payloadData = (await payloads).body.docs;
  const launchData = (await launches).body.docs;

  const sortedLaunches = launchData.sort((a, b) => a.flight_number - b.flight_number).slice(0, 1);
  data = sortedLaunches.map((doc: LaunchDocument) => LaunchesService.mapLaunchType(doc, payloadData));
});

jest.mock('./../hooks/useLaunches', () => () => ({
  loading: false,
  isError: false,
  data: {
    body: [...data],
  },
}));

describe('Launches', () => {
  it('renders the component', () => {
    const { container } = render(<Launches />);
    expect(container).toMatchSnapshot();
  });

  it('renders the modal when card is clicked', () => {
    render(<Launches />);
    fireEvent.click(screen.getByTestId('card-5eb87cd9ffd86e000604b32a'));
    expect(
      screen.getByRole('heading', {
        name: 'Payload Information for FalconSat',
      })
    ).not.toBeNull();
  });

  it('displays a table displaying the payload information', () => {
    render(<Launches />);
    fireEvent.click(screen.getByTestId('card-5eb87cd9ffd86e000604b32a'));
    expect(
      screen.getByRole('table')
    ).not.toBeNull();
  })
});
