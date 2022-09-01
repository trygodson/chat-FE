import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppSelector } from '../../application/store';

interface DashboardProps extends RouteComponentProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return <>Dashboard</>;
};

export { Dashboard };
