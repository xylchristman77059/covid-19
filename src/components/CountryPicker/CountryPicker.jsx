import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../api';

import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {

	const [fetchedCountries, setFetchedCountries] = useState([]);

	// You can't make useEffect an async function, 
	// so we need to create a new function that can use async
	// set it only when the fetching completes
	useEffect(() => {

		const fetchAPI = async () => {
			setFetchedCountries(await fetchCountries());
		}
		fetchAPI();
	}, [setFetchedCountries]);

	return (
		<FormControl className={styles.formControl}>
			<NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
				<option value="">Global</option>
				{
					fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)
				}
			</NativeSelect>
		</FormControl>	
	)
}

export default CountryPicker;