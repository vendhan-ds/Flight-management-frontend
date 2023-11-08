import React from "react";
import { Container, Box, Text,Button, Modal, Center} from '@mantine/core';
import {LiaEdit} from "react-icons/lia"
import {AiOutlineDelete} from "react-icons/ai"
import ProviderDataServices from "./providerFN.js"
import { useDisclosure } from '@mantine/hooks';
import EditForm from "./editForm.jsx";
function Details(props){
    const [opened, { open, close }] = useDisclosure(false);
    const [openedEdit, {open: openEdit, close: closeEdit}] = useDisclosure(false);
    function deleteflt(){
        const data = {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "flightId": props.data.data._id
            }
        } 
        ProviderDataServices.deleteFlight(data,props.data.data.providerName)
    }


    return (
    <Box maw={340} mx="auto">
        <Modal opened={opened} onClose={close} withCloseButton={false}>
            <Center>
                <Text>Do you want to delete the flight</Text>
            </Center>
            <Center>
                <Button size="sm" onClick={deleteflt} mt="md">Yes</Button>
                <Button size="sm" onClick={close} ml="md" mt="md">No</Button>
            </Center>
        </Modal>

        <Modal opened={openedEdit} onClose={closeEdit}>
            <EditForm data={props.data}/>
        </Modal>
        <Container>
        <Text>Provider ID : {props.data.data.providerName}</Text>
        <Text>Flight ID : {props.data.data.flightId}</Text>
        <Text>Starting location : {props.data.data.source}</Text>
        <Text>Destination Address: {props.data.data.destination}</Text>
        <Text>Price : {props.data.data.price}</Text>
        <Text>Timings :</Text>
        <Container>
            <Text>Monday : {props.data.data.day.mon === ""? "-": props.data.data.day.mon}</Text>
            <Text>Tuesday : {props.data.data.day.tue === ""? "-": props.data.data.day.tue}</Text>
            <Text>Wednesday : {props.data.data.day.wed === ""? "-": props.data.data.day.wed}</Text>
            <Text>Thursday : {props.data.data.day.thur === ""? "-": props.data.data.day.thur}</Text>
            <Text>Friday : {props.data.data.day.fri === ""? "-": props.data.data.day.fri}</Text>
            <Text>Saturday : {props.data.data.day.sat === ""? "-": props.data.data.day.sat}</Text>
            <Text>Sunday : {props.data.data.day.sun === ""? "-": props.data.data.day.sun}</Text>
        </Container>
        </Container>
        <Center>
        <Button size="md" variant="light" color="blue" mt="20" mr="30" mb="30" onClick={openEdit}><LiaEdit size={'20'}/></Button>
        <Button size="md" variant="light" color="red" onClick={open} mt="20" mb="30"><AiOutlineDelete size={'20'}/></Button>
        </Center>    
    </Box>
    )
}

export default Details;