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
    setTimeout(() => this.setState({ doAnimation: this.animationType.in, opacity: 1 }), 0)
  }

  transitionEnd = () => {
    if (!this.state.unmounting) return;
    this.props.onClose()
  }

  handleClick = e => {
    this.setState({ doAnimation: this.animationType.out, unmounting: true })
  }

  getAnimationType = (animationType) => {
    let type = '';

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
      <div
        onTransitionEnd={this.transitionEnd}
        style={styles.modal}
        className={`${this.props.animation === 'fade-in-out' ? 'fade-in-out' : ''} ${this.props.animation === 'fade-in-out' ? this.state.doAnimation : ''}`}
      >
        <div 
          style={styles.boxDialog} 
          className={`${this.props.animation} ${this.state.doAnimation}`}
        >
          Modal
          <button onClick={this.handleClick}>Close</button>
        </div>
        <div style={styles.background}/>
      </div>
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