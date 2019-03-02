import React from 'react';
import {Input,InputGroup,Label,Container,Row,Col,Button} from 'reactstrap';
import {toast} from 'react-toastify'
import { fire } from '../../firebase/firebase';

export default class PermissionWbjee extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            value:''
        }
        this.onSubmit=this.onSubmit.bind(this);
    }
    onSubmit()
    {
        let {value}=this.state;
        if(value==='')
        {
            toast.error("Please give the required field");   
        }
        else{
            try{
                var number=parseInt(value)
                fire.database().ref("/permissionwbjee").set({
                    permission:number
                }).then((res)=>{
                    toast.success("successfully updated")
                }).catch((err)=>{
                    toast.error(err.message)
                })
            }catch(err){
                toast.error("Please enter a number value")
            }
        }
    }
    render()
    {
        return(
            <div className="permission-padding">
            <Container>
            <Row className="question-upload">
            <Col md="6">
                <Label className="label-text">Permission Wbjee</Label>
                <Input type="text" onChange={(e)=>{this.setState({value:e.target.value})}}/> 
                <br/>                   
                <Button color="success" onClick={()=>{this.onSubmit()}}>Permission Wbjee</Button>
                </Col>
            </Row>
            </Container>
            </div>
        );
    }
}