import React, { useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SigninForm = () => {
	const auth = useAuth();

	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [btnDisable, setBtnDisable] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setBtnDisable(true);
		setLoading(true);

		const response = await fetch(
			`${process.env.REACT_APP_DOMAIN}/api/auth/signin`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
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
			auth.signin(data.token);
			navigate('/', { replace: true });
		}
	};
	return (
		<div className='form-container'>
			<div className='box'>
				<h2 align='center' className='form-title'>
					Login
				</h2>

				<form>
					<div className='input-box'>
						<label>Email</label>
						<input
							className='input'
							type='email'
							required={true}
							minLength={5}
							maxLength={100}
							value={email}
							autoComplete='off'
							onChange={(e) => {
								setEmail(e.target.value);
								setError('');
							}}
						/>
					</div>
					<div className='input-box'>
						<label>Password</label>
						<input
							className='input'
							type='password'
							required={true}
							minLength={5}
							maxLength={100}
							value={password}
							autoComplete='off'
							onChange={(e) => {
								setPassword(e.target.value);
								setError('');
							}}
						/>
					</div>
					<div className='input-box'>
						{loading ? <Loader /> : null}
						{error === '' ? null : (
							<span style={{ color: 'red' }}>{error}</span>
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

export default SigninForm;
