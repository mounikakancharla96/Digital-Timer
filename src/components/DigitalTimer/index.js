import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {limit: 25, image: true, elapsedTimeInSeconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onIncrement = () => {
    this.setState(prevState => ({limit: prevState.limit + 1}))
  }

  onDecrement = () => {
    const {limit} = this.state

    if (limit > 1) {
      this.setState(prevState => ({limit: prevState.limit - 1}))
    }
  }

  resetTimer = () => {
    this.setState({
      limit: 25,
      image: true,
      elapsedTimeInSeconds: 0,
    })
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {limit, elapsedTimeInSeconds} = this.state

    const isTimerCompleted = elapsedTimeInSeconds === limit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({image: true})
    } else {
      this.setState(prevState => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
      }))
    }
  }

  startORPause = () => {
    const {limit, image, elapsedTimeInSeconds} = this.state
    const isTimerCompleted = elapsedTimeInSeconds === limit * 60

    if (isTimerCompleted) {
      this.setState({elapsedTimeInSeconds: 0})
    }
    if (!image) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({image: !prevState.image}))
  }

  getElapsedTimeInSeconds = () => {
    const {limit, elapsedTimeInSeconds} = this.state

    const remainingSecondsInTime = limit * 60 - elapsedTimeInSeconds

    const minutes = Math.floor(remainingSecondsInTime / 60)
    const seconds = Math.floor(remainingSecondsInTime % 60)

    const displayMinutes = minutes > 9 ? minutes : `0${minutes}`
    const displaySeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${displayMinutes}:${displaySeconds}`
  }

  render() {
    const {limit, image, elapsedTimeInSeconds} = this.state
    const isButtonDisabled = elapsedTimeInSeconds > 0

    const imageUrl = image
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const altName = image ? 'play icon' : 'pause icon'

    const timerStatus = image ? 'Paused' : 'Running'

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="counter">
          <div className="time-count">
            <div className="timer-container">
              <h1 className="timer">{this.getElapsedTimeInSeconds()}</h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="start-reset-container">
            <div className="start-reset-buttons">
              <button
                type="button"
                className="button"
                onClick={this.startORPause}
              >
                <img src={imageUrl} alt={altName} className="image" />
                <p className="button-names">{image ? 'Start' : 'Pause'}</p>
              </button>
              <button
                type="button"
                className="button"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="image"
                />
                <p className="button-names">Reset</p>
              </button>
            </div>
            <div className="timer-limit">
              <p className="button-names">Set Timer limit</p>
              <div className="plus-minus">
                <button
                  type="button"
                  className="limit-button"
                  disabled={isButtonDisabled}
                  onClick={this.onDecrement}
                >
                  -
                </button>
                <p className="limit-value">{limit}</p>
                <button
                  type="button"
                  className="limit-button"
                  disabled={isButtonDisabled}
                  onClick={this.onIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
