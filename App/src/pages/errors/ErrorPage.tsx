import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { PageErrorProps } from './interfaces';

export const ErrorPage: FC<PageErrorProps> = ({ statusCode, message, handlePageError }) => {
  const handleBackPage = () => {
    handlePageError(null);
  };
  return (
    <div>
      <div>{statusCode}</div>
      <div>{message}</div>
      <Button onClick={handleBackPage}>Вернуться назад</Button>
    </div>
  );
};
