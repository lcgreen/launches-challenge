import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from '.';

describe('CardHeader', () => {
  it('renders the component', async () => {
    const { container } = render(<CardList>{'children'}</CardList>);
    expect(container).toMatchSnapshot();
  });

  it('renders the children', async () => {
    render(<CardList>{'children'}</CardList>);
    expect(screen.getByText('children')).not.toBeNull();
  });
});
