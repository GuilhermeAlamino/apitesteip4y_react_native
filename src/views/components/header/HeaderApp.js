import React from 'react';
import { Image } from 'react-native';

const AppHeaderTitle = () => (
  <Image
    source={require('../../../assets/img/logo.png')}
    style={{ width: 150, height: 30 }}
  />
);

export default AppHeaderTitle;
