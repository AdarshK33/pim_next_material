import { onboardServer } from '../../../utils/axios';

export default async function handler(req, res) {
    // return new Promise((resolve, reject) => {

	const body = req.body;
	
	let id=body.channelId
	
	console.log("hello server",id)
	// http://onboard-command-handler.theretailinsightsdemos.com/api/v1/channel/6
	const config = {
		method: 'patch',
		url: `/channel/${id}`,
		data: body,
	};
	onboardServer(config)
		.then(response => {
			 console.log("hello response",response)
			if (response.status === 200) {
				res.status(200).json(response.data);
                Promise.resolve();
			}
		})
		.catch(err => {
        console.log("error caught in -> api/channel/updateChannel", err);
					// console.log(err.response);
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

