// Card.js
import React, { useEffect, useState } from 'react';
import { Card, Text, Paper, Button, Modal, TextInput } from '@mantine/core';
import axios from 'axios';


const CardWithoutModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [avlSeats,setAvlSeats]=useState()
  const [flightId,setflightId]=useState()

  console.log("heyyy")
  //console.log(props.data.data)
//   const openModal = () => {
//     var data={
//       id:props.data.data._id,
//       date:props.data.dateX
//     }
//     //setdate(props.data.dateX)
//     //console.log(data)
//     axios.post(`http://localhost:5000/customer/flightdetails`,data).then((res)=>{
//         console.log(res.data)
//         setAvlSeats(res.data.noOfTicketsAvailable)
//         setflightId(res.data._id)
//     })

//     setIsOpen(true);

//   };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.value);
  };

//   const handleSave = () => {
    
    
//     const dets = window.sessionStorage.getItem("custName");
//     const dets2 = window.sessionStorage.getItem("custMail");
//     const dets3 = window.sessionStorage.getItem("custId");
//     var bookData={
//       user:{
//         fullName:dets,
//         email:dets2,
//         phone:1234567
//       },
//       bookings:{
//         date:props.data.dateX,
//         flightId:flightId,
//         noOfTickets:inputValue
//       }
//     }
//     axios.post(`http://localhost:5000/customer/dashboard?customerID=${dets3}`,bookData)//update number of tickets left
//     console.log(inputValue);
//     closeModal();
//   };

  // useEffect(()=>{
    // var data={
    //   id:props.data.data._id,
    //   date:props.data.dateX
    // }
    // axios.post(`http://localhost:5000/customer/flightdetails`)
  // },[])

  return (
    <Card shadow="xs" padding="md">
      <Text size="x4">provider : {props.data.data.providerName}</Text>
      <Text size="x4">start : {props.data.data.source}</Text>
      <Text size="x4">destn : {props.data.data.destination}</Text>
      <Text size="x4">date : {(props.data.data.date).substring(0,10)}</Text>
      <Text size="x4">price : {props.data.data.cost}</Text>
      
{/*       
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        title="Input Data"
        size="xs"
        opened={isOpen}
        onClose={closeModal}
      >
        <Text>Seats available: {avlSeats}</Text>
        <TextInput
          label="pick your seats"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleSave} color="blue">
          Book
        </Button>
      </Modal> */}
    </Card>
  );
};

export default CardWithoutModal;
