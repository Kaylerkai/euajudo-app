import React from 'react';
import Helmet from 'react-helmet';
import Lottie from 'react-lottie';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Stack, Button, Center, Text } from '@chakra-ui/react';
import { Container } from './style';
import animationData2 from '../../json/animation/62541-404-error-robot.json';
import * as ROUTES from '../../constants/routes';
import FooterContainer from '../../containers/Footer/';

interface LocationProps {
  location?: any;
  pathname?: any;
}

const PageNotFound: React.FC<LocationProps> = ({ location, pathname }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
  };

  return (
    <React.Fragment key="key">
      <Container>
        <Helmet>
          <title>Eu Ajudo | Ops {location.pathname}</title>
        </Helmet>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
        />
        <Center>
          <Text textAlign="center">A página que você está procurando não existe ou foi removida</Text>
        </Center>

        <Stack direction="row" spacing={4} align="center" mt={3}>
            <Button as="a" href={ROUTES.HOME} colorScheme="teal" variant="solid" color="#000" leftIcon={<AiOutlineArrowRight />}>
              Voltar para Home
            </Button>
        </Stack>
      </Container>
      <FooterContainer />
    </React.Fragment>
  );
};

export default PageNotFound;