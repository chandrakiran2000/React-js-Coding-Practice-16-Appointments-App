// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {inputTitle: '', inputDate: '', isStared: false, appointmantsList: []}

  enteredText = event => {
    //  console.log(event.target.value)
    this.setState({inputTitle: event.target.value})
  }

  enteredDate = event => {
    //  console.log(event.target.value)
    this.setState({inputDate: event.target.value})
  }

  starHandle = id => {
    this.setState(prevState => ({
      appointmantsList: prevState.appointmantsList.map(each =>
        each.id === id ? {...each, isStarFilled: !each.isStarFilled} : each,
      ),
    }))
  }

  onSubmitHandle = event => {
    event.preventDefault()

    const {inputTitle, inputDate} = this.state

    const d = new Date(inputDate)
    const dateFormat = format(new Date(d), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      title: inputTitle,
      date: dateFormat,
      isStarFilled: false,
    }
    this.setState(prevState => ({
      appointmantsList: [...prevState.appointmantsList, newAppointment],
    }))

    this.setState({inputTitle: ''})
    this.setState({inputDate: ''})
  }

  filteringAppointmentsList = () => {
    const {isStared, appointmantsList} = this.state

    if (isStared) {
      return appointmantsList.filter(each => each.isStarFilled === true)
    }
    return appointmantsList
  }

  showStaredAppointments = () => {
    this.setState(prevState => ({
      isStared: !prevState.isStared,
    }))
  }

  render() {
    const {inputTitle, inputDate} = this.state
    const filterAppointmentsList = this.filteringAppointmentsList()
    //  console.log(appointmantsList)
    return (
      <div className="bg-card">
        <div className="Appointment-card">
          <div className="add-appointment-card">
            <form className="forms" onSubmit={this.onSubmitHandle}>
              <h1 className="main-heading">Add Appointment</h1>
              <label className="title-label" htmlFor="titleinput">
                Title
              </label>
              <br />
              <input
                type="text"
                onChange={this.enteredText}
                value={inputTitle}
                id="titleinput"
                className="input-text"
              />
              <br />
              <label className="title-label" htmlFor="dateinput">
                DATE
              </label>
              <br />
              <input
                type="date"
                onChange={this.enteredDate}
                value={inputDate}
                className="input-date"
                id="dateinput"
              />
              <br />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>

            <img
              className="appointment-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="appointments-stared-card">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              onClick={this.showStaredAppointments}
              className="starred-btn"
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="appointments-booked-card">
            {filterAppointmentsList.map(eachAppoint => (
              <AppointmentItem
                eachList={eachAppoint}
                key={eachAppoint.id}
                starHandle={this.starHandle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
