import React, { useEffect, useState } from 'react';

import './App.css';
import { ReactComponent as QuotesSVG } from './quotes.svg';
import { ReactComponent as TwitterSVG } from './twitter-logo.svg';

let first = true;
let quoteNum = 0;
let Quotes = [];
let theme = 0;

const COLORS = [
	'#16a085',
	'#27ae60',
	'#2c3e50',
	'#f39c12',
	'#e74c3c',
	'#9b59b6',
	'#FB6964',
	'#342224',
	'#472E32',
	'#BDBB99',
	'#77B1A9',
	'#73A857'
];

const randomNumGen = (upper = 1) => { 
	if (upper < 1) return 0;
	return parseInt(Math.random() * 10000) % upper;
};

function App() {
	
	const [QUOTE, setQuote] = useState('');
	const [AUTHOR, setAuthor] = useState('');
	const [THEME, setTheme] = useState('');

	const tweetURL = "https://twitter.com/intent/tweet?hastage=quotes&text="+QUOTE+" - "+AUTHOR;

	const fetchQuotes = () => {
		if (first) first = false;
		else return;

		const quotesURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

		fetch(quotesURL)
			.then(response => response.json())
			.then(data => {
				Quotes = data.quotes;
				ChangeQuote();
			})
			.catch(err => {
				console.error(err);
			});

	};

	const ChangeQuote = () => {

		let newquote = randomNumGen(Quotes.length);
		while (quoteNum === newquote) newquote = randomNumGen(Quotes.length);
		quoteNum = newquote;

		let newtheme = randomNumGen(COLORS.length);
		while (theme === newtheme) newtheme = randomNumGen(COLORS.length);
		theme = newtheme;

		document.getElementById("text").classList.remove("fade-in-now");
		document.getElementById("author").classList.remove("fade-in-now");

		setTimeout(() => {
		
			document.getElementById("text").classList.add("fade-in-now");
			document.getElementById("author").classList.add("fade-in-now");
		
		}, 1000);

		setTimeout(() => { 
			setQuote(Quotes[quoteNum].quote);
			setAuthor(Quotes[quoteNum].author);
		}, 900);

		setTimeout(() => { 
			setTheme(COLORS[theme]);
		}, 850);
	}

	useEffect(() => {
		fetchQuotes();
	}, []);

	return (
		<div id="wrapper" className='changing' style={{ "--theme-color": THEME }}> 
			<main id="quote-box">
				<span id="main-text">
					<div id="text" className="fade-in">
						<QuotesSVG id="quote-svg" className='SVG' style={{ color: THEME }} /> <span className='changing-color'>{QUOTE}</span>
					</div>
					<div id="author" className="fade-in">
						<span className='changing-color'>{AUTHOR}</span>
					</div>
				</span>
				<div id="buttons">
					<a id="tweet-quote" className='changing' href={tweetURL}> <TwitterSVG className='SVG' /> </a>
					<button id="new-quote" type="button" className='changing' onClick={ ChangeQuote }>Next quote</button>
				</div>
			</main>
		</div>
	);
}

export default App;
