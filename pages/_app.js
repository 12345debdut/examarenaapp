import React from 'react';
import App, { Container } from 'next/app';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken';
import Cookies from "js-cookie";
// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';
import auth0 from '../services/auth0';
import {userSession} from '../actions/index';
export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let auth={};
    const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);
    const username = process.browser ? await auth0.clientUserinfo() : await auth0.serverUserinfo(ctx.req);
    //const message= await userSession(ctx.req);
    // var issuer=false
    // if(message!= undefined && message.message==="token valid")
    // {
    //    issuer=true
    // }
    // else{
    //   issuer=false
    // }
    if(user)
    {
      try{
      const decodedToken=await jwt.decode(user,{complete:true});
      let email=decodedToken.payload.email;
      if(email)
      {
        if(email==='debdut.saha.3@facebook.com' || email==='rajarshiroy717@gmail.com')
        {
          auth={
            isAuthenticated:true,
            isSiteOwner:true
          }
        }
        else{
          auth={
            isAuthenticated:true,
            isSiteOwner:false
          }
        }
      }
      else{
        auth={
          isAuthenticated:false,
          isSiteOwner:false
        }
      }
    }catch(err){
      console.log("anyone has tempered the security")
    }
  }
    auth.username=username;
    return {auth}
  }

  render () {
    const { Component, pageProps, auth } = this.props
    return (
      <Container>
      <ToastContainer/>
        <Component {...pageProps} auth={auth}/>
      </Container>
    )
  }
}