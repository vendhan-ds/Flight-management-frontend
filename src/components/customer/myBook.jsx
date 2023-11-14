// Card.js
import React, { useEffect, useState } from 'react';
import { Card, Text, Paper, Button, Modal, TextInput } from '@mantine/core';
import axios from 'axios';
import "./mybook.css"

const CardWithoutModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [avlSeats,setAvlSeats]=useState()
  const [flightId,setflightId]=useState()

  console.log("heyyy")
 

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.value);
  };


  return (
    <Card shadow="sm" padding="md" className="mybookcard"  radius="md" withBorder>
      
      <Text  fw={650} >{props.data.data.providerName}</Text>
      <div >
        <Text size="x4">Start : {props.data.data.source}</Text>
        <Text size="x4">Destn : {props.data.data.destination}</Text>
      </div>
      
      <Text size="x4">Date : {(props.data.data.date).substring(0,10)}</Text>
      <Text size="x4">Price : {props.data.data.cost}</Text>
      
      
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
