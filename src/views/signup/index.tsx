import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { loginAction } from '../../application/reducers/loginReducers';
import { registerAction } from '../../application/reducers/registerReducers';
import { useAppDispatch, useAppSelector } from '../../application/store';
import { RegisterModel } from '../../models/redux';

interface SignUpProps extends RouteComponentProps {}

const SignUp: React.FC<SignUpProps> = ({ history }) => {
  const { loading, errors, user } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<RegisterModel>({
    username: '',
    email: '',
    password: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(registerAction(values));
    if (res.meta.requestStatus === 'fulfilled') {
      setTimeout(() => {
        history.push('/chat');
      }, 500);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  useEffect(() => {
    if (user) {
      history.push('/chat');
    }
  }, []);
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center gap-3 items-center bg-appcolor-500">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-3 items-center bg-[#00000076] px-6 py-8 rounded-lg"
        >
          <input
            type={'text'}
            placeholder="Username"
            name="username"
            className="bg-transparent border rounded text-white border-gray-600"
            onChange={(e) => handleChange(e)}
          />
          <input
            type={'email'}
            placeholder="Email"
            name="email"
            className="bg-transparent border rounded text-white border-gray-600"
            onChange={(e) => handleChange(e)}
          />
          <input
            type={'text'}
            placeholder="Password"
            name="password"
            className="bg-transparent border rounded text-white border-gray-600"
            onChange={(e) => handleChange(e)}
          />
          {/* <input
            type={'text'}
            placeholder="Confirm Password"
            name="confirmPassword"
            className="bg-transparent border rounded text-white border-gray-600"
            onChange={(e) => handleChange(e)}
          /> */}
          <button type="submit" className="bg-[#997af0] px-2 py-1 w-full my-3  rounded text-white ">
            {loading ? 'Loading....' : 'Create User'}
          </button>
          <span className="text-white ">
            Already Have an Account{' '}
            <Link to="/login" className="font-bold text-sm text-gray-400">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export { SignUp };
