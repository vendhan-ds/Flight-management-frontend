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
import { DateInput } from '@mantine/dates';
//import MyFlightCard from '../../components/provider/cards';
import CardWithModal from '../../components/customer/cards';
import CardWithoutModal from '../../components/customer/myBook';



function FlightItem(props) {
  console.log("hey dummy")
  console.log(props.date)
  var send={
        data:props.data,
        dateX:props.date
      }
	return (
		<Grid.Col style={{ maxWidth: 250 }} sm={12} xs={6}>
      
			<CardWithModal data={send}/>
		</Grid.Col>
	);
}


function BookedItem(props) {
  
  var send={
        data:props.data,
        dateX:props.date
      }
      //console.log(send)
	return (
		<Grid.Col style={{ maxWidth: 250 }} sm={12} xs={6}>
      
			<CardWithoutModal data={send}/>
		</Grid.Col>
	);
}



const Dashboard = () => {
    const location = useLocation();
    const dets = window.sessionStorage.getItem("custName");
    const dets2 = window.sessionStorage.getItem("custId");
   
//flight: 
// start, dest , date , number of tickets , price
    const [myFlights,setFlight]=useState([])

    const [ srcFlights,setSrcFlights]=useState([{ label: 'Option 2', value: 'option2' },{ label: 'Option 1', value: 'option1' }])

    
    
    const [selectedDate, setSelectedDate] = useState();
    const [sendDate, setsendDate] = useState();

    const [selectedOption, setSelectedOption] = useState();

    const [chk,setchk]=useState('0')
    
    useEffect(()=>{
      //console.log(srcFlights.length)
      //console.log(typeof(srcFlights))
        let id=Number(dets2)
        axios.get(`http://localhost:5000/customer/dashboard?customerID=${id}`).then(
            (res)=>{
                res=res.data
                setFlight(res.tickets)
                setSrcFlights(res.sourceList)
            }
        )
    },[])

    const [cardData,setcardData]=useState([])

    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log('Selected Date:', selectedDate);
      console.log((selectedDate).getDay())
      console.log((selectedDate).getYear())
      let finalmnth=(selectedDate).getMonth()+1
      let finalDate=`${(selectedDate).getDate()}-${finalmnth}-${(selectedDate).getFullYear()}`

      console.log(finalDate)
      setsendDate(finalDate)
      console.log('Selected Option:', selectedOption);
      console.log("hit seach btn")
          let dataX={source:selectedOption, date:finalDate,
          day:(selectedDate).getDay()}
          axios.post(`http://localhost:5000/customer/search`,dataX).then(
            (res)=>{
              console.log("searched flight")
                res=res.data
                //console.log(res)

                setcardData(res.flights)
                //setSrcFlights([{ label: 'Option 3', value: 'option3' },{ label: 'Option 1', value: 'option1' }])
                
            }
          )
    };
    

  return (
    <div>
        <h1>hello {dets}</h1>
        <br></br>
        <Container>
          
          <Container>
            <Text>Your Bookings</Text>

            <Group position="center">
                {myFlights.length !== 0 ? (
                  <Grid justify="space-around">
                    {myFlights.map((flight,index) => (
                      <BookedItem key={index} data={flight} date={sendDate} />
                    ))}
                  </Grid>
                ) : (
                  <Container>
                    <Text >
                      Uh Ohhh, You havent booked anything.
                    </Text>
                  </Container>
                )}
              </Group>

            
          </Container>
          <Container>
            <Text>Buy tickets</Text>
            <Container>
              <form onSubmit={handleFormSubmit}>
                <DateInput
                  label="Select a Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  required
                />
                { (<Autocomplete
                  label="Select an Option"
                  data={srcFlights}
                  value={selectedOption}
                  onChange={ setSelectedOption}
                  required
                />)}
                <button type="submit">Submit</button>
              </form>
            </Container>

            <Container>

              <Group position="center">
                {cardData.length !== 0 ? (
                  <Grid justify="space-around">
                    {cardData.map((flight) => (
                      <FlightItem key={flight._id} data={flight} date={sendDate} />
                    ))}
                  </Grid>
                ) : (
                  <Container>
                    <Text >
                      Uh Ohhh, No flights available.
                    </Text>
                  </Container>
                )}
              </Group>
                {/* {cardData.map((card, index) => (
                <CardWithModal key={index} data={card} />
                 ))} */}
            </Container>

          </Container>
        </Container>
    </div>
  )
}

export default Dashboard