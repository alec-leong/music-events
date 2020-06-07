import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client/src/components/App';

describe('App', () => {
  test('has a valid snapshot', () => {
    const component = renderer.create(<App />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
