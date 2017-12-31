import React, { Component, PropTypes } from 'react'
import styles from './styles.less'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Pagination extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showPageNum: false,
            changePage: 0
        }
    }

    togglePageNum () {
        let { changePage, showPageNum } = this.state

        if(!showPageNum)
            changePage = this.props.book.page.currentPage

        this.setState({
            showPageNum: !this.state.showPageNum,
            changePage: changePage
        })
    }

    handleChangePage (event) {
        this.setState({
            changePage: event.target.value
        })
    }

    render () {
        let { goTo, book, page, prev, next } = this.props
        let { showPageNum, changePage } = this.state

        return book.readingType === 'h' ?
            (<div className={styles.pagination}>
                <div className={styles.page_control}>
                    { book.inProcess && (<div className={styles.can_witch}></div>)}
                    <div className={styles.prev+' fa fa-angle-left'} onClick={prev} title="上一页"></div>
                    <div className={styles.next+' fa fa-angle-right'} onClick={() => { book.page.outOfProbation || next()}}  title="下一页"></div>
                </div>
                <div className={styles.page_portal}>
                    <div className={styles.page_info}>
                        <span><span id="currentPage">{page.currentPage}</span> / {page.totalPages} 页</span>
                        <a href="javascript:void(0)"
                            onClick={this.togglePageNum.bind(this)}
                            className={styles.page_form_switch}>
                                <i className={styles.switch_arrow}></i>
                        </a>
                    </div>
                    {showPageNum ?
                        (<div className={styles.page_select}>
                            <div className={styles.page_btn_group}>
                                <input type="text" value={changePage} ref="pageNum" onChange={this.handleChangePage.bind(this)}/>
                                <button onClick={() => { goTo(changePage) }}></button>
                            </div>
                            <span>当前页</span>
                        </div>):<div></div>}
                </div>
                <div className="page-subsequent active"></div>
            </div>
        ) : (<div></div>)
    }
}

export default Pagination
