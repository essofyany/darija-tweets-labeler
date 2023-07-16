/** @format */

import { useState } from 'react';

function classifier() {
	const [input, setInput] = useState('');
	const [mood, setMood] = useState(0);

	async function handleSubmit(e) {
		e.preventDefault();
		const res = await fetch('/api/analyse', { body: input, method: 'POST' });
		// const polarity = await res.json();
		const polarity = Math.floor(Math.random() * 6) - 2;
		setMood(polarity);
		console.log(polarity);
	}

	return (
		<section className='classifier'>
			<form className='classifier-form' onSubmit={handleSubmit}>
				<ul className='classifier-mood'>
					<li>
						<img src='./neg-2.png' style={{ opacity: mood < -2 && '1' }} />
					</li>
					<li>
						<img
							src='./neg-1.png'
							style={{ opacity: mood < 0 && mood >= -2 && '1' }}
						/>
					</li>
					<li>
						<img src='./neut-0.png' style={{ opacity: mood === 0 && '1' }} />
					</li>
					<li>
						<img
							src='./pos-1.png'
							style={{ opacity: mood > 0 && mood <= 2 && '1' }}
						/>
					</li>
					<li>
						<img src='./pos-2.png' style={{ opacity: mood > 2 && '1' }} />
					</li>
				</ul>
				<textarea
					className='classifier-input'
					type='text'
					placeholder='Enter a darija text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type='submit' className='classifier-btn'>
					Analyse
				</button>
			</form>
			<style jsx>{`
				.classifier {
					min-height: 80vh;
					width: 100%;
				}
				.classifier-form {
					max-width: 100%;
					margin: 0 auto;
					min-height: 80vh;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}
				.classifier-mood {
					width: 100%;
					padding: 0;
					display: felx;
					align-items: center;
					justify-content: center;
				}
				.classifier-mood li {
					list-style: none;
					width: 60px;
					margin: 0 5px;
				}
				.classifier-mood li img {
					width: 100%;
					opacity: 0.2;
					cursor: pointer;
				}
				.classifier-mood li img:hover {
					width: 100%;
					opacity: 1;
					transition: 1s ease-in-out;
				}

				.classifier-input {
					width: 90%;
					height: 200px;
					direction: rtl;
					margin: 10px 0;
					padding: 5px;
				}
				.classifier-btn {
					background-color: #222;
					color: white;
				}
			`}</style>
		</section>
	);
}

export default classifier;
