import './kanban.scss';
import { ReactElement } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import { setJobStatus } from '../../api/jobs';
import KanbanColumn from '../kanbancolumn/kanbancolumn';

export interface organizedJobSectionLayout {
  section: string,
  jobs: any[]
}

export interface Job {
	id: string,
	requisitionId: string,
  companyName: string,
	role: string,
	description: string,
	status: string,
	createdAt: string,
	updatedAt: string,
}

const organizeJobs = (jobs: any): organizedJobSectionLayout[] => {
  const organizedJobs: organizedJobSectionLayout[] = [
    {
      section: 'WISHLIST',
      jobs: [],
    },
    {
      section: 'APPLIED',
      jobs: [],
    },
    {
      section: 'INTERVIEW',
      jobs: [],
    },
    {
      section: 'OFFER',
      jobs: [],
    },
    {
      section: 'REJECTED',
      jobs: [],
    },
  ];

  jobs.props.forEach((jobElement: any) => {
    if (jobElement.job.status === 'WISHLIST') {
      organizedJobs[0].jobs.push(jobElement.job);
    } else if (jobElement.job.status === 'APPLIED') {
      organizedJobs[1].jobs.push(jobElement.job);
    } else if (jobElement.job.status === 'INTERVIEW') {
      organizedJobs[2].jobs.push(jobElement.job);
    } else if (jobElement.job.status === 'OFFER') {
      organizedJobs[3].jobs.push(jobElement.job);
    } else if (jobElement.job.status === 'NO_OFFER') {
      organizedJobs[4].jobs.push(jobElement.job);
    }
  });

  return organizedJobs;
};
const k=organizeJobs({props: []});
export const applyJobLen=k[1].jobs.length;
export const interviewJobLen=k[2].jobs.length;
export const offerJobLen=k[3].jobs.length;

const KanbanBoard = (props: any): ReactElement => {
  const [data, setData] = useState(organizeJobs(props));

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e: any) => e.section === source.droppableId);
      const destinationColIndex = data.findIndex((e: any) => e.section === destination.droppableId);

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.jobs];
      const destinationTask = [...destinationCol.jobs];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].jobs = sourceTask;
      data[destinationColIndex].jobs = destinationTask;

      // update job status 
      removed.status = destination.droppableId === 'REJECTED' ? 'NO_OFFER' : destination.droppableId;

      setData(data);

      // backend call to update job status
      setJobStatus(removed.id, removed.status);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {
          data.map((section: organizedJobSectionLayout) => (
            <KanbanColumn key={section.section} section={section}/>
          ))
        }
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard;