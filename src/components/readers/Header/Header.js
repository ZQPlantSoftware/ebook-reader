import React, { Component } from 'react'
import styles from './styles.less'
import styleCommon from '../../index.less'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Header extends Component {

    constructor (props) {
        super(props)
    }
    // {showToc && this.renderTocToggle()}
    render () {
        let { book } = this.props

        return (
            <div className={styles.reader_header}>
                <h3 className={styles.titleArea}>
                    <a href="javascript:void(0)">{book.metadata.book_title}</a>
                </h3>
                <div className={styles.header_controls}></div>
            </div>
        )
    }
    //
    // <a href="javascript:void(0)" className={styleCommon.link_btn_df}>
    //     <span className={styleCommon.btn_text}>购买</span>
    // </a>
}

const selectors = createSelector([
    state => state.book
], book => {
    return { book }
})

export default connect(selectors)(Header)
// export default Header
