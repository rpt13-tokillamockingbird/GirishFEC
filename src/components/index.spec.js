import React from 'react';
import { shallow } from 'enzyme';

import Index from './index.jsx';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

describe('Review index', () => {
  it('Should render App correctly', () => {
    const comp = shallow(<Index />);
    expect(comp).toMatchSnapshot();
  });
});