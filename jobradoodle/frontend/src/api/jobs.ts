import { axiosInstance } from '../index';

export const getJobsOnBoard = async (jobBoardId: any) => {
	return await axiosInstance.get(`/api/jobboard/${jobBoardId}/jobs/`, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	});
}

export const setJobStatus = async (jobId: any, status: any) => {
	return await axiosInstance.put(`/api/job/`, {
		id: jobId as string,
		status: status,
	});
}