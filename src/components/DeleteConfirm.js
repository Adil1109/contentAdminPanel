import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const DeleteConfirm = () => {
	const [loading, setLoading] = useState('');
	const [btnDisable, setBtnDisable] = useState(false);
	const [error, setError] = useState('');
	const [ssMessage, setSsMessage] = useState('');

	const { _id } = useParams();

	const auth = useAuth();
	const navigate = useNavigate();

	const handleDelete = async (e) => {
		e.preventDefault();
		setBtnDisable(true);
		setLoading(true);

		const response = await fetch(
			`${process.env.REACT_APP_DOMAIN}/api/posts/delete-post/${_id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': 'Bearer ' + auth.signedIn,
				},
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
				<h2 align='center' className='form-title'>
					Are you sure?
				</h2>

				<form>
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
							style={{ marginRight: '5px' }}
							disabled={btnDisable}
							onClick={() => navigate('/', { replace: true })}>
							Cancel
						</button>
						<button onClick={handleDelete} className='btn'>
							Delete
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeleteConfirm;
