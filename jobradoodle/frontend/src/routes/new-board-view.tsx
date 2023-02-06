import { LoaderFunctionArgs } from 'react-router-dom';
import { addBoard, getBoards } from '../api/boards';

export const loader = async (params: LoaderFunctionArgs) => {
	await addBoard();

	// get board with highest id
	const boards = await getBoards();
	const newestBoardId = boards.data[boards.data.length-1].id;

	// redirect to kanban view of new board
	window.location.href = `/track/${newestBoardId}/kanban`;
}

// They never actually see this view, but ever going here creates a new board and takes you to it. 
// This will help us, eg. for after OAuth login, it will make a new board for the user to start with.
const NewBoardView = () => {
	return (
		<div>
			<h1>New Board...</h1>
		</div>
	);
}

export default NewBoardView;