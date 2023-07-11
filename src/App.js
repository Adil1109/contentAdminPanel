import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import SigninForm from './components/SigninForm';
import NotFound from './components/NotFound';
import DeleteConfirm from './components/DeleteConfirm';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import PreventSignin from './components/PreventSignin';
import PostForm from './components/PostForm';
import UpdateForm from './components/UpdateForm';
import Search from './components/Search';
import SearchResult from './components/SearchResult';

function App() {
	return (
		<div className='container'>
			<AuthProvider>
				<NavBar />
				<Routes>
					<Route
						path='/'
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path='/signin'
						element={
							<PreventSignin>
								<SigninForm />
							</PreventSignin>
						}
					/>
					<Route
						path='/create-post'
						element={
							<RequireAuth>
								<PostForm />
							</RequireAuth>
						}
					/>
					<Route
						path='/search-post'
						element={
							<RequireAuth>
								<Search />
							</RequireAuth>
						}
					/>
					<Route
						path='/search-results/:term'
						element={
							<RequireAuth>
								<SearchResult />
							</RequireAuth>
						}
					/>
					<Route
						path='/update-post/:_id'
						element={
							<RequireAuth>
								<UpdateForm />
							</RequireAuth>
						}
					/>
					<Route
						path='/delete-post/:_id'
						element={
							<RequireAuth>
								<DeleteConfirm />
							</RequireAuth>
						}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
