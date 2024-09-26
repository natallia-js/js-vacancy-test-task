import { memo, FC } from 'react';
import { Button, Container } from '@mantine/core';
//import { IconUserCircle, IconLogout } from '@tabler/icons-react';

//import { accountApi } from 'resources/account';

//import { RoutePath } from 'routes';

const UserMainMenuActions: FC = () => {
  //const { mutate: signOut } = accountApi.useSignOut();

  return (
    <Container>
      <Button>1</Button>
      <Button>2</Button>
    </Container>
  );
};

export default memo(UserMainMenuActions);
