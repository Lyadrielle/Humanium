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
    this.state = { showModal: false, nodes: null, percentageTable: null }
  }

  async loadContext() {
    const retryLoadContext = () => setTimeout(this.loadContext, 1000)
    let context = localStorage.getItem('context')

    if (!context) {
      const { success, newContext } = await api.get({ path: 'tree/init' })
      if (!success) {
        return retryLoadContext()
      }
      localStorage.setItem('context', newContext)
      context = newContext
    }
    const { success, status, nodes, percentageTable } = await api.get({ path: 'tree/read-path', headers: { context } })
    if (!success) {
      if (status === 500) localStorage.removeItem('context')
      return retryLoadContext()
    }
    this.setState({ nodes: nodes, percentageTable: percentageTable })
  }

  componentDidMount() {
    this.loadContext()
  }

  showModal(node, percentage) {
    const options = { node : node, percentage: percentage }
    treeConfirm('', options).then(
      (result) => {
        this.backToContext(node)
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

  getNextNode(node) {
    let nextNode = null
    if (node.type === 'QTE') {
      nextNode = this.state.nodes.find((node, i) => {
        return (node.id === node.faillure || node.id === node.success)
      })
    }
    else if (node.type === 'Choice') {
      nextNode = this.state.nodes.find((item, i) => {
        return (item.id === node.choices[0].next || item.id === node.choices[1].next)
      })
    }
    return nextNode
  }

  getColumnName(currentNode, nextId) {
    let firstOrSecond = ''
    if (currentNode.type === 'Choice') {
      if (currentNode.choices[0].next === nextId)
        firstOrSecond = 'first'
      if (currentNode.choices[1].next === nextId)
        firstOrSecond = 'second'
    }

    if (currentNode.type === 'QTE') {
      if (currentNode.success === nextId)
        firstOrSecond = 'first'
      if (currentNode.failure === nextId)
        firstOrSecond = 'second'
    }
    return firstOrSecond
  }

  getPercentage(node, nextNode) {
    let nodeStats = null
    let result = null
    let firstOrSecond
    if(nextNode) firstOrSecond = this.getColumnName(node, nextNode.id)
    nodeStats = this.state.percentageTable.find((item)=>{
      return (item.node_id === node.id)
    })
    if (nodeStats != null) result = nodeStats[firstOrSecond]/(nodeStats['first'] + nodeStats['second']) * 100
    return result
  }

  displayTreeNodes() {
    const nodes = this.state.nodes.filter((node, i) => {
      return (node.visibleOnTree != false)
    })

    return (
      nodes.map((node, i) => {
        if (i !== nodes.length - 1) {
          return (<div key={i} className="tree-components">
            <TreeButton node={nodes[i]} percentage = { this.getPercentage(nodes[i], this.getNextNode(nodes[i])) } onNodeSelect={this.showModal} />
            <div className="line"></div>
          </div>)
        }
        else {
          return (<div key={nodes.length - 1} className="tree-components">
            <TreeButton node={nodes[i]} onNodeSelect={this.showModal} percentage = { this.getPercentage(nodes[i], this.getNextNode(nodes[i])) ===''?null:this.getPercentage(nodes[i], this.getNextNode(nodes[i]))} />
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
