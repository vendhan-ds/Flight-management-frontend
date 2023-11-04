import React, {useEffect, useState} from 'react'
import ProviderDataServices from '../../components/provider/providerFN'
import FlightCard from '../../components/provider/cards';
import {
	Grid,
	Text,
	Group,
  Container,
  Center,
  Button,
  Modal
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import EditForm from '../../components/provider/editForm';
import { useLocation } from 'react-router-dom';


function FlightItem(props) {
	return (
		<Grid.Col style={{ maxWidth: 250 }} sm={12} xs={6}>
			<FlightCard data={props.data}/>
		</Grid.Col>
	);
}


function FlightList() {
  const location = useLocation();
  const comp = location.state.name;
  let props=comp

  const [flights,setFlights] = useState([])
  let prevFlight = flights
  function changeFlight(){
    if(prevFlight !== flights){
      prevFlight = flights
    }
  }
  useEffect(() => {
    retriveFlights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[prevFlight]);

  function retriveFlights() {
    ProviderDataServices.getFlights(comp)
    .then(response => {
      setFlights(response.data.flights)
      changeFlight()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Text>Welcome back {comp}</Text>
      <Modal opened={opened} onClose={close}>
        <EditForm data={props}/>
      </Modal>
			<Center><Text size='xl'>Dashboard</Text></Center>
      <Group position="center">
				{flights.length !== 0 ? (
					<Grid justify="space-around">
						{flights.map((flight) => (
							<FlightItem key={flight._ID} data={flight} />
						))}
					</Grid>
				) : (
					<Container>
						<Text >
							Uh Ohhh, There is nothing in your Dashboard.
						</Text>
					</Container>
				)}
			</Group>
      <Center><Button variant="light" onClick={open}>Add Flight</Button></Center>
    </div>
  )

}

export default FlightList