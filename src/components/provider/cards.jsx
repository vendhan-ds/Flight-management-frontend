import {
	Button,
	Card,
	Text,
	Group,
	Modal
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
					size="xl"
					onClose={close}
					radius="lg"
					transitionProps={{
						transition: 'fade',
						duration: 450,
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
		<Card shadow="sm" padding="lg" radius="lg" withBorder>
			<div>

				<Group position="center" mt="md" mb="xs">
					<Text weight={500} size="md">
					{props.data.flightId}
					</Text>
					<Text weight={500} size="md">
					{props.data.source}
					</Text>
					<Text weight={500} size="md">
					{props.data.destination}
					</Text>
					<Text weight={500} size="md">
					{props.data.price}
					</Text>
				</Group>

				<Group position="center">
					<Button
						variant="light"
						color="blue"
						mt="0"
						radius="md"
						size="sm"
						mb="0"
						onClick={open}
						compact={true}
					>
						Show more
					</Button>
				</Group>
			</div>
		</Card>
		</>
	);
}

export default FlightCard;
