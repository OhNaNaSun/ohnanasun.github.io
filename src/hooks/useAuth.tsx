/* eslint-disable */
import * as React from 'react';
import { useEffect, useContext } from 'react';
import axios from 'axios';

const authContext = React.createContext(null);
export function useProvideAuth() {
  const [authed, setAuthed] = React.useState(false);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true });
      if (res.data.name) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    })();
  }, []);
  const login = async (data: { email: string; password: string }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, data, { withCredentials: true });
    if (res.data.message === 'success') {
      setAuthed(true);
    }
  };
  const signin = async (data: { email: string; password: string }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, data, { withCredentials: true });
    if (res.data) {
      setAuthed(true);
    }
  };
  const logout = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, null, { withCredentials: true });
    if (res.data.message === 'success') {
      setAuthed(false);
    }
  };
  return {
    authed,
    login,
    logout,
    signin,
  };
}
export const useAuth = () => {
  return useContext(authContext);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
