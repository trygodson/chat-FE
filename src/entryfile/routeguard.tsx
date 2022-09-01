import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../application/store';
import { RouteModel } from '../models';
import { GET_STORAGE_ITEM } from '../shared/utils/storage';

const RouteGuard: React.FC<RouteModel> = (props) => {
  // const { loading, errors, user } = useAppSelector((state) => state.register);
  const user = GET_STORAGE_ITEM('user');
  return user?.token ? (
    <Route path={props.path} component={props.component} />
  ) : (
    <Redirect to={'/'} />
  );
};

export default RouteGuard;
