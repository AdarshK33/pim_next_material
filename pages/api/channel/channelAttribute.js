import {catalogQueryServer} from '../../../utils/axios';

function handler(req, res){
    const body = req.body;
    const channelFilter = body.channelFilter
    const pageNo = body.pageNo   
    const pageSize = body.pageSize
    // const {user: {at =""} ={}, loggedIn} = req.session;
    const config = {
        method:"get",
        url:`/ct/channel/mapping/${channelFilter}?pageNo=${pageNo}&pageSize=${pageSize}`,
        // headers:{
        //     // Authorization:`Bearer ${at}`,
        //     "Content-Type":"application/json",
        // }
    };
    catalogQueryServer(config)
    .then((response) => {
        if(response.status === 200){
            res.status(200).json(response.data);
        }
    })
    .catch((err) =>{
     console.log("error caught in pages/api/channelAttribute",err);
     if(err?.response?.data){
        const {status ={} } = err?.response;
        res.status(status).json(err.response.data.error +' '+ status);
     }
     else res.status(500).json({message:"something went wrong"});
    });
}

export default (handler);