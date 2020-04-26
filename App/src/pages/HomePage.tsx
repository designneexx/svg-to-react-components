import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { PageProps } from '../routes/interfaces';

const StyledButton = styled(Button)`
  background-color: ${({ theme: { primaryColor } }) => primaryColor};
  color: ${({ theme: { secondaryColor } }) => secondaryColor};
`;

export const HomePage: FC<PageProps> = observer(({ handlePageError }) => {
  const handleCreateError = () => {
    handlePageError({
      statusCode: 501,
      message: 'Server R.I.P',
    });
  };

  return (
    <div>
      Hello, Home!
      <StyledButton onClick={handleCreateError}>Создать ошибку</StyledButton>
    </div>
  );
});
