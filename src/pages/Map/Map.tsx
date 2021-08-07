import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map as MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  Text, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import Helmet from 'react-helmet';

import mapIcon from '../../utils/';
import * as ROUTES from '../../constants/routes';
import { PageMap } from './styles';
import api from '../../api/';

type RegistionProps = {
  namePoint: string;
  latitude: number;
  longitude: number;
  about: string;
  whatsapp: string;
}

const MapHelp: React.FC = () => {
  const [state, setState] = React.useState({
    long: 0,
    lat: 0,
  });
  const [registionPoint, setRegistionPoint] = React.useState<RegistionProps[]>([]);

  React.useEffect(() => {
    api.get('registionPoint').then((response) => {
      setRegistionPoint(response.data);
    });
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

  return (
    <PageMap>
      <Helmet>
        <title>Eu Ajudo | Pontos de vacinção</title>
      </Helmet>
      <MapContainer
        center={[state.lat, state.long]}
        zoom={15.7}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2F5b2t5bGVyIiwiYSI6ImNrcG55N3RnaDBrdnkydm13YTIwdDQ2MXAifQ.mPGFip4w4KhoZSqmUqoY2w'}
        />
        {registionPoint?.map((registion) => {
          return (
            <Marker
              icon={mapIcon}
              position={[registion.latitude, registion.longitude]}
            >
              <Popup minWidth={240} maxHeight={40} className="map-popup" closeButton={false}>
                <Text isTruncated margin={1}>{registion.namePoint}</Text>
                <ModalInformation
                  showModalButtonText="Edit"
                  modalHeader={registion.namePoint}
                  modalBody="Edit Modal"
                />
              </Popup>
            </Marker>
          );
        })};
      </MapContainer>
      <Link to={ROUTES.CREATEPOINT} className="create-vaccination-point">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </PageMap>
  );
};

export default MapHelp;

type Props = {
  showModalButtonText: string;
  modalHeader: string;
  modalBody: string;
};

const ModalInformation: React.FC<Props> = ({ showModalButtonText, modalHeader, modalBody }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen} rightIcon={<FiArrowRight />}>
        {showModalButtonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};