import React from 'react'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

/**
 * 书签模块
 */
class BookMarks extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        let { bookMarks } = this.props

        return (
            <div className="toc">
                <div className="hd">
                    <h2>~ 书签 ~</h2>
                </div>
                <div className="bd">
                    <ul>
                        {bookMarks.map((item, i) => {
                            return (
                                <li></li>
                            )
                        })}

                    </ul>
                </div>
            </div>
        )
    }
}

const selectors = createSelector([
    state => state.bookMarks
], bookMarks => {
    return { bookMarks }
})

export default connect(selectors)(BookMarks)
