import React, {Component} from 'react'
import './App.css'
import Modal from './Modal/Modal'

export default class App extends Component {

  state = {
    isModalOpen: false
  }

  toggleModal = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  render = () => (
    <div className="App">
      <button onClick={this.toggleModal}>Toggle Modal</button>
      <div>Modal is: {this.state.isModalOpen ? "Open" : "Closed"}</div>
      <Modal
        isModalOpen={this.state.isModalOpen}
        closeModal={this.toggleModal}
        animation={'fade-in-out'}
      />
    </div>
  )

}
