import React, { useEffect, useState } from 'react';
import { Card, Text, Button, Modal, TextInput, SimpleGrid } from '@mantine/core';
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
  const [avlSeats, setAvlSeats] = useState();
  const [flightId, setFlightId] = useState();
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

  const openModal = () => {
    setselected([])
    setIsOpen(true);
  };

  const closeModal = () => {
    setselected([])
    setIsOpen(false);
  };

  const handleSave = () => {
    console.log(selected)
    if ((Number(inputValue) === 0 || Number(inputValue) > avlSeats || Number(inputValue)!=selected.length)) {
      return;
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
      bookings: {
        date: props.data.dateX,
        flightId: flightId,
        noOfTickets: Number(inputValue),
        ticketList:selected
      },
    };

    axios.post(
      `http://localhost:5000/customer/dashboard?customerID=${dets3}`,
      bookData
    );
    console.log(inputValue);
    
    closeModal();
  };

  return (
    <Card className="flcard" shadow="xs" padding="md">
      <Text size="x4">provider : {props.data.data.providerName}</Text>
      <Text size="x4">start : {props.data.data.source}</Text>
      <Text size="x4">destn : {props.data.data.destination}</Text>
      <Text size="x4">price : {props.data.data.price}</Text>

      <Button onClick={openModal}>Open Modal</Button>
      <Modal title="" size="xs" opened={isOpen} onClose={closeModal}>
        <Text>Seats available: {avlSeats}</Text>
        <TextInput
          mt={0}
          label="Number of seats"
          placeholder=""
          onChange={(event) => setInputValue(event.currentTarget.value)}
          radius="md"
        />

        <SimpleGrid cols={5}>
          {chk &&
            [...Array(75)].map((_, rowIndex) => (
              <Seats key={rowIndex} 
              ticket={ticket} 
              onSeatSelect={handleSeatSelect}
              onSeatDeselect={handleSeatDeselect} 
              index={rowIndex} />
            ))}
        </SimpleGrid>

        <Button style={{ marginTop: "4px" }} onClick={handleSave} color="blue">
          Book
        </Button>
      </Modal>
    </Card>
  );
};

export default CardWithModal;
