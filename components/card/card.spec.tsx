import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '.';

const defaultProps = {
  header: <div>Header</div>,
  footer: <div>Footer</div>,
}

describe('Card', () => {
  it('renders the component', async () => {
    const {container} = render(<Card {...defaultProps}>{'children'}</Card>);
    expect(container).toMatchSnapshot()
  });

  it('renders the header', async () => {
    render(<Card {...defaultProps}>{'children'}</Card>);
    expect(screen.getByText('Header')).not.toBeNull();
  });

  it('renders the footer', async () => {
    render(<Card {...defaultProps}>{'children'}</Card>);
    expect(screen.getByText('Footer')).not.toBeNull();
  });

  it('renders the children', async () => {
    render(<Card {...defaultProps}>{'children'}</Card>);
    expect(screen.getByText('children')).not.toBeNull();
  });

});