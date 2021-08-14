import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Details = props => {
	const history = useHistory();

	const { state } = useLocation();

	const [toggleButton, setToggleButton] = useState(
		'<i class="fas fa-sun"></i> Light Mode'
	);
	const [mode, setMode] = useState(true);

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
	const goHome = () => {
		history.goBack();
	};

	return (
		<div className="bg-gray-100 text-green-500 dark:bg-gray-800 dark:text-white">
			<div className="shadow-md py-6  bg-white dark:bg-gray-900 dark:text-white mb-16">
				<div className="flex container px-20">
					<h1 className="font-bold text-xl">Countries App</h1>
					<div className="ml-auto font-medium text-gray-600 dark:text-white">
						<button
							onClick={() => toggleDarkMode()}
							dangerouslySetInnerHTML={{ __html: toggleButton }}></button>
					</div>
				</div>
			</div>
			<div className="container  mx-auto px-6 md:px-20 mb-6 ">
				<button
					className="px-8 py-2 bg-white text-green-500 shadow-md rounded-lg dark:bg-gray-700 dark:text-white "
					onClick={() => goHome()}>
					<i className="fas fa-chevron-left "></i>
				</button>
			</div>
			<div className="container flex mx-auto  px-6 md:px-20 p-8 pl-0 pr-0">
				<img src={state.flag} alt={state.name} className="w-1/2 p-8" />
				<div className="p-8 pl-0">
					<h2 className="font-bold text-2xl mb-8">{state.name}</h2>
					<div className="grid grid-cols-2 gap-x-20 gap-y-4">
						<p>
							Native Name :{' '}
							<span className="dark:text-gray-400 text-gray-700 text-sm">
								{state.nativeName}
							</span>
						</p>
						<p>
							Population :{' '}
							<span className="dark:text-gray-400 text-gray-700 text-sm">
								{state.population}
							</span>
						</p>
						<p>
							Region :{' '}
							<span className="dark:text-gray-400 text-gray-700 text-sm">
								{state.region}
							</span>
						</p>
						<p>
							Sub-Region :{' '}
							<span className="dark:text-gray-400 text-gray-700 text-sm">
								{state.subRegion}
							</span>
						</p>
						<p>
							Capital :{' '}
							<span className="dark:text-gray-400 text-gray-700 text-sm">
								{state.capital}
							</span>
						</p>
						<p>
							Top Level Domain :{' '}
							<span className="dark:text-gray-400 text-gray-700 text-sm">
								{state.TopLevelDomain}
							</span>
						</p>
						<p>
							Currencies :{' '}
							<span className="dark:text-gray-400 text-gray-700 text-sm">
								{state.currencies.map(cur => cur.name)}
							</span>
						</p>
						<p>
							Languages :{' '}
							<span className="dark:text-gray-400 text-gray-700 text-sm">
								{state.languages.map(lang => lang.name)}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
