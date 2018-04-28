import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import api from '../../common/api'
import TreeButton from '../../components/TreeButton'
import './style.css'

class TreeContainer extends Component {
  state = {
    nodes: null,
  }

  async loadContext() {
    const retryLoadContext = () => setTimeout(this.loadContext, 1000)
    let context = localStorage.getItem('context')

    if (!context) {
      const { success, newContext } = await api.get({ path: 'tree/init' })
      if (!success) return retryLoadContext()
      localStorage.setItem('context', newContext)
      context = newContext
    }
    const { success, status, nodes } = await api.get({ path: 'tree/read-path', headers: { context } })
    if (!success) {
      if (status === 500) localStorage.removeItem('context')
      return retryLoadContext()
    }
    
    this.setState({nodes : nodes})
    }

    componentDidMount() {
      this.loadContext()
    }
  
  render() {
    console.log(this.state.nodes)
    return (
      <div className="tree-container">
        {
          this.state.nodes.map((answer, i) => {     
           console.log("Entered");                 
           return (<TreeButton key={i} />) 
        })}
      </div>
    )}
}

export default withRouter(TreeContainer)
