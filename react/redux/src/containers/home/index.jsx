import React, { useState, useEffect } from 'react';
import model from './model';

export default function Home() {
	const [content, setContent] = useState('');

	useEffect(() => {

		model.fetchContent().then(res => {
			setContent(res.data.content);
		})

	}, []);

	return (
		<>
			<h2>Home Page</h2>
			<div>{content}</div>
		</>
	);
}
