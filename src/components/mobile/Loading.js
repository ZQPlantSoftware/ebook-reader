import React, { Component, PropType } from 'react'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Loading extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        let { book, toggleBar } = this.props

        return (
            <div className="purchase_guide" onClick={toggleBar}>
                {
                    (() => {
                        if(book.outOfProbation) {
                            return "试读已结束，购买后可以继续阅读"
                        }

                        if(book.loading) {
                            return book.message || "加载中"
                        }
                    })()
                }
                { book.outOfProbation &&
                    (
                        <div className="item">
                            <a className="btn">购买全书</a>
                        </div>
                    )
                }
            </div>
        )
    }
}

const selectors = createSelector([
    state => state.book
], book => {
    return { book }
})

export default connect(selectors)(Loading)
