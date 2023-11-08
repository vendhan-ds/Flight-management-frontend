import {
	Button,
	Card,
	Text,
	Group,
	Modal,
	Avatar
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Details from './details';
import {MdOutlineFlightTakeoff} from 'react-icons/md'

function FlightCard(props) {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
		<Modal.Root
					centered
					opened={opened}
					size="md"
					onClose={close}
					radius="xl"
					transitionProps={{
						transition: 'fade',
						duration: 200,
						timingFunction: 'linear',
					}}
				>
					<Modal.Overlay />
					<Modal.Content>
						<Modal.Header>
							<Modal.Title>
								<Group position="center">
									<Text weight={500} size="md">
										<MdOutlineFlightTakeoff size="30"/> Flight Details
									</Text>
								</Group>
							</Modal.Title>
							<Modal.CloseButton />
						</Modal.Header>
						<Details data={props}/>
					</Modal.Content>
				</Modal.Root>
		<Card shadow="md" padding="lg" radius="xl" withBorder>
			<div style={{display: 'flex'}}>
				<div style={{display: 'flex', flex: '50%', float: 'left'}}>
					<Avatar size="150" src="https://static.vecteezy.com/system/resources/previews/000/623/670/original/airplane-fly-logo-and-symbols-vector-template.jpg" alt="it's me" />
				</div>
				<div style={{display: 'flex', flex: '50%', float: 'right'}}>
					<div mt="md" mb="xs" style={{alignItems: 'center'}}>
						<Text weight={500} size="md">
						{props.data.source}
						</Text>
						<Text weight={500} size="md">
						{props.data.destination}
						</Text>
					
						<Text weight={500} size="md">
						{props.data.price}
						</Text>
					
						<Button
							variant="light"
							color="blue"
							mt="5"
							radius="md"
							size="sm"
							mb="0"
							onClick={open}
							compact={true}
						>
							Show more
						</Button>
					</div>
				</div>
				
			</div>
		
		</Card>
		</>
	);
}

export default FlightCard;
