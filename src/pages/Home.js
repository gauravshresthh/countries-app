import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';

const Home = () => {
	const [countries, setCountries] = useState([]);
	const [mode, setMode] = useState(true);
	const [toggleButton, setToggleButton] = useState(
		'<i class="fas fa-sun"></i> Light Mode'
	);

	useEffect(() => {
		fetchCountries();
	}, []);

	const fetchCountries = async () => {
		const res = await fetch(`https://restcountries.eu/rest/v2/all`);
		const data = await res.json();
		setCountries(data);
	};

	const toggleDarkMode = () => {
		if (mode) {
			document.documentElement.classList.add('dark');
			setToggleButton('<i class="fas fa-moon"></i> Dark Mode');
			setMode(current => (current = !current));
		}

		if (!mode) {
			document.documentElement.classList.remove('dark');
			setToggleButton('<i class="fas fa-sun"></i> Light Mode');
			setMode(current => (current = !current));
		}
	};

	const searchCountry = async query => {
		if (query.length < 3 || query === '') {
			return;
		}
		const res = await fetch(`https://restcountries.eu/rest/v2/name/${query}`);
		const data = await res.json();
		await setCountries(data);
	};

	const handleSearchQuery = e => {
		searchCountry(e.target.value);
	};

	const filterByRegion = async region => {
		if (region === '') return;
		const res = await fetch(
			`https://restcountries.eu/rest/v2/region/${region}`
		);
		const data = await res.json();
		await setCountries(data);
	};

	return (
		<div className="bg-gray-100 text-green-500 dark:bg-gray-800 dark:text-white">
			<div className=" shadow-md py-6  bg-white dark:bg-gray-900 dark:text-white mb-16">
				<div className="flex container px-20">
					<h1 className="font-bold text-xl">Countries App</h1>
					<div className="ml-auto font-medium text-gray-600 dark:text-white">
						<button
							onClick={() => toggleDarkMode()}
							dangerouslySetInnerHTML={{ __html: toggleButton }}></button>
					</div>
				</div>
			</div>
			<div className="flex container mx-auto px-6 md:px-20 mb-16  ">
				<i className="fa fa-search my-auto -mr-9 z-10 pr-2 pl-3 py-5 rounded-md text-gray-400"></i>
				<input
					type="text"
					placeholder="Search for a country..."
					className="pl-10 p-2 shadow-md rounded-md md:w-1/3 dark:bg-gray-700"
					onChange={handleSearchQuery}
				/>
				<select
					className="ml-auto my-2 p-2 shadow-md rounded-md font-medium dark:bg-gray-700"
					onChange={e => {
						filterByRegion(e.target.value);
					}}>
					<option value="">Filter by Region</option>
					<option value="africa">Africa</option>
					<option value="americas">America</option>
					<option value="asia">Asia</option>
					<option value="europe">Europe</option>
					<option value="oceania">Oceania</option>
				</select>
			</div>

			<div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-20">
				{countries.length > 0
					? countries.map((country, index) => (
							<Link to={{ pathname: 'details', state: 'country' }} key={index}>
								<CountryCard
									title={country.name}
									image_url={country.flag}
									population={country.population}
									region={country.region}
									capital={country.capital}
								/>
							</Link>
					  ))
					: 'No countries found with that name'}
			</div>
		</div>
	);
};

export default Home;
