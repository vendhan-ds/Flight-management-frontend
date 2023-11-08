import { TextInput,  Button, Group, Box, Container, Text } from '@mantine/core';
import { useState } from 'react';
import ProviderDataServices from "./providerFN.js"

function EditForm(props) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [mon, setMon] = useState('');
  const [tue, setTue] = useState('');
  const [wed, setWed] = useState('');
  const [thur, setThur] = useState('');
  const [fri, setFri] = useState('');
  const [sat, setSat] = useState('');
  const [sun, setSun] = useState('');

    

  function addFlight(){
    const header = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = {
      "providerName": props.company,
      "flightId": 0,
      "source": source,
      "destination": destination,
      "capacity": capacity,
      "price": price,
      "day": {
        "mon": mon,
        "tue": tue,
        "wed": wed,
        "thur": thur,
        "fri": fri,
        "sat": sat,
        "sun": sun
      }
    }
    ProviderDataServices.addFlight(header,body,props.company)
    // console.log(details)

  }

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={addFlight}>
        <TextInput
          label="source"
          placeholder="Source City"
          onChange={(event) => setSource(event.currentTarget.value)}
        />
        <TextInput
          label="destination"
          placeholder="Destination City"
          onChange={(event) => setDestination(event.currentTarget.value)}
        />
        <TextInput
          label="capacity"
          placeholder="Flight Capacity"
          onChange={(event) => setCapacity(event.currentTarget.value)}
        />
        <TextInput
          label="price"
          placeholder="Price"
          onChange={(event) => setPrice(event.currentTarget.value)}
        />
        <Text> Timings </Text>
        <Container>
          <TextInput
            label="Monday"
            placeholder="Monday"
            onChange={(event) => setMon(event.currentTarget.value)}
          />
          <TextInput
            label="Tuesday"
            placeholder="Tuesday"
          onChange={(event) => setTue(event.currentTarget.value)}
          />
          <TextInput
            label="Wednesday"
            placeholder="Wednesday"
            onChange={(event) => setWed(event.currentTarget.value)}
          />
          <TextInput
            label="Thursday"
            placeholder="Thursday"
            onChange={(event) => setThur(event.currentTarget.value)}
          />
          <TextInput
            label="Friday"
            placeholder="Friday"
            onChange={(event) => setFri(event.currentTarget.value)}
          />
          <TextInput
            label="Saturday"
            placeholder="Saturday"
            onChange={(event) => setSat(event.currentTarget.value)}
          />
          <TextInput
            label="Sunday"
            placeholder="Sunday"
            onChange={(event) => setSun(event.currentTarget.value)}

          />
        </Container>
        

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default EditForm;