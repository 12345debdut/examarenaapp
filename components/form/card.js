import React from 'react';
import {Input ,Button,Tooltip,Form} from 'reactstrap';
import { fire } from '../../firebase/firebase';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import Router from 'next/router';
export default class Card extends React.Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.togglePassword=this.togglePassword.bind(this);
        this.state = {
          tooltipOpen: false,
          tooltippassword:false,
          isHovered:false,
          useremail:'',
          password:'',
          username:'',
          isloading:false,
        };
      }
      checkUserId(){
        const {username,useremail}=this.state;
        const database=fire.database().ref(`/users/${username}`);
        return database.once('value').then((snap)=>{
          if(snap.val().email===useremail)
          {
            return true;
          }
          else{
            return false;
          }
        }).catch((err)=>{
          if(err)
          {
            return false;
          }
        })
      }
      login(){
        const {useremail,password,username,isloading}=this.state;
        this.setState({isloading:true})
        fire.auth().signInWithEmailAndPassword(useremail,password)
        .then((user)=>{
          if(user)
          {
            const database=fire.database().ref(`/users/${username}`);
            database.once('value').then((snap)=>{
              if(snap.val().email=useremail)
              {
                swal({
                  title:'Congratulation!',
                  text:'You have just signed in',
                  button:'Okk!!',
                  icon:'success'
                })
                const usercredential=snap.val();
                Cookies.set('user',usercredential.username);
                Cookies.set('jwt',user.user.ra);
                this.setState({isloading:false})
                Router.push('/profile');
              }
              else{
                swal({
                  title:'Error',
                  text:'Give perfect username',
                  button:'Cancel!!',
                  icon:'error'
                })
                this.setState({isloading:false})
              }
            }).catch((err)=>{
              swal({
                title:'Error',
                text:'Give perfect username',
                button:'Cancel!!',
                icon:'error'
              })
              this.setState({isloading:false})
            })
          }
          else{
            swal({
              title:'Error',
              text:'Unknown Error Occured',
              button:'Cancel!!',
              icon:'error'
            })
            this.setState({isloading:false})
          }
        }).catch((err)=>{
          swal({
            title:'Error',
            text:`${err.message}`,
            button:'Cancel!!',
            icon:'error'
          })
          this.setState({isloading:false})
        })
      }
      toggle() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
      }
      togglePassword() {
        this.setState({
          tooltippassword: !this.state.tooltippassword,
        });
      }

    render(){
      const {isloading}=this.state;
      if(isloading)
      {
        return(
              <div className="loading-div">
                  <p className="loading-title">Verifying Your Data.......</p>
              </div>
        );
      }
        return(
            <div>
            <Form>
                <div className="card-style box effect2">
                <div className="signin-style">
                    <p className="text-style1">Signin With Credential</p>
                </div>
                <div className="input-style">
                <p className="text-style2">User Name</p>
                <Input type="text" id="TooltipExample" className="input-focus" autoComplete="on"
                onChange={(e)=>{
                  this.setState({username:e.target.value});
                }}
                />
                </div>
                    <div className="input-style">
                        <p className="text-style2">User Email</p>
                        <Input type="email" id="TooltipExample" className="input-focus" autoComplete="on"
                        onChange={(e)=>{
                          this.setState({useremail:e.target.value});
                        }}
                        />
                        <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
                            Enter a valid email please
                      </Tooltip>
                    </div>
                    <div className="input-style1">
                    <p className="text-style2">User Password</p>
                    <Input type="password" id="Toolpassword" className="input-focus" autoComplete="off"
                    onChange={(e)=>{this.setState({password:e.target.value})}}
                    />
                    <Tooltip placement="bottom" isOpen={this.state.tooltippassword} target="Toolpassword" toggle={this.togglePassword}>
                    Enter whatever you have entered
                    </Tooltip>
                    </div>
                    <div className="wrapper1" onClick={()=>{
                      this.login();
                    }}>
                    <a href="#" className="button">Login</a>
                  </div>
                </div>
                </Form>
            </div>
        );
    }
}