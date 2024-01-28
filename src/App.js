import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Button,Form,Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import './App.css';


function App() {
  const [show, setShow] = useState(false);
  const[allData,setAllData]=useState([{}]);
  const[buttonState,setButtonState]=useState(true);
  const[index,setIndex]=useState(0);
  const[input,setInput]=useState(
    {
      Fullname:"",
      Email:"",
      Password:"",
      Mobilenumber:""
    }
  )
  function getInputData(e){
    let target=e.target;
    let value= target.value;
    let key=target.name;
    return(
      setInput((old)=>{
        return{
          ...old,
          [key]:value
        }
      })
    )
  }
  let temp={};
  const getFormData=(e)=>{
    e.preventDefault();
    let form =e.target;
    let formData=new FormData(form);  
    for (let data of formData.entries()){
                  let key=data[0];
                  let value=data[1];
                  if(typeof(value)==="object"){
                    value=URL.createObjectURL(value);
                  }
                  temp[key]=value;
                  console.log(temp);
                }
  }
  function insertData(e){
    e.preventDefault();
    getFormData(e);
    return (
      setAllData((old)=>{
        return [
          ...old,
          temp
        ]
      }),
      setShow(false),
      setInput(
        {
          Fullname:"",
          Email:"",
          Password:"",
          Mobilenumber:""
        }
      )
    )
  }
  function updateData(e){
    e.preventDefault();
    getFormData(e);
    const tempData=[...allData];
    tempData[index]=temp;
    return(
      setShow(false),
      setAllData(tempData)
    )
  }
  function editData(item){
    return(
      setShow(true),
      setInput(item),
      setButtonState(false),
      setIndex(item.index)
    )
  }
  function deleteUser(index){
      // console.log(index);
      let tempdata=[...allData];
      tempdata.splice(index,1);
      window.confirm("Are you sure you want to delete this item?");
      return(
        setAllData(tempdata)
      )
    }
  function addButton(){
    return(
      setShow(true),
      setInput(
        {
          Fullname:"",
          Email:"",
          Password:"",
          Mobilenumber:""
        }
      ),
      setButtonState(true)
    )
  }
  function Tr({item}){
    if(item.index===0){
      return null;
    }
    else{
      return(<>
        <tr>
          <td>{item.index}</td>
          <td>
            <img src={item.Profile} alt="" width={20} height={20} className='rounded-circle'/>
          </td>
          <td>{item.Fullname}</td>
          <td>{item.Email}</td>
          <td>{item.Password}</td>
          <td>{item.Mobilenumber}</td>
          <td>
            <Button variant='primary me-2' onClick={()=>editData(item)}>
              <i className='fa fa-edit'></i>
            </Button>
            <Button variant='danger'onClick={()=>{deleteUser(item.index)}}>
              <i className='fa fa-trash'></i>
            </Button>
          </td>
      </tr>
      </> )
    }
    
  }
  return (
    <>
        <Container className='p-5'>
            <Button onClick={addButton} className='btn btn-success'>
              <i className='fa fa-plus'></i>
            </Button>
        </Container>

        <Modal show={show} onHide={()=>setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Registration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={buttonState?insertData:updateData}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="Fullname" placeholder="Full Name" 
                onChange={getInputData} value={input.Fullname}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="Email" placeholder="example@gmail.com"
                onChange={getInputData} value={input.Email}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="Password" placeholder="Set Password"
                onChange={getInputData} value={input.Password}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact no.</Form.Label>
                <Form.Control type="tel" name="Mobilenumber" placeholder="10 digit Number"
                onChange={getInputData} value={input.Mobilenumber}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" name="Profile" placeholder="Upload your photo"></Form.Control>
            </Form.Group>
            <Form.Group>
              {buttonState?<Button variant="primary" type='submit' className="my-3 me-2">Save</Button>:<Button variant="info" type='submit' className="my-3 me-2">Update</Button>}
              <Button variant="danger" onClick={()=>setShow(false)} type='reset' className="my-3 me-2">Cancel</Button>
            </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
        <Container>
            <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                  <th>Sr.</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Mobile</th>
                  <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((item,index)=>{
                      item['index']=index;
                      return<Tr item={item} key={index}/>
                  })}
                </tbody>
            </Table>
        </Container>
        
    </>
  )
}
export default App;