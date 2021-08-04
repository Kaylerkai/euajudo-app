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
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input/';
import mapIcon from '../../../utils/';
import api from '../../../api/';

const ContactForm: React.FC = () => {
  const history = useHistory();
  const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 });
  // const [state, setState] = React.useState({ long: 0, lat: 0, });
  const [about, setAbout] = React.useState('');
  const [whatsapp, setWhatsapp] = React.useState('');
  const [namePoint, setNamePoint] = React.useState('');
  const [responsible, setResponsible] = React.useState('');

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // console.log('event');
    const { latitude, longitude } = position;
    const data = new FormData();
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('namePoint', namePoint);
    data.append('about', about);
    data.append('whatsapp', whatsapp);
    data.append('responsible', responsible);
    console.log(data);
    try {
      await api.post('/', data);
      swal("Ops!", "Deu certo (:", "success");
    } catch (error) {
      swal("Ops!", "Ocorreu algum erro com nossa api :(", "error");
    } finally {
      setTimeout(() => {
        history.push('/app');
      }, 4000);
    };
  };

  const [userPosition, setUserPosition] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  navigator.geolocation.getCurrentPosition((position) => {
    setUserPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });

  // React.useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((posstion) => {
  //     setState({
  //       long: posstion.coords.longitude,
  //       lat: posstion.coords.latitude,
  //     });
  //   }, (error) => {
  //     swal("Ops!", "Precisamos da sua permissão para encontrar sua localização:(", "error");
  //   }, {
  //     enableHighAccuracy: true,
  //     timeout: 60000,
  //   });
  // }, []);

  return (
    <Box my={8} textAlign="left" onSubmit={handleSubmit} as="form">
      <MapContainer
        center={[userPosition.latitude, userPosition.longitude]}
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
            name="responsible"
            iconLeft={<AiOutlineUserDelete />}
            onChange={(e) => setResponsible(e.target.value)}
          />
        </FormControl>
        <FormControl id="descricao" mt={1}>
          <FormLabel>Número para contato:</FormLabel>
          <Input
            type="text"
            name="whatsapp"
            placeholder="Número de contato"
            onChange={(e) => setWhatsapp(e.target.value)}
            iconLeft={<AiFillPhone />}
          />
        </FormControl>
      </SimpleGrid>
      <FormControl id="pointName" mt={2}>
        <FormLabel>Nome do local:</FormLabel>
        <Input
          type="text"
          name="pointName"
          placeholder="Insira o seu ponto"
          iconLeft={<AiOutlineTeam />}
          onChange={(e) => setNamePoint(e.target.value)}
        />
      </FormControl>
      <FormControl id="descricao" mt={2}>
        <FormLabel>Descrição:</FormLabel>
        <Input
          type="text"
          name="about"
          placeholder="Insira a sua descrição"
          iconLeft={<AiFillFileText />}
          onChange={(e) => setAbout(e.target.value)}
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
