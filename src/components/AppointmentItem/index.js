// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachList, starHandle} = props
  const {id, title, date, isStarFilled} = eachList

  const starUrl = isStarFilled
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starBtnSendId = () => {
    //  console.log(isStarFilled)
    starHandle(id)
  }

  return (
    <li className="booked-card">
      <div className="name-star-card">
        <p className="name-heading">{title}</p>
        <button
          className="star-btn"
          onClick={starBtnSendId}
          type="button"
          data-testid="star"
        >
          <img className="star-img" src={starUrl} alt="star" />
        </button>
      </div>
      <p className="date-para">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
