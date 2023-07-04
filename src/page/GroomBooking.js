import React,{useState}  from 'react'
import NavbarHeader from '../components/Navbar';
import {MultiForm} from '../components/Stepper/MultiStepForm'
import StepProgressBar from '../components/Stepper/Stepbar'
import { question } from '../components/Question/Questions';


import {Container,Row,Col,Card,Button} from 'react-bootstrap'
import './grooming.css';
function GroomBooking() {

  const [index,setIndex] = useState(1);

  const prevButton = () =>{
    if(index > 1){
      setIndex(prevIndex => prevIndex = 1)
    }
  }
  


  const NextButton = () =>{
    if(index < 3){
      setIndex(prevIndex => prevIndex + 1)
    }
  }



  return (
    <div className='Grooming_booking'>
      <NavbarHeader/>
      <Container className='h-100'>
        
         <Row className ='h-100'>
          <Col className='align-self-center'>
          <StepProgressBar step={index}/>
          </Col>
         </Row>
         <Row>
          <Card>
            <Card.Body>
              {/* <MultiForm list={question} /> */}
            </Card.Body>
            <Card.Footer className='d-fex justify-content-between'>
                <Button onClick={prevButton} disabled={index === 1}>
                  Previous
                </Button>
                <Button onClick={NextButton}>Next</Button>
            </Card.Footer>
          </Card>
         </Row>
      </Container>
     
    </div>
  )
}

export default GroomBooking