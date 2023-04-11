
// import { onboardServer } from "../../../utils/axios";
// import withSession from "../../../utils/session";


// function handler(req, res) {
// const { user: { at = "" } = {}, loggedIn } = req.session;
// // console.log("hello getchannel",at,loggedIn)
//   const config = {
//     method: "get",
//     url: "/brands",
//     headers: {
//       Authorization: `Bearer ${at}`,
//       "Content-Type": "application/json",
//     }
//   };
//   onboardServer(config)
//     .then((response) => {
//       if (response.status === 200) {
//         res.status(200).json(response.data);
//       }
//     })
//     .catch((err) => {
//       console.log("error caught in -> pages/api/onboard/getBrand.js", err);
// 			if (err?.response?.data) {
// 				const { status = {} } = err?.response;
// 				res.status(status).json(err.response.data.error +' '+ status);
//       }
//       else res.status(500).json({ message: "something went wrong" });
//     });
// }

// // export default handler;
// export default withSession(handler);
