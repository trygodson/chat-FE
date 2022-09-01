import React from 'react';

export interface AuthState {
  user: AuthResponse;
  loading: boolean;
  errors: any;
}

export interface AuthResponse {
  token: string;
  email: string;
  username: string;
  permissions: string[];
}

export interface LoginModel {
  email: string;
  password: string;
}
export interface RegisterModel {
  username: string;
  email: string;
  password: string;
}
