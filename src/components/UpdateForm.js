import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const UpdateForm = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');
	const [thumbnailLink, setThumbnailLink] = useState('');
	const [videoLink, setVideoLink] = useState('');
	const [externelLink, setExternelLink] = useState('');
	const [loading, setLoading] = useState('');
	const [btnDisable, setBtnDisable] = useState(false);
	const [ssMessage, setSsMessage] = useState('');

	const { _id } = useParams();

	const auth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_DOMAIN}/api/posts/get-post/${_id}`
			);
			const dataObj = await response.json();
			const data = await dataObj.data;

			setLoading(false);

			if (!data) {
				setError('Data not received');
			}
			if (!dataObj.success) {
				setError(dataObj.message);
			}
			if (dataObj.success) {
				setTitle(data.title);
				setDescription(data.description);
				setThumbnailLink(data.thumbnailLink);
				setVideoLink(data.videoLink);
				setExternelLink(data.externelLink);
			}
		};
		fetchData();
	}, [_id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setBtnDisable(true);
		setLoading(true);

		const response = await fetch(
			`${process.env.REACT_APP_DOMAIN}/api/posts/update-post/${_id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': 'Bearer ' + auth.signedIn,
				},
				body: JSON.stringify({
					title,
					description,
					thumbnailLink,
					videoLink,
					externelLink,
				}),
			}
		);

		const data = await response.json();

		setBtnDisable(false);
		setLoading(false);
		if (!data) {
			setError('Data not received');
		}
		if (!data.success) {
			setError(data.message);
		}
		if (data.success) {
			setSsMessage(data.message);
			navigate('/', { replace: true });
		}
	};
	return (
		<div className='form-container'>
			<div className='box'>
				<h2 align='center'>Update Post</h2>

				<form>
					<div className='input-box'>
						<label>Title</label>
						<input
							className='input'
							type='text'
							value={title}
							required={true}
							minLength={5}
							maxLength={100}
							onChange={(e) => {
								setTitle(e.target.value);
								setError('');
								setSsMessage('');
							}}
						/>
					</div>
					<div className='input-box'>
						<label>Thumbnail Link</label>
						<input
							className='input'
							type='url'
							required
							minLength={5}
							maxLength={100}
							value={thumbnailLink}
							onChange={(e) => {
								setThumbnailLink(e.target.value);
								setError('');
								setSsMessage('');
							}}
						/>
					</div>

					<div className='input-box'>
						<label>Video Link</label>
						<input
							className='input'
							type='url'
							required
							minLength={5}
							maxLength={100}
							value={videoLink}
							onChange={(e) => {
								setVideoLink(e.target.value);
								setError('');
								setSsMessage('');
							}}
						/>
					</div>

					<div className='input-box'>
						<label>Externel Link</label>
						<input
							className='input'
							type='url'
							value={externelLink}
							minLength={5}
							maxLength={100}
							placeholder='(optional)'
							onChange={(e) => {
								setExternelLink(e.target.value);
								setError('');
								setSsMessage('');
							}}
						/>
					</div>

					<div className='input-box'>
						<label className='label'>Description</label>
						<textarea
							className='input textarea'
							required
							minLength={10}
							maxLength={500}
							type='text'
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
								setError('');
								setSsMessage('');
							}}
						/>
					</div>
					<div className='input-box'>
						{loading ? <Loader /> : null}
						{error === '' ? null : (
							<span style={{ color: 'red' }}>{error}</span>
						)}
						{ssMessage === '' ? null : (
							<span style={{ color: 'green' }}>{ssMessage}</span>
						)}
					</div>
					<div className='input-box'>
						<button
							className='btn'
							disabled={btnDisable}
							onClick={handleSubmit}>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateForm;
