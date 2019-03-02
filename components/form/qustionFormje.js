import React from 'react';
import {Input,InputGroup,Label,Container,Row,Col,Button} from 'reactstrap';
import {fire} from '../../firebase/firebase'
import swal from 'sweetalert';
import Router from 'next/router'
export default class QuestionFormje extends React.Component{
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
        if( Correct && index)
        {
            this.setState({error:null})
            fire.database().ref(`/questionsjeemain/${index}`).set({
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
            this.setState({error:"Correct and index value are required"})
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
            <Container>
            <Row className="question-upload">
            <Col md="6">
                <Label className="label-text">Index value</Label>
                <Input value={this.state.index} type="textarea" onChange={(e)=>{this.setState({index:e.target.value})}}/>                    
            </Col>
            </Row>
                <Row className="question-upload">
                    <Col md="6">
                        <Label className="label-text">Question Text</Label>
                        <Input value={this.state.text} type="textarea" onChange={(e)=>{this.setState({text:e.target.value})}}/>                    
                    </Col>
                </Row>
                <Row className="question-upload">
                    <Col md="6">
                        <Label className="label-text">Question Image</Label>
                        <br/>
                        <label className="file-text">Choose file
                        <input type="file" className="file-input"  onChange={(e)=>{this.onFileUpload(e)}}/></label>
                    </Col>
                </Row>
                <Row className="question-upload">
                    <Col md="6">
                        <Label className="label-text">Correct answer</Label>
                        <Input value={this.state.Correct} type="textarea" onChange={(e)=>{this.setState({Correct:e.target.value})}}/>                    
                    </Col>
                </Row>
                {this.state.error && <Row className="question-upload" style={{paddingBottom:30}}>
                <Col md="6">
                    <p style={{fontSize:20,color:'#ff6666',fontWeight:'bold'}}>{this.state.error}</p>
                </Col>
                </Row>}
                <Row className="question-upload" style={{paddingBottom:30}}>
                <Col md="6">
                    <Button onClick={()=>{this.onSubmit()}} color="success">Submit</Button>
                </Col>
            </Row>
            </Container>
        </div>
        );
    }
}