import React from 'react';
import './card.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const NA = "N/A";

const Card = (props: any ) => {
	return (
		<div className='card'>
			{props.role}
			<br />
			{props.company}
			<JobDetailsPopup jobDetails={props}/>
		</div>
	)
}


const JobDetailsPopup: React.FC<any> = ({jobDetails}) => (
  <Popup trigger={<button> Details </button>} position='bottom right'>
    <div>
		Role: {jobDetails.role} <br/>
		Company: {jobDetails.company || NA} <br/>
		Description: {jobDetails.description || NA}<br/>
		Status: {jobDetails.statys || NA}<br/>
	</div>
  </Popup>
);

export default Card;