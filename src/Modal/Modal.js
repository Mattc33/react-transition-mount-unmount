import React, { Component } from 'react'
import './Modal.css'
export default class Modal extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      unmounting: false,
      doAnimation: null
    }

    this.animationType = this.getAnimationType(this.props.animation)
  }


  componentDidMount = () => {
    this.setState({doAnimation: this.animationType.in})
  }

  componentWillReceiveProps = (forwardProps) => {
    if (forwardProps.isModalOpen) {
      this.setState({ doAnimation: this.animationType.in })
    }
  }

  animationEnd = e => {
    if (e.animationName.split('-')[1] === 'in') return;

    if (e.animationName.split('-')[1] === 'out') {
      this.props.closeModal()
    }
  }

  handleClick = () => {
    this.setState({ doAnimation: this.animationType.out})
  }

  getAnimationType = (animationType) => {
    let type = ''

    switch (animationType) {
      case 'fade-in-out':
        type = {in: 'fade-in', out: 'fade-out'}
        break
      case 'scale-in-out':
        type = { in: 'scale-in', out: 'scale-out' }
        break
      default:
        type = ''
        break
    }

    return type;
  }

  render = () => {
    return (
      <React.Fragment>
        {this.props.isModalOpen && (
          <div
            onAnimationEnd={this.animationEnd}
            style={styles.modal}
            className={`${this.props.animation === 'fade-in-out' ? this.state.doAnimation : ''}`}
          >
            <div
              style={styles.boxDialog}
              className={this.state.doAnimation}
            >
              Modal
          <button onClick={this.handleClick}>Close</button>
            </div>
            <div style={styles.background} />
          </div>
        )}
      </React.Fragment>
    )
  }
}

const styles = {
  background: {
    background: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    outline: 0,
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '40px auto',
  },
  boxDialog: {
    width: '100%',
    height: '200px',
    backgroundColor: '#fefefe',
    boxShadow: '0 3px 9px rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    padding: '40px',
  },
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  }
}