// Card.js
import React, {  useState } from 'react';
import { Rating, Card, Text, Button, Modal, TextInput, Group, Center, Pagination } from '@mantine/core';
import axios from 'axios';
import "./cards.css"

const CardWithModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [noOfChild, setNoOfChild] = useState(0);
  const [avlSeats,setAvlSeats]=useState()
  const [flightId,setflightId]=useState()
  const [activePage, setPage] = useState(1)
  //const [msg,setmsg]=useState()

  // console.log(props.data.data.reviews)
  const openModal = () => {
    var data={
      id:props.data.data._id,
      date:props.data.dateX
    }
    //setdate(props.data.dateX)
    //console.log(data)
    axios.post(`http://localhost:5000/customer/flightdetails`,data).then((res)=>{
        console.log(res.data)
        setAvlSeats(res.data.noOfTicketsAvailable)
        setflightId(res.data._id)
    })

    setIsOpen(true);

  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function handleModalClick(){
    setInputValue(0)
    setNoOfChild(0)
    openModal()
  }
  const handleSave = () => {
    
    if(Number(inputValue)===0 || Number(inputValue)>avlSeats || Number(inputValue)<=Number(noOfChild)){
      return
    }
    const dets = window.sessionStorage.getItem("custName");
    const dets2 = window.sessionStorage.getItem("custMail");
    const dets3 = window.sessionStorage.getItem("custId");
    var bookData={
      user:{
        fullName:dets,
        email:dets2,
        phone:1234567
      },
      bookings:{
        date:props.data.dateX,
        flightId:flightId,
        noOfTickets:Number(inputValue),
        noOfChild: Number(noOfChild),
        totalCost: (Number(inputValue)-Number(noOfChild))*Number(props.data.data.price)
      }
    }
    console.log(bookData)
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
  console.log(props.data.data.reviews)
  return (
    <Card className='flcard' shadow="xs" padding="md">
      {/* <Text size="x4">provider : {props.data.data.providerName}</Text> */}
      <Center>
      <b>{props.data.data.providerName}</b>
      </Center>
      <Text size="x4">start : {props.data.data.source}</Text>
      <Text size="x4">destn : {props.data.data.destination}</Text>
      <Text size="x4">price : {props.data.data.price}</Text>
      
      
      <Button mt={'sm'} onClick={handleModalClick}>Check and Book</Button>
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
        <Center>
            <Button onClick={handleSave} color="blue">Book</Button>
        </Center>
        
        {props.data.data.reviews !== undefined  && (
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
        {props.data.data.reviews === undefined && (
          <Center mt={'sm'}>
            No reviews available
          </Center>
        )}
      </Modal>
    </Card>
  );
};

export default CardWithModal;
