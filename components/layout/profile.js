import React from 'react';
import ProfileCard from './profilecard';
import {Input} from 'reactstrap';
import {fire} from '../../firebase/firebase';
import Router from 'next/router';
import swal from 'sweetalert';
export default class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isloading:false,
            progress:false,
        }
    }
    onChange(e)
    {
        this.setState({progress:true})
        var username=this.props.user.username;
        let file=e.target.files[0];
        let filename=file.name;
        var storageRef=fire.storage().ref(`/profileimages/${filename}`)
        storageRef.put(file).then((snap)=>{
            storageRef.getDownloadURL().then((url)=>{
                fire.database().ref(`/users/${username}`).update({
                    imageurl:url
                }).then((snap)=>{
                    this.setState({progress:false})
                    console.log("hiii");
                    Router.push('/');
                }).catch((err)=>{
                    swal({
                        title:'Error',
                        text:`${err.message}`,
                        button:'Cancel!!',
                        icon:'error'
                      })
                })
            })
        }).catch(err=>
            {
                swal({
                    title:'Error',
                    text:`${err.message}`,
                    button:'Cancel!!',
                    icon:'error'
                  })
            })
    }
    render(){
        const {user}=this.props;
        const {progress}=this.state;
        const url=user.imageurl?user.imageurl:"/static/images/man.png" 
        return(
            <div>
            <div className="profile-bg-bg">
                <label className="label-style">
                {
                    !progress ?
                    <img src={url} className="profile-bg"></img>
                    :<div className="loader"></div>
                }
                </label>
                <Input id="file-input" type="file" onChange={(e)=>{this.onChange(e)}}/>
            </div>
            <div style={{marginRight:20}}>
            <ProfileCard user={user}/>
            </div>
            </div>
        );
    }
} 