import React from 'react';
import { Jumbotron } from '../components';
import jumboData from '../json/jumbo/jumbo.json';

// import { Container } from './styles';
interface PropsJumbo {
  id: string;
  subTitle: string;
  image: String;
  src?: any; 
  alt: string;
  direction: string;
}
const Container: React.FC<PropsJumbo> = () => {
  return (
    <Jumbotron.Container>
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
          <Jumbotron.Pane>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.Pane>
          <Jumbotron.Pane>
            <Jumbotron.Image src={item.image} alt={item.alt} />
          </Jumbotron.Pane>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  )
}

export default Container;