import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import { Button, CustomInput, Form, FormGroup, Label, Input, Card} from 'reactstrap';
import axios from 'axios';

class Results extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            photos: this.props.result.photos,
            maxNumberOfGuests: this.props.result.maxNumberOfGuests,
            address: this.props.result.address,
            _id: this.props.result._id,
            city: this.props.result.city,
            state: this.props.result.state,
            dates_unavailable: this.props.dates_unavailable,
            user: null,
            newItem: null
        }
    }

    componentDidMount = () => {
        if(this.props.user) {
            this.setState({user: this.props.user._id})
        }
        let tempArr = [...this.props.result.dates_unavailable]
        this.state.dates_unavailable.forEach(d => {
            tempArr.push(d)
        })

        console.log(tempArr, this.state.dates_unavailable)
        this.setState({dates_unavailable: tempArr})
        console.log(this.state.dates_unavailable)
    }
    
    handleSubmit = e => {
        e.preventDefault()
        let token = localStorage.getItem('mernToken')

        let tempUserArr = [...this.props.user.bookedProperties]
        tempUserArr.push(this.props.result._id)
        console.log('temp array', tempUserArr)
        let sentObj = {
            bookedProperties: tempUserArr
        }
        console.log('Look its the state', this.state)
        axios.put(`http://localhost:3001/property/${this.props.result._id}`, this.state)
        .then((response) => {
            console.log('Form was submitted', response)
            axios.put(`http://localhost:3001/auth/${this.props.user._id}`, sentObj, this.state, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                console.log('success', response)
                localStorage.setItem('mernToken', response.data.token)
                this.props.updateUser()
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

render () {
    let photosArr = this.props.result.photos.map((photoUrl, index) => {
        return {url: photoUrl}
    })

    if (photosArr.length == 0) {
        photosArr = [{url: "https://cdn.pixabay.com/photo/2019/03/13/14/21/home-4052993_960_720.png"}]
    }
    return (
        <Card   className="rentResults" >
            <h3>
                {this.props.result.address}
            </h3>
            <div className="minHeight">
            <SimpleImageSlider className="slider"
                    width={500}
                    height={400}
                    images= {photosArr} />
            </div>
            {/* <img src={this.props.result.photos[0]} /> */}
            <p>{this.props.result.city}, {this.props.result.state}</p>
            <p>{this.props.result.maxNumberOfGuests}</p>
                            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Book it!" />
                </form>
            {/* <button onClick={handleSubmit}>Book it!</button> */}
        </Card>
    )
    }

}

export default Results