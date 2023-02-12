import React from 'react';
import { render, screen } from '@testing-library/react';
import CardHeader, { CardHeaderProps } from '.';

const defaultProps: CardHeaderProps = {
  title: 'Title',
  image: 'https://via.placeholder.com/150',
  imageAlt: 'Image Alt',
  imageWidth: 150,
  imageHeight: 150,
  utcDate: '2021-08-01T00:00:00.000Z',
  status: 'success',
};

describe('CardHeader', () => {
  it('renders the component', async () => {
    const { container } = render(<CardHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the title', async () => {
    render(<CardHeader {...defaultProps} />);
    expect(screen.getByText('Title')).not.toBeNull();
  });

  it('renders the image', async () => {
    render(<CardHeader {...defaultProps} />);
    expect(screen.getByAltText('Image Alt')).not.toBeNull();
  });

  it('renders the date', async () => {
    render(<CardHeader {...defaultProps} />);
    expect(screen.getByText('Sun Aug 01 2021')).not.toBeNull();
  });
});
