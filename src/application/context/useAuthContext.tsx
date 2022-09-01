// import React, { useEffect, useReducer } from 'react';
// // import { AuthContextType } from '../../models/redux';
// import { useLocalStorage } from '../../services/useLocalStorage';
// import { AuthReducer } from '../reducers/authreducers';

// const AuthStateContext = React.createContext({});

// const AuthProvider = ({ ...props }) => {
//   const [token, setToken] = useLocalStorage('token', null);

//   const initialState = {
//     token: '' || token,
//   };
//   const [user, dispatch] = useReducer(AuthReducer, initialState);

//   const value = {
//     user,
//     dispatch,
//   };

//   useEffect(() => {
//     setToken(user.token);
//   }, [user]);

//   return <AuthStateContext.Provider value={value} {...props} />;
// };

// function useAuthState() {
//   const context = React.useContext(AuthStateContext);
//   if (context === undefined) {
//     throw new Error('useAuthState must be used within a AuthProvider');
//   }

//   return { ...context };

//   // return {
//   //   user: {
//   //     permission: ['Admin'],
//   //     token: 'kjhdjhbjh',
//   //   },
//   // };
// }

// export { AuthProvider, useAuthState };
export const dhghg = '';
