import React, { FC } from 'react';
import { PageErrorProps } from './interfaces';

export const NoMatch: FC<PageErrorProps> = ({ statusCode, message }) => {
  return (
    <div>
      <div>{statusCode}</div>
      <div>{message}</div>
    </div>
  );
};
