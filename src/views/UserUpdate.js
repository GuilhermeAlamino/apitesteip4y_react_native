import React from 'react';
import UserFormEdit from './components/form/UserFormEdit';

const UserUpdate = ({ route }) => {
  const { userId } = route.params;

  return (
    <UserFormEdit userId={userId} />
  );
};

export default UserUpdate;
