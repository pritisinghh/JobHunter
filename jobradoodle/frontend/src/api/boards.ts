import { axiosInstance } from '../index';

export const getBoards = async () => {
	return await axiosInstance.get('/api/jobboard/', {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	});

	// // axios api call
	// const response = await axios.get('http://localhost:3005/api/jobboard/', {
	// 	headers: {
	// 		'Access-Control-Allow-Origin': '*',
	// 		'Content-Type': 'application/json',
	// 	},
	// });
	// return response;
}

export const addBoard = async () => {
	return await axiosInstance.post('/api/jobboard/',{
		title: 'newBoard',
		description: 'I have been created!'
	  })
	  .then((response) => {
		console.log(response);
	  }, (error) => {
		console.log(error);
	  });
}