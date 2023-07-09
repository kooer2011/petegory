import React,{useState}  from 'react'
import NavbarHeader from '../components/Navbar';

import StepProgressBar from '../components/Stepper/Stepbar'

import AvailableTimeSlots from '../components/Stepper/AvailableTimeSlots';
import { MultiStepForm } from '../components/Stepper/MultiStepForm';
import MultiStepProgressBar from '../components/Stepper/MultiStepProgressBar'
import questions from '../components/Question/Questions'
import {Container,Row,Col,Card,Button} from 'react-bootstrap'
import './grooming.css';
import Footer from '../components/Footer/Footer';
function GroomBooking() {
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalPagesCount = questions?.length || 0;
  // numbered by pages. for exampe { 1: [{"key" : "value"}], 2:["key": "value"], 3: []}
  const [pagesAnswers, setPagesAnswers] = useState({});

  const prevButton = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1);
    }
  };

  const nextButton = () => {
    if (index - 3) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      // clear the form on submit
      setPagesAnswers({});
      setSubmitted(true);
    }
  };

  const onPageAnswerUpdate = (step, answersObj) => {
    setPagesAnswers({ ...pagesAnswers, [step]: answersObj });
  };

  const handleStart = () => {
    setIndex(1);
    setSubmitted(false);
  };

  return (
    <div className="App">
      <NavbarHeader/>
      <div className="h-100 w-50 container">
        <Row className="m-5">
          <Col className="align-self-center">
            <MultiStepProgressBar step={index} />
          </Col>
        </Row>
        <Row>
          {submitted ? (
            <Card>
              <Card.Body>
                <p>Your answers have been submitted!</p>
              </Card.Body>
              <Card.Footer>
                <Button onClick={handleStart}>Start Over</Button>
              </Card.Footer>
            </Card>
          ) : (
            <Card className="card_body">
              <Card.Body>
                <MultiStepForm
                  list={questions}
                  step={index}
                  onPageUpdate={onPageAnswerUpdate}
                  pagesAnswers={pagesAnswers}
                />
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between"></Card.Footer>
              <AvailableTimeSlots />
              <div className='d-flex justify-content-around m-4'>
              <Button onClick={prevButton} disabled={index === 1} className='w-25'>
                Previous
              </Button>

              <Button onClick={nextButton} className='w-25'>
                {index === totalPagesCount ? 'Submit' : 'Next'}
              </Button>
              </div>
            </Card>
          )}
        </Row>
      </div>
      <Footer/>
    </div>
  );
}
export default GroomBooking