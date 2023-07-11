import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import capitalizeFirstLetter from './Capitalize';

const Home = () => {
	const [page, setPage] = useState(1);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [end, setEnd] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_DOMAIN}/api/posts/get-posts/?page=${page}`
			);
			const dataObj = await response.json();
			const data = await dataObj.data;
			setLoading(false);

			if (!data) {
				setError('Data not received');
			}
			if (data.length < 1) {
				setEnd(true);
			}
			if (!dataObj.success) {
				setError(data.message);
			}

			setPosts((prev) => [...prev, ...data]);
		};
		fetchData();
	}, [page]);

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >=
			document.documentElement.scrollHeight
		) {
			if (!end) {
				setPage((prev) => prev + 1);
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	return (
		<div align='center' className='home-container'>
			{posts.map((post) => (
				<div className='card' key={post._id}>
					<img className='card-img' src={post.thumbnailLink} alt={post.title} />
					<h3 className='card-title'>{capitalizeFirstLetter(post.title)}</h3>
					<div className='btn-container'>
						<button
							onClick={() => navigate(`/update-post/${post._id}`)}
							style={{ marginRight: '5px' }}
							className='btn'>
							Edit
						</button>
						<button
							onClick={() => navigate(`/delete-post/${post._id}`)}
							className='btn'>
							Delete
						</button>
					</div>
				</div>
			))}
			{loading && <Loader align='center' />}
			{error && (
				<div>
					<h3 style={{ color: 'red' }} align='center'>
						{error}
					</h3>
				</div>
			)}
			{end && (
				<div>
					<h3
						style={{ color: 'red', paddingTop: '15px' }}
						align='center'>{`No more data!`}</h3>
				</div>
			)}
		</div>
	);
};

export default Home;
