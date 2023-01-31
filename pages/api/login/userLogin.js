import { authServer } from '../../../utils/axios';

export default async function handler(req, res) {
    // return new Promise((resolve, reject) => {
		
	const body = req.body;
	
	const config = {
		method: 'post',
		url: '/auth/login/CUSTOM',
		data: body,
	};
	authServer(config)
		.then(response => {
            console.log("hello response",response)
			if (response.status === 200) {
				res.status(200).json(response.data);
                Promise.resolve();
			}
		})
		.catch(err => {
            console.log("error caught in -> api/login/userLogin", err);
            console.log(err.response);
			if (err.data) res.status(400).json(err.data);
			else res.status(500).json({ message: 'something went wrong' });
             Promise.reject(err);
		});
    // }
    // )

}

