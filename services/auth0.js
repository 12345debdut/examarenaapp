import Cookies from 'js-cookie';
import {getCookiesFromReq} from '../helpers/utils';
import {fire} from '../firebase/firebase';
import Router from 'next/router'
class Auth0{
    async clientAuth(){
    const token=Cookies.getJSON('jwt')
    return token;
  }
  async serverAuth(req){
      const token=await getCookiesFromReq(req,'jwt');
      return token;
}
  async logout(){
      Cookies.remove('jwt');
      Cookies.remove('user');
      const signout=await fire.auth().signOut;
      if(signout)
      {
        console.log("signed out")
        Router.push('/');
      }
      else{
        console.log("error in logging out")
      }
    }
    async serverUserinfo(req){
      const user=await getCookiesFromReq(req,'user');
      return user;
    }
    async clientUserinfo(){
      const user=Cookies.getJSON('user')
      return user;
    }
    async refreshToken(){
      const refresh=await fire.auth().currentUser.getIdToken(true)
      .then((token)=>{
        if(token)
        {
          return token;
        }
      }).catch((err)=>{
        console.log(err.message)
      })
      return refresh;
    }
}
const auth0Client= new Auth0()
export default auth0Client;