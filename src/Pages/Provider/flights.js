import React, {useEffect, useState} from 'react'
import ProviderDataServices from '../../components/provider/providerFN'
import FlightCard from '../../components/provider/cards';
import {
	Grid,
	Text,
	Group,
  Button,
  Container,
  Center
} from '@mantine/core';


function FlightItem(props) {
	return (
		<Grid.Col style={{ maxWidth: 250 }} sm={12} xs={6}>
			<FlightCard data={props.data}/>
		</Grid.Col>
	);
}


function FlightList(props) {

  const [flights,setFlights] = useState([])

  useEffect(() => {
    console.log("hello")
    retriveFlights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function retriveFlights() {
    ProviderDataServices.getFlights(props.company)
    .then(response => {
      console.log(response.data)
      setFlights(response.data.flights)
      console.log(flights)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <div>

			<Center><Text>Dashboard</Text></Center>
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
    </div>
  )

}

export default FlightList