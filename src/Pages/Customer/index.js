import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import {
  Autocomplete ,
  Card,
	Grid,
	Text,
	Group,
  Button,
  Container,
  Center
} from '@mantine/core';
//import { DateInput } from '@mantine/dates';
//import MyFlightCard from '../../components/provider/cards';

function myFlightItem(prop) {
	return (
    
		<Grid.Col style={{ maxWidth: 250 }} sm={12} xs={6}>
			<Card>
                      <Text>{prop.flight.start}</Text>
                      <Text>{prop.flight.dest}</Text>
                      <Text>{prop.flight.date}</Text>
                      <Text>{prop.flight.NofT}</Text>
                      <Text>{prop.flight.price}</Text>
                    </Card>
		</Grid.Col>
	);
}


const Dashboard = () => {
    const location = useLocation();
    const dets = location.state.deet;
    console.log(dets)
//flight: 
// start, dest , date , number of tickets , price
    const [myFlights,setFlight]=useState([{start:"chennai",dest:"mumbai", date:"", NofT:0, price:3000}])

    const [value, setValue] = useState<Date | null>(null);

    const [srcFlights,setSrcFlights]=useState([])
    
    useEffect(()=>{
        let id=Number(dets.ID)
        axios.get(`http://localhost:5000/customer/dashboard?customerID=${id}`).then(
            (res)=>{
                res=res.data
                setFlight(res)
            }
        )
    },[])

     useEffect(()=>{
        //let id=Number(dets.ID)
        axios.get(`http://localhost:5000/provider/dashboard?company="x"`).then(
            (res)=>{
                res=res.data
                setFlight(res)
                console.log(res)
            }
        )
    },[])

  return (
    <div>
        <h1>hello {dets.name}</h1>
        <br></br>
        <Container>
          <Text>Your Bookings</Text>
          <Container>
            <Group position="center">
				      {myFlights.length !== 0 ? (
					      <Grid justify="space-around">
						      {myFlights.map(flight => (
							      <myFlightItem key={flight.bookingId} data={flight}/>
						      ))}
					      </Grid>
				        ) : (
					    <Container>
						  <Text >
							  You havent booked anything.
						  </Text>
					    </Container>
				      )}
			      </Group> 
            </Container>
{/* 
            <Group position="center">
				{myflights.length !== 0 ? (
					<Grid justify="space-around">
						{flights.map((flight) => (
							<FlightItem key={flight._ID} data={flight} />
						))}
					</Grid>
				) : (
					<Container>
						<Text >
							Uh Ohhh, No flights available now.
						</Text>
					</Container>
				)}
			      </Group> 
 */}


          
          <Container>
            <Text>Buy tickets</Text>
            <Container>
               <Autocomplete
                  label="Your favorite library"
                  placeholder="Pick value or enter anything"
                  data={srcFlights}
              />

                {/* <DateInput
                  value={value}
                  onChange={setValue}
                  label="Date input"
                  placeholder="Date input"
                /> */}


            </Container>
          </Container>
        </Container>
    </div>
  )
}

export default Dashboard