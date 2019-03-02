import React from 'react';
import {Input ,Button,Tooltip,Form} from 'reactstrap';
import { fire } from '../../firebase/firebase';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import Router from 'next/router';
export default class IdProvidation extends React.Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.togglePassword=this.togglePassword.bind(this);
        this.signUp=this.signUp.bind(this);
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
      signUp(){
          let {useremail,password,username}=this.state;
          fire.auth().createUserWithEmailAndPassword(useremail,password).then((snap)=>{
            fire.database().ref(`/users/${username}`).set({
                batchtiming:'',
                class:'',
                email:useremail,
                imageurl:'',
                jepercentage:0,
                jerating:0,
                name:'',
                phonenumber:'',
                username:username,
                wbpercentage:0,
                wbrating:0
            }).then((snap1)=>{
                this.setState({useremail:''})
                this.setState({username:''})
                this.setState({password:''})
            }).catch((err)=>{
                alert("error occured in database  "+err.message)
            })
          }).catch((err)=>{
              alert("error occured in authentication  "+err.message)
          })
      }
    render(){
        return(
            <div>
            <Form>
                <div className="card-style box effect2">
                <div className="signin-style">
                    <p className="text-style1">Signin With Credential</p>
                </div>
                <div className="input-style">
                <p className="text-style2">User Name</p>
                <Input value={this.state.username} type="text" id="TooltipExample" className="input-focus" autoComplete="on"
                onChange={(e)=>{
                  this.setState({username:e.target.value});
                }}
                />
                </div>
                    <div className="input-style">
                        <p className="text-style2">User Email</p>
                        <Input value={this.state.useremail} type="email" id="TooltipExample" className="input-focus" autoComplete="on"
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
                    <Input value={this.state.password} type="password" id="Toolpassword" className="input-focus" autoComplete="off"
                    onChange={(e)=>{this.setState({password:e.target.value})}}
                    />
                    <Tooltip placement="bottom" isOpen={this.state.tooltippassword} target="Toolpassword" toggle={this.togglePassword}>
                    Enter whatever you have entered
                    </Tooltip>
                    </div>
                    <div className="wrapper1" onClick={()=>{
                      this.signUp();
                    }}>
                    <a href="#" className="button">Login</a>
                  </div>
                </div>
                </Form>
            </div>
        );
    }
}