import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const navigate = useNavigate();

	return (
		<div className='form-container'>
			<div className='box'>
				<h2 align='center' className='form-title'>
					Search
				</h2>

				<form>
					<div className='input-box'>
						<label>Enter text</label>
						<input
							className='input'
							type='text'
							required={true}
							minLength={3}
							maxLength={100}
							value={searchTerm}
							autoComplete='off'
							onChange={(e) => {
								setSearchTerm(e.target.value);
							}}
						/>
					</div>

					<div className='input-box'>
						<button
							className='btn'
							onClick={() => navigate(`/search-results/${searchTerm}`)}>
							Search
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Search;
