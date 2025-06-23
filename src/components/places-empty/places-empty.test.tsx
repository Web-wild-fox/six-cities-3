import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import PlacesEmpty from './places-empty';

describe('Component: Places Empty', () => {
  it('should render correctly', () => {
    const props = 'City';
    const expectedText = /No places/i;
    const expextedPropsText = /City/i;

    render(
      <PlacesEmpty
        cityName={props}
      />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expextedPropsText)).toBeInTheDocument();
  });
});
