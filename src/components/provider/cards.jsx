import {
	Button,
	Card,
	Text,
	Group,
} from '@mantine/core';

function FlightCard(props) {
	console.log(props)
	return (
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
						// onClick={open}
						compact={true}
					>
						Show more
					</Button>
					{/* </Button> */}
				</Group>
			</div>
		</Card>
	);
}

export default FlightCard;
