import React from 'react';
import {
  AiOutlineUserDelete,
  AiFillFileText,
  AiFillPhone,
  AiOutlineTeam,
} from 'react-icons/ai';
import { GrWaypoint, GrInfo } from 'react-icons/gr';
import {
  Box,
  FormControl, FormLabel, Button, Alert, Text, SimpleGrid, Icon,
} from '@chakra-ui/react';
import { LeafletMouseEvent } from 'leaflet';
import swal from 'sweetalert';
import { Map as MapContainer, Marker, TileLayer } from 'react-leaflet';
import Input from '../../../components/Input/';
import mapIcon from '../../../utils/';

const ContactForm: React.FC = () => {
  const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 });
  const [state, setState] = React.useState({
    long: 0,
    lat: 0,
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((posstion) => {
      setState({
        long: posstion.coords.longitude,
        lat: posstion.coords.latitude,
      });
    }, (error) => {
      swal("Ops!", "Precisamos da sua permissão para encontrar sua localização:(", "error");
    }, {
      enableHighAccuracy: true,
      timeout: 60000,
    });
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  return (
    <Box my={8} textAlign="left">
      <MapContainer
        center={[state.lat, state.long]}
        zoom={15.7}
        style={
          { width: '100%', height: 280, borderRadius: 7 }
        }
        onclick={handleMapClick}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2F5b2t5bGVyIiwiYSI6ImNrcG55N3RnaDBrdnkydm13YTIwdDQ2MXAifQ.mPGFip4w4KhoZSqmUqoY2w`}
        />
        <Marker
          icon={mapIcon}
          interactive={false}
          position={[position.latitude, position.longitude]}
        />
      </MapContainer>
      <AlertPoint />
      <SimpleGrid columns={[1, 1, 2]} spacing={2}>
        <FormControl id="nome" mt={1}>
          <FormLabel>Nome:</FormLabel>
          <Input
            type="text"
            placeholder="Insira o seu nome"
            name="name"
            iconLeft={<AiOutlineUserDelete />}
          />
        </FormControl>
        <FormControl id="descricao" mt={1}>
          <FormLabel>Número para contato:</FormLabel>
          <Input
            type="text"
            name="contactNumber"
            placeholder="Número de contato"
            iconLeft={<AiFillPhone />}
          />
        </FormControl>
      </SimpleGrid>
      <FormControl id="email" mt={2}>
        <FormLabel>Nome do local:</FormLabel>
        <Input
          type="text"
          name="pointName"
          placeholder="Insira o seu ponto"
          iconLeft={<AiOutlineTeam />}
        />
      </FormControl>
      <FormControl id="descricao" mt={2}>
        <FormLabel>Descrição:</FormLabel>
        <Input
          type="text"
          name="description"
          placeholder="Insira a sua descrição"
          iconLeft={<AiFillFileText />}
        />
      </FormControl>
      <ButtonSend />
    </Box>
  );
};

export default ContactForm;

const ButtonSend = () => {
  return (
    <Button
      type="submit"
      width="full"
      mt={4}
      outline="none"
      _hover={{ backgroundColor: 'purple.600' }}
      backgroundColor="purple.500"
      leftIcon={<GrWaypoint />}
    >
      Enviar
    </Button>
  );
};

const AlertPoint = () => {
  return (
    <Alert status="info" mt={4} borderRadius={2}>
      <Icon as={GrInfo} />
      <Text paddingLeft={2} color="primary.200" fontWeight="bold">Escolhar um local no mapa</Text>
    </Alert>
  );
};
