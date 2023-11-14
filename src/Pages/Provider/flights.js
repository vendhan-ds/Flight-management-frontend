import React, {useEffect, useState} from 'react'
import ProviderDataServices from '../../components/provider/providerFN'
import FlightCard from '../../components/provider/cards';
import {
	Grid,
	Text,
  Center,
  Button,
  Modal,
  Image
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import EditForm from '../../components/provider/editForm';
import { useNavigate } from 'react-router-dom'
import img from "../Assets/not-found.jpg";


function FlightItem(props) {
	return (
		<Grid.Col span={4}>
			<FlightCard data={props.data}/>
		</Grid.Col>
	);
}


function FlightList() {
  const comp = window.sessionStorage.getItem("name")

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

  const navigate = useNavigate();
  function logout(){
    window.sessionStorage.removeItem("name")
    navigate('/');
  }

  return (
    <div>
      <Modal opened={opened} onClose={close}>
        <EditForm company={comp}/>
      </Modal>
        <Center style={{backgroundColor: '#6dd2fd', height: '75px'}}>
          <Text>Welcome {comp}</Text>
          {/* <br/>
          <Text>Dashboard</Text> */}
        </Center>
        <Center mt='md'>
          <Text style={{fontSize: '30'}}>Your Flights</Text>
        </Center>
      <Center mt="lg">
				{flights.length !== 0 ? (
					<Grid>
						{flights.map((flight) => (
							<FlightItem key={flight._ID} data={flight} />
						))}
					</Grid>
				) : (
          <div>
            <Image src={img} h={500} w={500}/>
            <Center>
              <Text >
                Uh Ohhh, There is nothing in your Dashboard
              </Text>
            </Center>
          </div>
				)}
			</Center>
      <Center mt={20}>
        <Button variant="light" onClick={open} mr={20}>Add Flight</Button>
        <Button variant="light" color="red" onClick={logout}>Logout</Button>
      </Center>
    </div>
  )

}

export default FlightList