// Card.js
import React, { useEffect, useState } from 'react';
import { Card, Text, Paper, Button, Modal, TextInput, SimpleGrid, Rating, Group, Center, Pagination } from '@mantine/core';
import axios from 'axios';

  const Seats = (props) => {
    //let avl = 0;
    const [bg,setbg]=useState({ backgroundColor: "gray" })
    const [avl,setavl]=useState(0)
    useEffect(()=>{
      //console.log("insider",props.index,props.ticket)
      if (props.ticket && (props.ticket.includes(props.index + 1))) {
        console.log("insider",props.index,props.ticket)
        setavl(1)
        setbg( { backgroundColor: "red" });
      }else {
        setavl(0);
      }
      
    },[props.ticket, props.index])
    
  

    function change() {
      
      if (avl === 1) return;
      else if (avl === 0) {
        setavl(2)
        setbg( { backgroundColor: "green" });
        props.onSeatSelect(props.index + 1);
      } else if (avl === 2) {
        setavl(0)
        setbg( { backgroundColor: "gray" });
        props.onSeatDeselect(props.index + 1);
      }
    }

    return (
      <Card style={bg} data-index={props.index + 1} onClick={change}>
        {props.index + 1}
      </Card>
    );
  };


const CardWithModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [avlSeats,setAvlSeats]=useState()
  const [flightId,setFlightId]=useState()
  const [noOfChild, setNoOfChild] = useState(0);
  const [activePage, setPage] = useState(1)
  const [ticket, setTicket] = useState([]);
  const [chk, setChk] = useState(0);
  const [selected,setselected]=useState([])
  
  const handleSeatSelect = (seatNumber) => {
    setselected((selected) => [...selected, seatNumber]);
  };

  const handleSeatDeselect = (seatNumber) => {
    setselected((selected) =>
      selected.filter((item) => item !== seatNumber)
    );
  };


  useEffect(() => {
    const fetchData = async () => {
      setTicket([]);
      var data = {
        id: props.data.data._id,
        date: props.data.dateX,
      };
      console.log("helo",data)
      try {
        const res = await axios.post(
          `http://localhost:5000/customer/flightdetails`,
          data
        );
        console.log(res.data);
        setAvlSeats(res.data.noOfTicketsAvailable);
        setFlightId(res.data._id);
        setTicket(res.data.tickets);
        setChk(1);
        console.log("Fetched flight details", ticket);
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    };

    fetchData();
  }, [props.data.data._id, props.data.dateX]);
  //const [msg,setmsg]=useState()

  console.log("heyyy")
  //console.log(props.data.data)
  const openModal = () => {
    setInputValue(0)
    setNoOfChild(0)
    setselected([])
    setIsOpen(true);
  };

  const closeModal = () => {
    setselected([])
    setIsOpen(false);
  };


  const handleSave = () => {
    
    if(Number(inputValue)===0 || Number(inputValue)>avlSeats || Number(inputValue)!==selected.length || Number(inputValue)<=Number(noOfChild)){
      return
    }
    
    const dets = window.sessionStorage.getItem("custName");
    const dets2 = window.sessionStorage.getItem("custMail");
    const dets3 = window.sessionStorage.getItem("custId");
    var bookData = {
      user: {
        fullName: dets,
        email: dets2,
        phone: 1234567,
      },
      bookings:{
        date:props.data.dateX,
        flightId:flightId,
        noOfTickets:Number(inputValue),
        ticketList:selected,
        noOfChild: Number(noOfChild),
        totalCost: (Number(inputValue)-Number(noOfChild))*Number(props.data.data.price)
      }
    }
    // console.log(bookData)
    axios.post(`http://localhost:5000/customer/dashboard?customerID=${dets3}`,bookData)//update number of tickets left
    console.log(inputValue);
    
    closeModal();
  };

  // useEffect(()=>{
    // var data={
    //   id:props.data.data._id,
    //   date:props.data.dateX
    // }
    // axios.post(`http://localhost:5000/customer/flightdetails`)
  // },[])
  console.log(props.data.data)
  return (
    <Card className='flcard' shadow="xs" padding="md">
      <Center>
      <b>{props.data.data.providerName}</b>
      </Center>
      <Text size="x4">start : {props.data.data.source}</Text>
      <Text size="x4">destn : {props.data.data.destination}</Text>
      <Text size="x4">price : {props.data.data.price}</Text>
      
      
      <Button mt={'sm'} onClick={openModal}>Check and Book</Button>
      <Modal
        title="Booking-Confirmation:"
        size="md"
        opened={isOpen}
        onClose={closeModal}
      >
        <Text>Seats available: {avlSeats}</Text>
        <TextInput
              mt={0}
              label="Number of seats"
              placeholder="Ticket Count"
              onChange={(event) => setInputValue(event.currentTarget.value)}
              radius="md"
            />
        <TextInput
          mt={'sm'}
          label="Number of children"
          placeholder='Ticket cost free for children below age 10'
          onChange={(event) => setNoOfChild(event.currentTarget.value)}
        />
        <Group mt={'sm'}>
            <Text>Total Cost : {(inputValue-noOfChild)*props.data.data.price}</Text>
        </Group>
        <SimpleGrid cols={5} mt={'sm'}>
          {chk &&
            [...Array(Number(props.data.data.capacity))].map((_, rowIndex) => (
              <Seats key={rowIndex} 
              ticket={ticket} 
              onSeatSelect={handleSeatSelect}
              onSeatDeselect={handleSeatDeselect} 
              index={rowIndex} />
            ))}
        </SimpleGrid>
        <Center mt={'sm'}>
            <Button onClick={handleSave} color="blue">Book</Button>
        </Center>
        {(props.data.data.reviews === undefined || props.data.data.reviews.length === 0) && (
          <Center mt={'sm'}>
            No reviews available
          </Center>
        )}      
        {props.data.data.reviews !== undefined && props.data.data.reviews.length !== 0  && (
          <div>
            <Center mt={'sm'} style={{fontSize: 20}}>
              Reviews
            </Center>
            <Card shadow='md'>
              <Center>
                <Rating value={props.data.data.reviews[activePage-1].rating} readOnly />
              </Center>
              <Center>
              {props.data.data.reviews[activePage-1].content}
              </Center>
            </Card>
            <Center>
              <Pagination color='orange' mt={'sm'} value={activePage} onChange={setPage} total={props.data.data.reviews.length} />
            </Center>
        </div>
        )}
        
        </Modal>
    </Card>
  );
};

export default CardWithModal;
