import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import {
  Autocomplete ,
	Grid,
	Text,
  Button,
  Container,
  Center,
  Image
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
//import MyFlightCard from '../../components/provider/cards';
import CardWithModal from '../../components/customer/cards';
import CardWithoutModal from '../../components/customer/myBook.jsx';
import "../../components/customer/myBook.jsx"
import img from "../Assets/not-found.jpg";


function FlightItem(props) {
  console.log("hey dummy")
  console.log(props.date)
  var send={
        data:props.data,
        dateX:props.date
      }
	return (
		<Grid.Col span={4}>
      
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
		<Grid.Col span={4}>
      
			<CardWithoutModal  data={send}/>
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
        <Center style={{backgroundColor: '#6dd2fd', height: '75px'}}>
          <Text size='200%'>Welcome back, <b>{dets}</b></Text>
        </Center>

        <Container >
          
          <Container >
            <Center>
              <Text size='xl'>Your Bookings</Text>
            </Center>
            

            
                {myFlights.length !== 0 ? (
                  <Grid columns={12}  justify="space-around">
                    {myFlights.map((flight,index) => (
                      <BookedItem key={index} data={flight} date={sendDate} />
                    ))}
                  </Grid>
                ) : (
                  <div>
                    <Center>
                    <Image src={img} h={500} w={500}/>
                    </Center>
                    <Center>
                      <Text >
                          Uh Ohhh, You havent booked anything.
                      </Text>
                    </Center>
                  </div>
                )}

            
          </Container>
          <Container style={{marginTop:"5%"}}>
            <Center>
              <Text size='xl'>Buy Tickets</Text>
            </Center>
            <Container style={{marginTop:"1%"}}>
              <form onSubmit={handleFormSubmit}>
                <div style={{display:"flex", marginBottom:"5%"}}>
                 
                  <DateInput style={{marginRight:"7%"}}
                  label="Select a Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  required
                  />

                  { (<Autocomplete style={{marginRight:"7%"}}
                    label="Select a Source"
                    data={srcFlights}
                    value={selectedOption}
                    onChange={ setSelectedOption}
                    required
                  />)}
                  <Button style={{marginTop:"2.6%"}} type="submit">Search</Button>
                </div>
                
              </form>
            </Container>

            <div>
                {cardData.length !== 0 ? (
                  <Grid columns={12} justify="space-around">
                    {cardData.map((flight) => (
                      <FlightItem key={flight._id} data={flight} date={sendDate} />
                    ))}
                  </Grid>
                ) : (
                  <div>
                    <Center>
                    <Image src={img} h={500} w={500}/>
                    </Center>
                    <Center>
                      <Text >
                          Uh Ohhh, No flights available.
                      </Text>
                    </Center>
                  </div>
                )}
                {/* {cardData.map((card, index) => (
                <CardWithModal key={index} data={card} />
                 ))} */}
            </div>

          </Container>
        </Container>
    </div>
  )
}

export default Dashboard