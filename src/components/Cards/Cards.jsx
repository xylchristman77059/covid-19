import React from 'react';
import CountUp from 'react-countup';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import cx from 'classnames';
import styles from './Cards.module.css';

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate} }) => {
	if(!confirmed) {
		return 'Loading ...';
	}

	const confirmedValue = confirmed.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const recoveredValue = recovered.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const deathsValue = deaths.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	const recoveredRate = "Recovered (" + ((recovered.value/confirmed.value*100).toFixed(2)) + "%)";
	const deathsRate = "Deaths (" + ((deaths.value/confirmed.value*100).toFixed(2)) + "%)";

	return (
		<div className = {styles.container} >
			<Grid container spacing = {3} justify="center">
				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>Infected</Typography>
						<Typography varaint="h5">
							{confirmedValue}
							{/*}
							<CountUp
								start={0}
								end={confirmed.value}
								duration={100}
								separator=','
							/>
							*/}
						</Typography>
						<Typography color="textSecondary" >
							{new Date(lastUpdate).toDateString()}
						</Typography>
						<Typography varaint="body2">Number of active cases of COVID-19</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>{recoveredRate}</Typography>
						<Typography varaint="h5">
							{recoveredValue}
							{/*
							<CountUp
								start={0}
								end={recovered.value}
								duration={5}
								separator=','
							/>
							*/}
						</Typography>
						<Typography color="textSecondary" >
							{new Date(lastUpdate).toDateString()}
						</Typography>
						<Typography varaint="body2">Number of recoveries from COVID-19</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>{deathsRate}</Typography>
						<Typography varaint="h5">
							{deathsValue}
							{/*
							<CountUp
								start={0}
								end={deaths.value}
								duration={5}
								separator=','
							/>
							*/}
						</Typography>
						<Typography color="textSecondary" >
							{new Date(lastUpdate).toDateString()}
						</Typography>
						<Typography varaint="body2">Number of deaths caused by COVID-19</Typography>
					</CardContent>
				</Grid>
			</Grid>
		</div>
	)
}

export default Cards;