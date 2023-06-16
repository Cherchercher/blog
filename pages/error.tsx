import React from 'react';

import { useRouter } from 'next/router'

type Props = {
  error?: string;
  errorDescription?: string;
};

const ErrorMessage: React.FC<Props> = ({ errorDescription }) => {
  const router = useRouter()
  return (
    <div className="prose max-w-screen-md mx-auto my-24">
      <h1>{router?.query?.error ?? "No Error Message"}</h1>
      <p>{errorDescription ?? "No description provided. Please contact support cherhuang@goplanatrip.com" }</p>
    </div>
  );
};

export default ErrorMessage;