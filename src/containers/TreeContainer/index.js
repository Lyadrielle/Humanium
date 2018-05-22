import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import api from '../../common/api'
import TreeButton from '../../components/TreeButton'
import './style.css'
import treeConfirm from '../../common/treeConfirm'

class TreeContainer extends Component {
  constructor(props) {
    super(props)
    this.backToContext = this.backToContext.bind(this)
    this.showModal = this.showModal.bind(this)
    this.state = { showModal: false, nodes: null }
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

  showModal(index) {
    const nodes = this.state.nodes.filter((node, i) => {
      return (node.visibleOnTree != false)
    })
    
    const currentNode = nodes[index]
    treeConfirm('', currentNode).then(
      (result) => {
        this.backToContext(currentNode)
      },
      (result) => {
      }
    )
  }

  backToContext(node) {
    const { history } = this.props
    const next = node.id
    const context = localStorage.getItem('context')
    api.post({
      path: 'tree/move',
      headers: { context },
      body: { next }
    }).then(({ success, newContext }) => {
      if (success) {
        localStorage.setItem('context', newContext)
        history.push('/Film')
      }
    })
  }

  displayTreeNodes() {
    const nodes = this.state.nodes.filter((node, i) => {
      return (node.visibleOnTree != false)
    })
    
    return (
      nodes.map((node, i) => {
        console.log("Entered");
        if (i !== nodes.length - 1) {
          return (<div key={i} className="tree-components">
            <TreeButton node={nodes[i]} index={i} onNodeSelect={this.showModal} />
            <div className="line"></div>
          </div>)
        }
        else {
          return (<div key={nodes.length - 1} className="tree-components">
            <TreeButton node={nodes[i]} index={nodes.length - 1} onNodeSelect={this.showModal} />
          </div>)
        }
      })
    )
  }

  render() {
    return (
      <div className="tree-container">
        {this.state && this.state.nodes && this.displayTreeNodes()}
      </div>
    )
  }
}

export default withRouter(TreeContainer)
