import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
	const { image, title, address, description } = props.meetupData;
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>
			<MeetupDetail image={image} title={title} address={address} description={description} />
		</>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect('DB_URL');
	const db = client.db();

	const meetupsColletion = db.collection('meetups');
	const meetups = await meetupsColletion.find({}, { _id: 1 }).toArray();
	client.close();

	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	const { meetupId } = context.params;
	const client = await MongoClient.connect('DB_URL');
	const db = client.db();

	const meetupsColletion = db.collection('meetups');
	const selectedMeetup = await meetupsColletion.findOne({ _id: ObjectId(meetupId) });
	client.close();
	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetails;
