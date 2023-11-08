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
            <Text>Monday : {props.data.data.day.mon === ""? "Null": props.data.data.day.mon}</Text>
            <Text>Tuesday : {props.data.data.day.tue === ""? "Null": props.data.data.day.tue}</Text>
            <Text>Wednesday : {props.data.data.day.wed === ""? "Null": props.data.data.day.wed}</Text>
            <Text>Thursday : {props.data.data.day.thur === ""? "Null": props.data.data.day.thur}</Text>
            <Text>Friday : {props.data.data.day.fri === ""? "Null": props.data.data.day.fri}</Text>
            <Text>Saturday : {props.data.data.day.sat === ""? "Null": props.data.data.day.sat}</Text>
            <Text>Sunday : {props.data.data.day.sun === ""? "Null": props.data.data.day.sun}</Text>
        </Container>
        </Container>
        <Button size="md" rightSection={<LiaEdit/>} variant="light" color="blue" mt="20" mr="30" onClick={openEdit}>Edit</Button>
        <Button size="md" rightSection={<AiOutlineDelete/>} variant="light" color="red" onClick={open}>Delete</Button>
    </Box>
    )
}

export default Details;