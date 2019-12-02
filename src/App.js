import React, { useEffect, useState } from 'react';
import Recipe from './component/Recipe';
import './App.css';
const App = () => {
	const APP_ID = `ae9cacd7`;
	const APP_KEY = `70aef20fca3f8e082a952405036ecafc`;
	const [ recipes, setRecipes ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ query, setQuery ] = useState('chicken');

	useEffect(
		() => {
			getRecipies();
		},
		[ query ]
	);

	const getRecipies = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
		const data = await response.json();
		setRecipes(data.hits);
		console.log(data.hits);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
		console.log(search);
	};
	return (
		<div className="App">
			<form onSubmit={getSearch} className="search-form">
				<input type="text" className="search-bar" value={search} onChange={updateSearch} />
				<button type="submit" className="search-button">
					Search
				</button>
			</form>
			<div className="recipes">
				{recipes.map((recipe) => (
					<Recipe
						key={recipe.recipe.label}
						title={recipe.recipe.label}
						calories={recipe.recipe.calories}
						image={recipe.recipe.image}
						ingredients={recipe.recipe.ingredients}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
