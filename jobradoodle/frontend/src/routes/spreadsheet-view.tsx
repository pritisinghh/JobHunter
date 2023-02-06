import { useLoaderData } from "react-router-dom";
import { getJobsOnBoard } from "../api/jobs";
import SpreadSheet from "../components/spreadsheet/SpreadSheet";
import './spreadsheet-view.css';


export const loader = async (params: any) => {
	const boards = await getJobsOnBoard(params.params.boardId);
	return { boards };
};

const SpreadsheetView = () => {
	const { boards }: any = useLoaderData();
	const data = boards.data;
	const boardId = (data && data.length !== 0 ? data[0].jobBoardId : -1);
	console.log(data)
	
	return (
		<SpreadSheet key={boardId} props={data}/>
	);
}

export default SpreadsheetView;