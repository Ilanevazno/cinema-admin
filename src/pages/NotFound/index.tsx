import { ReactElement } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledContainer, StyledIcon } from './styles';

const NotFound = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledIcon />
      <Typography variant="h2" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Запрашиваемая страница не существует или была удалена
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={() => navigate('/')}>
        Вернуться на главную
      </Button>
    </StyledContainer>
  );
};

export default NotFound;
