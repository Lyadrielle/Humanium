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
    console.log("Starting loadContext")
    const retryLoadContext = () => setTimeout(this.loadContext, 1000)
    let context = localStorage.getItem('context')

    if (!context) {
      console.log("No context found")
      const { success, newContext } = await api.get({ path: 'tree/init' })
      if (!success) {
        console.log("Error getting the context")
        return retryLoadContext()
      }
      localStorage.setItem('context', newContext)
      context = newContext
    }
    const { success, status, nodes } = await api.get({ path: 'tree/read-path', headers: { context } })
    if (!success) {
      console.log("Error getting the tree")
      if (status === 500) localStorage.removeItem('context')
      return retryLoadContext()
    }
    console.log("Node retreived with success")
    this.setState({ nodes: nodes })
  }

  componentDidMount() {
    this.loadContext()
  }

  render() {
    console.log(this.state.nodes)

    return (
      <div className="tree-container">
        {this.state && this.state.nodes &&
          this.state.nodes.map((answer, i) => {
            console.log("Entered");
            return (<TreeButton key={i} />)
          })}
      </div>
    )
  }
}

export default withRouter(TreeContainer)
