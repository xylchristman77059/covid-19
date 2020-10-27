import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import GoogleMapReact from 'google-map-react';

import styles from './Chart.module.css';
import googleMapReact from 'google-map-react';

const Chart = ({ data: {confirmed, deaths, recovered}, country }) => {

	// only Class can use state and setState, 
	// so we use hook to set dailyData in the state
	const [dailyData, setDailyData] = useState([]);

	// You can't make useEffect an async function, 
	// so we need to create a new function that can use async
	useEffect(() => {

		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		}
		fetchAPI();
	}, []);

	const lineChart = (
		dailyData
			? (
				<Line
					data={{
						labels: dailyData.map(({ date }) => date),
						datasets: [{
							data: dailyData.map( ({ confirmed }) => confirmed ),
							label: 'Infected',
							borderColor: '#3333ff',
							fill: true,
						},{
							data: dailyData.map( ({ deaths }) => deaths ),
							label: 'Deaths',
							borderColor: 'red',
							backgroundColor: 'rgba(155,0,0,0.5)',
							fill: true,
						}],
				}} /> 
			) : null
	);

	const barChart = (
		confirmed
			? (
				<Bar
					data={{
						labels: ['Infected', 'Recovered', 'Death'],
						datasets: [{
							label: 'People',
							backgroundColor: [
								'rgba(0,0,255,0.5)',
								'rgba(0,255,0,0.5)',
								'rgba(255,0,0,0.5)',
							],
							data: [confirmed.value,recovered.value,deaths.value]
						}]
					}}
					options={{
						legend: { display: false },
						title: { display: true, text: `Current state in ${country}` },
					}} /> 
			) : null
	);


	const googleMap = (
		<div style={{ height: "100vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "AIzaSyDUstnALNSG2iskXfV1XXnHan6bav5liPg"}}
				defaultCenter={{ lat: 20.0000, lng: -100.0000 }}
				defaultZoom={4}
			>
				<div 
					lat={38} 
					lng={-104} 
					style={{color: "red", width: "400px"}}
				>
					WE CAN DO IT !!!
				</div>
			</GoogleMapReact>
		</div>
	);

	
	return (
		<div className={styles.container}>
			{/* {country ? barChart : lineChart} */}
			{country ? barChart : googleMap}
		</div>
	)
}

export default Chart;