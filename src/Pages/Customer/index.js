import React from 'react'
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import {
	Grid,
	Text,
	Group,
  Button,
  Container,
  Center
} from '@mantine/core';
//import MyFlightCard from '../../components/provider/cards';


const Dashboard = () => {
    const location = useLocation();
    const dets = location.state.deet;
    console.log(dets)
    useEffect(()=>{
        let id=Number(dets.ID)
        axios.get(`http://localhost:5000/customer/dashboard?customerID=${id}`).then(
            (res)=>{
                res=res.data
            }
        )
    },[])

     useEffect(()=>{
        //let id=Number(dets.ID)
        axios.get(`http://localhost:5000/provider/dashboard?company="x"`).then(
            (res)=>{
                res=res.data
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
			      </Group> */}



          </Container>
          <Container>

          </Container>
        </Container>
    </div>
  )
}

export default Dashboard