import './home.css';
import jobradoodleLogo from '../../assets/jobradoodlelogo.png';

const Home = () => {
	return (
		<div className="pageContent">
			<img src={jobradoodleLogo} alt="Jobradoodle Logo" className="jobradoodleOnScreenLogo"/>
			<h1>Welcome to Jobradoodle!</h1>
			<a href="http://localhost:3005/api/auth/login" className="signInWithGoogleButton">Sign in with Google</a>
		</div>
	);
}

export default Home;