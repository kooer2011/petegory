import React, { Component } from 'react'
import FormUserDetail from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import './form.css'
export class UserForm extends Component {
    state={
        step:1,
        petName:'',
        number:'',
        petType:['', 'Cat','Dog'],
        addOn:['เช็ดหู','ไถเท้าท้องก้น','ฟอกน้ำยา Malaceb','ฟอกน้ำยา Hexine','แปรงฟัน'],
        Bledd:'',
    } 

    //Proceed to next step
nextStep=() =>{
    const {step} = this.state;

    this.setState({
        step: step +1
    })

}
//Go back to prev step
prevStep=() =>{
    const {step} = this.state;

    this.setState({
        step: step -1
    })
    
}

//Handle fields change
handleChange = input => e =>{
    this.setState({[input]: e.target.value})
    
}


    
    render() {

        const {step} = this.state;
        const {petName,number,petType,addOn,Bledd} = this.state;
        const values= {petName,number,petType,addOn,Bledd}

        switch(step){
            case 1:
                return(
                    <div className='form_content'>
                            <FormUserDetail
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                    </div>
                    
                )
            case 2:
                return(
                   <div>FormPersonal</div>
                )
            case 3:
                return(
                    <h1>Confirm</h1>
                )
            case 4:
                return(
                    <h1>Success</h1>
                )    
        }


    return (
      <div>
        
      </div>
    )
  }
}

export default UserForm
