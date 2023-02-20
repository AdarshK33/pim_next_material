import { authServer } from '../../../utils/axios';
import withSession from "../../../utils/session";

async function handler(req, res) {
    // return new Promise((resolve, reject) => {
		const { user: { at = "" } = {}, loggedIn } = req.session;
	const body = req.body;
	
	const config = {
		method: 'post', 
		url: '/auth/login/CUSTOM',
		data: body,
	};
	authServer(config)
		.then( async response => {
            // console.log("hello response",response.data.result.at)
			if (response.status === 200) {
				req.session = {
					...req.session,
					user: {
						...response.data.result, //user detaisl and token
					},
					loggedIn: true,
				};

				 await req.session.save();
				 res.status(200).json(response.data);
                Promise.resolve();
			}
		})
		.catch(err => {
            console.log("error caught in -> api/login/userLogin", err);
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


export default withSession(handler);