import axios from 'axios'
import cookies from 'js-cookie';
import {getCookiesFromReq} from '../helpers/utils';
const axiosInstance=axios.create({
    baseURL:`${process.env.BASE_URL}/api/v1`,
})
const setAuthHeader=(req)=>{
    const token=req?getCookiesFromReq(req,'jwt'):cookies.getJSON('jwt');
    if(token)
    {
        return {headers:{'authorization':`${token}`}};
    }
    else{
        return undefined;
    }
}
export const userSession=async(req)=>{
    const message=await axiosInstance.get("/auth/expire",setAuthHeader(req))
    .then((res)=>{return (res.data)})
    .catch((err)=>{
        return undefined;
    })
    if(message)
    {
        return message;
    }
    else{
        return undefined;
    }
}
export const getWbjeeQuestion=async()=>{
    const question=await axiosInstance.get("/auth/wbjee",setAuthHeader())
    .then(res=>{return res.data})
    .catch(err=>{return err})
    return question;
}
export const getJeemainQuestion=async()=>{
    const question=await axiosInstance.get("/auth/jeemain",setAuthHeader())
    .then(res=>{return res.data})
    .catch(err=>{return err})
    return question;
}
