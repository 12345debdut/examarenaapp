import React from 'react';
import {Input,InputGroup,Label,Container,Row,Col,Button} from 'reactstrap';
import {fire} from '../../firebase/firebase'
import swal from 'sweetalert';
import Router from 'next/router'
export default class QuestionForm extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            text:'',
            Image:'',
            Correct:'',
            progress:false,
            index:'',
            error:null
        }
        this.onSubmit=this.onSubmit.bind(this);
    }
    onSubmit(){
        const {Image,Correct,index,text}=this.state;
        if(Correct && index)
        {
            this.setState({error:null})
            fire.database().ref(`/questionswbjee/${index}`).set({
                correct:Correct,
                questionText:text,
                questionimage:Image
            }).then((snap)=>{
                this.setState({text:''})
                this.setState({Image:''})
                this.setState({Correct:''})
                this.setState({index:''})
            }).catch((err)=>{
                swal({
                    title:'Error',
                    text:`${err.message}`,
                    button:'Cancel!!',
                    icon:'error'
                  })
            })
        }
        else{
            this.setState({error:"Correct option and index value are required"})
        }
    }
    onFileUpload(e){
        if(e.target.files[0])
        {
            let file=e.target.files[0];
        let filename=file.name;
        var storageRef=fire.storage().ref(`/images/${filename}`)
        storageRef.put(file).then((snap)=>{
            storageRef.getDownloadURL().then((url)=>{
                this.setState({Image:url})
        }).catch(err=>
            {
                swal({
                    title:'Error',
                    text:`${err.message}`,
                    button:'Cancel!!',
                    icon:'error'
                  })
            })
    })
}      
}
    render()
    {
        return(
        <div className="question-input">
            <br/>
                <Label className="label-text">Index value</Label>
                <Input value={this.state.index} type="textarea" onChange={(e)=>{this.setState({index:e.target.value})}}/>                    
                    <br/>
                        <Label className="label-text">Question Text</Label>
                        <Input value={this.state.text} type="textarea" onChange={(e)=>{this.setState({text:e.target.value})}}/>                    
                    <br/>
                        <Label className="label-text">Question Image</Label>
                        <br/>
                        <label className="file-text">Choose file
                        <input type="file" className="file-input"  onChange={(e)=>{this.onFileUpload(e)}}/></label>
                    <br/>
              
                        <Label className="label-text">Correct answer</Label>
                        <Input value={this.state.Correct} type="textarea" onChange={(e)=>{this.setState({Correct:e.target.value})}}/>                    
                    <br/>
                {this.state.error && <div className="question-upload" style={{paddingBottom:30}}>
               
                    <p style={{fontSize:20,color:'#ff6666',fontWeight:'bold'}}>{this.state.error}</p>
               </div>
                }
                <div className="question-upload" style={{paddingBottom:30}}>
                
                    <Button onClick={()=>{this.onSubmit()}} color="success">Submit</Button>
                </div>
        </div>
        );
    }
}