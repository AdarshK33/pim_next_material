import { onboardServer } from '../../../utils/axios';

export default async function handler(req, res) {
    // return new Promise((resolve, reject) => {

		
	const body = req.body;
	
	const config = {
		method: 'post',
		url: 'brand',
		data: body,
	};

	onboardServer(config)
		.then(response => {
			if (response.status === 200) {
				res.status(200).json(response.data.result);
                Promise.resolve();
			}
		})
		.catch(err => {
        console.log("error caught in -> api/onboard/Createbrand", err);
		console.log(err.response);
		if (err?.response?.data) {
			const { status = {} } = err?.response;
			res.status(status).json(err.response.data.error +' '+ status);
         }
				else res.status(500).json({ message: "something went wrong" });
			Promise.reject(err);

				});
    // }
    // )

}

