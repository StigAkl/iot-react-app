import React, {Component} from 'react'

class NewSensor extends Component {
   
    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        
        this.props.addSensor(this.state.name)
        this.setState({
            name: ''
        })
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
   
    render() {

        return (
        <React.Fragment>        
        <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-2">
        <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" onClick={this.handleSubmit} type="button">Add new sensor</button>
        </div>
        <input type="text" className="form-control" onChange={this.handleChange} placeholder="Name" value={this.state.name} aria-describedby="basic-addon1" />
        </div>
        </form>
        </React.Fragment>
        )
    }
}

export default NewSensor