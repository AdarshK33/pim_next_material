import { server } from '../../../utils/axios';

export default async function handler(req, res) {
    // return new Promise((resolve, reject) => {
		
	const body = req.body;
	const config = {
		method: 'patch',
		url: '/brand',
		data: body,
	};
server(config)
		.then(response => {
			if (response.status === 200) {
				res.status(200).json(response.data);
                Promise.resolve();
			}
		})
		.catch(err => {
        console.log("error caught in -> api/onboard/updateBrand", err);
		console.log(err.response);
			if (err.data) res.status(400).json(err.data);
			else res.status(500).json({ message: 'something went wrong' });
             Promise.reject(err);
		});
    // }
    // )

}

