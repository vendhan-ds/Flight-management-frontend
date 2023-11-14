// Card.js
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Card, Text, Button, Modal, Rating, TextInput } from '@mantine/core';
import axios from 'axios';
import "./mybook.css"

function CardWithoutModal(props) {

  const [opened, { open, close }] = useDisclosure(false);
  const [content, setContent] = useState("")
  const [value, setValue] = useState(0);

  function handleFormSubmit(){
    let details = {
      flightId: props.data.data.flightId,
      custId: window.sessionStorage.getItem("custId"),
      rating: value,
      content: content
    }
    // console.log(details)
    axios.post(`http://localhost:5000/customer/review`,details).then(
      (res)=>{
        console.log("Added review")
        
      }
    )
    close()
  }

  return (
    <div>
      <Modal
        title="Add Review"
        size="md"
        opened={opened}
        onClose={close}
      >
      <Rating value={value} onChange={setValue} />
        <TextInput 
        mt={'sm'}
        onChange={(event) => setContent(event.currentTarget.value)} 
        label="Review"
        placeholder='Add your review here'
        />
        <Button mt={'sm'} onClick={handleFormSubmit}>Submit</Button>
    </Modal>
    <Card shadow="sm" padding="md" className="mybookcard"  radius="md" withBorder>
      
      <Text  fw={650} >{props.data.data.providerName}</Text>
      <div >
        <Text size="x4">Start : {props.data.data.source}</Text>
        <Text size="x4">Destination : {props.data.data.destination}</Text>
      </div>
      
      <Text size="x4">Date : {(props.data.data.date).substring(0,10)}</Text>
      <Text size="x4">Total Number of Tickets: {props.data.data.noOfTickets}</Text>
      <Text size="x4">Total Number of Children: {props.data.data.noOfChildren}</Text>
      <Text size="x4">Total Cost : {props.data.data.cost}</Text>
      <Button mt={'sm'} onClick={open} variant='light'>Add Review</Button>
    </Card>
    </div>
  );
};

export default CardWithoutModal;
