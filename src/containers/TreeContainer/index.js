import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import api from '../../common/api'
import TreeButton from '../../components/TreeButton'
import './style.css'

class TreeContainer extends Component {
  constructor(props){
    super(props)
    this.backToContext = this.backToContext.bind(this)
  }

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

  backToContext(i) {
    console.log("backtocontext index :" + i)
    this.state.nodes.splice(i+1)
    let newNodes = this.state.nodes 
    console.log(newNodes)
    this.setState({nodes:newNodes})
    const next = this.state.nodes[i].id
    const context = localStorage.getItem('context')
    api.post({
      path: 'tree/move',
      headers: { context },
      body: { next }
    }).then(({ success, newContext }) => {
      if (success) {
        localStorage.setItem('context', newContext)
      }
    })
  }

  render() {
    console.log(this.state.nodes)

    return (
      <div className="tree-container">
        {this.state && this.state.nodes &&
          this.state.nodes.map((answer, i) => {
            console.log("Entered");
            if (i != this.state.nodes.length - 1) {
              return (<div className="tree-components">
                <TreeButton index={i} onNodeSelect={this.backToContext} key={i} />
                <div className="line"></div>
              </div>)
            }
            else {
              return (<div className="tree-components">
                <TreeButton index={this.state.nodes.length - 1} onNodeSelect={this.backToContext} key={this.state.nodes.length - 1} />
              </div>)
            }
          })}
      </div>
    )
  }
}

export default withRouter(TreeContainer)
