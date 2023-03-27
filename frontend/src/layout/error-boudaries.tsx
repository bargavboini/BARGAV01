import React, { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

interface Error {
  status: number;
}
export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  useEffect(() => {
    if ((error as Error).status === 404) {
      navigate('/');
    }
  }, []);
  return <div></div>;
}
