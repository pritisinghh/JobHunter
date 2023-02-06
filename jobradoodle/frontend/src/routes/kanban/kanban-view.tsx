import { ReactElement } from "react";
import { useLoaderData } from "react-router-dom";
import { getJobsOnBoard } from "../../api/jobs";
import KanbanBoard from "../../components/kanbanboard/kanbanboard";
import './kanban-view.css';

export const loader = async (params: any) => {
	const boards = await getJobsOnBoard(params.params.boardId);
	return { boards };
};

const KanbanView = (): ReactElement => {
	const { boards }: any = useLoaderData();
	const data = boards.data;
	const boardId = (data && data.length !== 0 ? data[0].jobBoardId : -1);
	return (
		<KanbanBoard key={boardId} props={data} />
	);
}

export default KanbanView;