import { ReactElement } from 'react';
import './kanbanColumnHeader.css';
import wishlistIcon from '../../assets/wishlist-kanbanicon.png';
import appliedIcon from '../../assets/applied-kanbanicon.png';
import interviewIcon from '../../assets/interview-kanbanicon.png';
import offerIcon from '../../assets/offer-kanbanicon.png';
import rejectedIcon from '../../assets/rejected-kanbanicon.png';
import configIcon from '../../assets/config-icon.png';

const KanbanColumnHeader = (props: any): ReactElement => {
	const sectionName: string = props.section;

	// dynamically set the icon and its dimensions based on the section name
	let imageToImport;
	let imageWidth, imageHeight = "20px";
	if (sectionName === 'WISHLIST') {
		imageToImport = wishlistIcon;
	} else if (sectionName === 'APPLIED') {
		imageToImport = appliedIcon;
	} else if (sectionName === 'INTERVIEW') {
		imageToImport = interviewIcon;
	} else if (sectionName === 'OFFER') {
		imageToImport = offerIcon;
	} else if (sectionName === 'REJECTED') {
		imageToImport = rejectedIcon;
	}

	return (
		<div className="kanban-column-header flex-column">
			<div className="kanban-column-header-pieces flex">
				<img src={imageToImport} className="flex-item" alt={`${sectionName.toLowerCase()} Icon`} width={imageWidth} height={imageHeight}/>
				<div id="kanban-column-header-info" className="flex-column flex-item-3">
					<p className="flex-item bold">{props.section}</p>
					<p className="flex-item gray">{props.jobCount} JOBS</p>
				</div>
				<img src={configIcon} className="flex-item" alt="Config Icon" width="20px" height="20px"/>
			</div>
			<div className="kanban-column-header-addbutton">
				<button className="addJobButton">+</button>
			</div>
			<div className="kanban-column-header-togglebutton">
				<button className="toggleButton" onClick={() => props.handleToggleButtonClick(sectionName)}>{props.isExpanded ? "Collapse" : "Expand"}</button>
			</div>
			
		</div>
	);
}

export default KanbanColumnHeader;