import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
	const { image, title, address, description } = props.meetupData;
	return <MeetupDetail image={image} title={title} address={address} description={description} />;
}

export async function getStaticPaths() {
	return {
		fallback: false,
		paths: [
			{
				params: {
					meetupId: 'm1',
				},
			},
			{
				params: {
					meetupId: 'm2',
				},
			},
		],
	};
}

export async function getStaticProps(context) {
	const { meetupId } = context.params;

	return {
		props: {
			meetupData: {
				id: meetupId,
				image: 'https://images.unsplash.com/photo-1546436836-07a91091f160?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80',
				title: 'First Meetup',
				address: 'Some address 5, 12345 Some City',
				description: 'This is a first meetup!',
			},
		},
	};
}

export default MeetupDetails;
