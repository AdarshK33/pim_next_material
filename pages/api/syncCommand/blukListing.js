import { syncCommandServer } from '../../../utils/axios';

export default async function handler(req, res) {
    // return new Promise((resolve, reject) => {
		// 'http://sync-command-handler.theretailinsightsdemos.com/api/v1/sync/files?pageNo=0&pageSize=1' \

	const body = req.body;

	const config = {
		method: 'post',
		url: `/sync/files?pageNo=${body.pageNoValue}&pageSize=${body.pageSizeValue}`,
		data: body,
	};
 
	syncCommandServer(config)
		.then(response => {
			if (response.status === 200) {
				res.status(200).json(response.data.result);
                Promise.resolve();
			}
		})
		.catch(err => {
        console.log("error caught in -> api/syncCommand/bulkListing", err);
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

