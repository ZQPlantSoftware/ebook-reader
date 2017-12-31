import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Pagination extends Component {
    constructor (props) {
        super(props)

        this.state = {
            position: this.props.pagination.currentPercentage
        }
    }

    componentWillReceiveProps (props) {
        if (this.props.pagination.currentPercentage != props.pagination.currentPercentage) {
            this.setState({
                position: props.pagination.currentPercentage
            })
        }
    }

    handlePageChange (e, i) {
        let value = e.target.value
        // alert("change value:", value)

        if(value == 1)
            value = 0

        this.setState({
            position: value
        })

        // this.props.gotoPercentage(value)
        e.stopPropagation()
    }

    handleTouchEnd (e, i) {
        // let value = e.target.value
        // console.log("[[handleTouchEnd] e:", e, "i", i, "value:", value)
        // alert('[[handleTouchEnd]value:' + value)
        if(this.state.position != this.props.pagination.currentPercentage) {
            this.props.gotoPercentage(this.state.position)
        }
    }

    render () {
        let { position } = this.state

        return (
            <div className="page-wrapper">

                <input className="page-control"
                    type="range"
                    onChange={this.handlePageChange.bind(this)}
                       onTouchMove={this.handlePageChange.bind(this)}
                    onTouchEnd={this.handleTouchEnd.bind(this)}

                    value={position}
                    step="1" min="1" max="100" />
            </div>
        )
    }
}

const selectors = createSelector([
    state => state.book
], book => {
    return { pagination: book.pagination }
})

export default connect(selectors)(Pagination)
