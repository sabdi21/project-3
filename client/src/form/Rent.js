import React from 'react'
// import axios from 'axios'
// import { Redirect } from 'react-router-dom'
import { CustomInput, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Rental from './Rental';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Rent extends React.Component {
    // =============== calender stuff
    state = {
        startDate: new Date()
      };
     
     handleDates = () => {
        const [startDate, setStartDate] = useState(new Date("2019/09/18"));
        const [endDate, setEndDate] = useState(new Date("2019/09/20"));
        return (
          <>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              endDate={endDate}
              minDate={startDate}
            />
          </>
        );
      };

     // =============== 
    constructor(props) {
        super(props)
        this.state = {
            currentNeighborhood: '',
            propertiesName: 'Property Name',
            image: 'https://placebear.com/200/300',
        unAvailable: false
        }
    }
    handleRentalSubmit = (e) => {
        e.preventDefault()
        // this.setState({ currentNeighborhood: })
        console.log('submitted!', e.target.value)
        console.log('this is the neighborhood', this.state.currentNeighborhood)
        // axios.get()
        // .then()
        // .catch()
    }
    handleSelector = (e) => {
        e.preventDefault()
        console.log('this', e.target.value)
        this.setState({ currentNeighborhood: e.target.value})
        console.log(e.target.value)
    }
    render() {

    return (

      <div className="page-header clear-filter" filter-color="blue">
        <div className="page-header-image" style={{ backgroundImage: "url(" + require("../assets/img/seattle.jpg") + ")" }}> </div>
        <div className='Rental-Form'>
        <h1>Rental Content</h1>
        <Form onChange={this.handleRentalSubmit}>
            <FormGroup>
            <Label className="Rental-Content" for="exampleCustomSelect">Select Neighborhood</Label> 
            <br />
            <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                <option value="">Seattle</option>
                <option value="Ballard">Ballard</option>
                <option value="Beacon Hill">Beacon Hill</option>
                <option value="Capitol Hill">Capitol Hill</option>
                <option value="Queen Anne">Queen Anne</option>
                <option value="Rainier Valley">Rainier Valley</option>
                <option value="University District">University District</option>
            </CustomInput>
            </FormGroup>
            <Button type="submit">Search Rental Properties!</Button>
        </Form>
        <Rental current={this.state.currentNeighborhood}/>
        {/* pass data from the state into the rental component */}
        </div>

        {/* // ==================== */}
        <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange} />
        {/* // ====================  */}


        </div>
      
    )
    }
}

export default Rent