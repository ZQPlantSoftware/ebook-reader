import React, { Component } from 'react'
import styles from './styles.less'
import stySib from '../Sidebar/styles.less'
import moment from 'moment'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class BookMarks extends Component {
    constructor (props) {
        super(props)
    }

    mapBookmark (bookMarks) {
        let { setPage } = this.props
        let chapter = ''
        //<span className={styles.num}>{parseInt(item.percentage)}%</span>
        let result = bookMarks.map((item, i) => {
            let res = (
                    <li className={styles.bookmark_item} key={item.id} onClick={ () => { setPage(item.page) } }>
                        <div className={styles.item_hd}>
                            <div className={styles.percentage}>
                                <i className={styles.bookmark +' '+ styles.active}></i>
                                <span className={styles.num}>第{item.page}页</span>
                            </div>
                            <div className={styles.date}>{moment(item.date).format('YYYY-MM-DD')}</div>
                        </div>
                        <div className={styles.item_bd}>
                            <p className={styles.abstract}>
                                {item.abst}
                            </p>
                        </div>
                    </li>
                )
                item.chapter !== chapter ? chapter = item.chapter : ''

                return res
        })
        return result
    }

    render () {
        const { bookMarks, setLocation, expaned, closeExpaned } = this.props

        return (
              <div className={stySib.panels_container}>
                <a href="javascript:void(0)" className={stySib.close} onClick={closeExpaned}>×</a>
                <div className={styles.bookMarks +' '+ styles.controls_content}>
                    <div className={styles.panel_hd}>
                        <h2>我的书签</h2>
                    </div>
                    <div className={styles.panel_bd}>
                        <ul>
                            {this.mapBookmark(bookMarks.bookMarks)}
                        </ul>
                    </div>
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
