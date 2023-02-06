import { useEffect, useState } from 'react';
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { getBoards } from '../api/boards';
import './root.css';
import jobradoodleLogo from '../assets/jobradoodlelogo.png';


export const loader = async () => {
	const boards = await getBoards();
	return { boards };
};

const Root = () => {
	const { boards }: any = useLoaderData();
	const data = boards.data;

	const location = useLocation();

	const [locationData, setLocationData] = useState({mode: '', view: '', boardId: -1});

	useEffect(() => {
		if (location.pathname.includes('track')) {
			if (location.pathname.includes('new')) {
				setLocationData({mode: 'track', view: 'new', boardId: -1});
			} else {
				const boardId = parseInt(location.pathname.split('/')[2]);
				const view = location.pathname.split('/')[3];
				setLocationData({mode: 'track', view, boardId: boardId});
			}
		}
	}, [location]);

	const topMenu = () => {
		if (location.pathname === '/home') return;

		// assign title
		let title;
	    if (locationData.mode === 'track' && locationData.view !== 'new') {
			// TODO: figure out why filter used to return just one element but now returns a list of one element. this issue didn't exist before #99
			title = (
				<div className="flex-item">
			 		<h1 id="contentTitle">{data.filter((dataBoard: any) => dataBoard.id === locationData.boardId)[0].title}</h1>
			 	</div>
			);
		}

		// assign main button and search bar
		let mainButtonsDiv;
		if (locationData.mode === 'track' && locationData.view !== 'new') {
			mainButtonsDiv = (
				<div className='main-buttons flex-item'>
					<Link to={`/track/${locationData.boardId}/${locationData.view}`} className="currentTopButton">{locationData.view.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</Link>
					<input></input>
				</div>
			);
		}

		// assign view transition buttons
		let viewButtonsDiv;
		if (locationData.mode === 'track' && locationData.view !== 'new') {
			if (locationData.view === 'kanban') {
				viewButtonsDiv = (
					<div className='view-buttons flex-item'>
						<Link to={`/track/${locationData.boardId}/spreadsheet`} className="someTopButton">Spreadsheet</Link>
						<Link to={`/tasks`} className="someTopButton">Tasks</Link>
						<Link to={`/metrics`} className="someTopButton">Metrics</Link>
					</div>
				);
			} else if (locationData.view === 'spreadsheet') {
				viewButtonsDiv = (
					<div className='view-buttons flex-item'>
						<Link to={`/track/${locationData.boardId}/kanban`} className="someTopButton">Kanban</Link>
						<Link to={`/tasks`} className="someTopButton">Tasks</Link>
						<Link to={`/metrics`} className="someTopButton">Metrics</Link>
					</div>
				);
			}
			
		}
		
		return (
			<nav id="topMenu" className="flex">
				{title}
				{mainButtonsDiv}
				{viewButtonsDiv}
			</nav>
		);
	}

	const handleReadMail = () => {
		alert('read mail');
	}

	const leftMenu = () => {
		if (location.pathname === '/home') return;

		return (
			<div id="leftMenu">
				<div id="titleandlogo" className="flex">
					<img src={jobradoodleLogo} id="jobradoodleLogo" className="flex-item" alt="Jobradoodle Logo" width="62px" height="62px" />
					<h1 id="jobradoodleTitle" className="flex-item-3">Jobradoodle</h1>
				</div>
				<div id="leftMenuContent">
					<div id="readMailButtonDiv">
						<button className="readMailButton" onClick={handleReadMail}>Read Mail</button>
					</div>
					<div id="findJobListings">
						<h2>FIND JOB LISTINGS</h2>
						<ul className='nav-links'>
							<li>
								<Link to="/find/dashboard">Dashboard</Link>
							</li>
							<li>
								<Link to="/find/recently-viewed">Recently Viewed</Link>
							</li>
							<li>
								<Link to="/find/preferences">Update Preferences</Link>
							</li>
							<li>
								<Link to="/find/track">Job Market Trends</Link>
							</li>
						</ul>
					</div>
					<div id="trackMySearch">
						<h2>TRACK MY SEARCH</h2>
						<ul>
							{data.map((board: any) => (
								<li key={board.id} className={board.id === locationData.boardId ? 'activeBoardButton' : 'boardButton'}>
									<Link to={`track/${board.id}/kanban`}>{board.title}</Link>
								</li>
							))}
							<li>
								<Link to="/track/new">Start New Search</Link>
							</li>
						</ul>
					</div>
					<div id="manageMyDocuments">
						<h2>MANAGE MY DOCUMENTS</h2>
						<ul className='nav-links'>
							<li>
								<Link to="/documents/resumes">My Resumes</Link>
							</li>
							<li>
								<Link to="/documents/resumemaker">Make New Resume</Link>
							</li>
							<li>
								<Link to="/documents/details">Update My Details</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

	if (location.pathname === '/home') {
		return <Outlet />;
	}
	return (
		<>
			{leftMenu()}
			{topMenu()}
			<div id='detail'>
				<Outlet />
			</div>
		</>
	);

}

export default Root;