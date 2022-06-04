import Head from 'next/head';
import { MongoClient } from 'mongodb'; //getStaticProps이나 getServerSideProps 에서만 사용되는 경우 클라리언트 측 번들에 포함되지 않음

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
	return (
		<>
			<Head>
				<title>NextJS Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}
export async function getStaticProps() {
	const client = await MongoClient.connect('DB_URL');
	const db = client.db();

	const meetupsColletion = db.collection('meetups');
	const meetups = await meetupsColletion.find().toArray();
	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	};
}

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export default HomePage;
