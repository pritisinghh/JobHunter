import Card from '../cards/card';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Job, organizedJobSectionLayout } from "../kanbanboard/kanbanboard";
import KanbanColumnHeader from "../kanbancolumnheader/kanbanColumnHeader";
import '../kanbanboard/kanban.scss';
import { useState } from 'react';

interface sectionPropsType {
	section: organizedJobSectionLayout;
}

const KanbanColumn = (sectionProps: sectionPropsType) => {
	const section = sectionProps.section as organizedJobSectionLayout;

	const defaultsToExpanded = (section.section === 'WISHLIST' || section.section === 'INTERVIEW' || section.section === 'OFFER');
	const [isExpanded, setIsExpanded] = useState(defaultsToExpanded);

	const handleToggleButtonClick = () => {
		setIsExpanded(!isExpanded);
	}

	const getJobsInColumn = (provided: any) => {
		if (!isExpanded) {
			return (<div className="kanban__section__content"></div>);
		}

		return (
			<div className="kanban__section__content">
                    {
                      section.jobs.map((job: Job, index: number) => (
                        <Draggable
                          key={'j' + job.id}
                          draggableId={'j' + job.id}
                          index={index}
                        >
                          {(provided: any, snapshot: any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? '0.5' : '1'
                              }}
                            >
                              <Card role={job.role} company={job.companyName} status={job.status} description={job.description}/>
                            </div>
                          )}
                        </Draggable>
                      ))
                    }
                    {provided.placeholder}
                  </div>
		);
	}

	return (
		<Droppable key={section.section} droppableId={section.section}>
              {(provided: any) => (
                <div {...provided.droppableProps} className='kanban__section' ref={provided.innerRef}>
                  <div className="kanban__section__title">
                    <KanbanColumnHeader section={section.section} jobCount={section.jobs.length} handleToggleButtonClick={handleToggleButtonClick} isExpanded={isExpanded} />
                  </div>
                  {getJobsInColumn(provided)}
                </div>
              )}
            </Droppable>
	)

}

export default KanbanColumn;