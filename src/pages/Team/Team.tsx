import React from 'react';
import {
  Box, Container, chakra, Text, Heading,
  Stack, SimpleGrid, Avatar,
} from '@chakra-ui/react';
import { AiOutlineTeam } from 'react-icons/ai';
import Helmet from 'react-helmet';
import teamDate from '../../json/team/team.json';
import contributors from '../../json/contributors/contributors.json';
import FooterContainer from '../../containers/Footer/';
import * as ROUTES from '../../constants/routes';
import NavBar from './NavBar/';

type TeamProps = {
  id: number;
  name: string;
  avatar: string;
  cargo: string;
  background: string;
  collaboration?: string;
}

const Team: React.FC<TeamProps> = () => {
  return (

    <React.Fragment key="key">
      <Helmet title="Eu Ajudo | Equipe" />
      <Box mb="60px" as="section">
        <NavBar />
        <Container py="80px" textAlign="center">
          <chakra.h1
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            textStyle="heading"
            mb="5"
            fontWeight="bold"
            fontSize="2rem"
            as="a"
            href={ROUTES.HOME}
          >
            Eu Ajudo
          </chakra.h1>
          <Text mx="auto" fontSize="lg">
            App criado para intermediar pedidos durante isolamento
            social. O projeto 'Eu ajudo' é uma aplicação
            Web realizada para que os usuários colabore com sua comunidade.
          </Text>
        </Container>
      </Box>
      <Box mb="60px" as="section">
        <Container maxWidth="107ch">
          <Stack spacing={8}>
            <Heading size="lg" display="inline-flex">
              Equipe Central
              <AiOutlineTeam />
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} spacing="40px" pt="3">
              {teamDate.map((member) => (
                <Box
                  borderLeftWidth="4px"
                  borderLeftColor="purple.500"
                  padding="7px"
                  borderRadius="4px"
                  key={member.id}
                >
                  <Stack direction="row" spacing={6}>
                    <Avatar
                      size="xl" src={member.avatar}
                      name={member.name}
                      borderColor={member.background}
                      borderWidth={4}
                    />
                    <Stack spacing={3} maxW="320px">
                      <Text fontWeight="bold" fontSize="md">
                        {member.name}
                      </Text>
                      <Text>
                        {member.cargo}
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              ))}
              <Box
                border="4px dashed"
                borderColor="purple.500"
                padding={7}
                borderRadius="4px"
                key="5"
              >
                <Stack direction="row" spacing={6}>
                  <Stack spacing={3} maxW="320px">
                    <Box justifyContent="center" alignItems="center">
                      <Text fontWeight="bold" fontSize="md">
                        Eu Ajudo, venha participar você também!
                      </Text>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </SimpleGrid>
            <Heading size="lg" display="inline-flex">
              Contribuidores
              <AiOutlineTeam />
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} spacing="40px" pt="3">
              {contributors.map((member) => (
                <Box
                  borderLeftWidth="4px"
                  borderLeftColor="purple.500"
                  padding="7px"
                  borderRadius="4px"
                  key={member.id}
                >
                  <Stack direction="row" spacing={6}>
                    <Avatar
                      size="xl" src={member.avatar}
                      name={member.name}
                      borderColor={member.background}
                      borderWidth={4}
                    />
                    <Stack spacing={3} maxW="320px">
                      <Text fontWeight="bold" fontSize="md">
                        {member.name}
                      </Text>
                      <Text>
                        {member.collaboration}
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>
      <FooterContainer />
    </React.Fragment>
  );
};

export default Team;
