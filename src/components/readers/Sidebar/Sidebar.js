import React, { Component, PropTypes } from 'react'
import styles from './styles.less'
import styleComm from '../../index.less'
import { Toc, BookMarks, Annotations, Pagination } from '..'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Sidebar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            expaned: '',
            showPageNum: false,
            changePage: props.page.currentPage
        }
    }

    goTo (num) {
        let { book } = this.props

        if(num == book.page.currentPage)
            return

        if(!num || isNaN(num))
            return alert("请输入正确页数")

        if(num < 0 || num > book.page.totalPages)
            return alert("输入页码不存在")

        this.props.goto(num)
    }

    toggleSidebar (change) {
        if(this.state.expaned === change)
            change = ''

        this.setState({
            expaned: change
        })
    }

    setPage (pageNum) {
        let { goto, next, prev, reader } = this.props
        this.setState({expaned: ''})

        goto(pageNum + '').then(data => {
            let currentPage = parseInt(document.getElementById('currentPage').innerHTML) //reader.getCurrentPageNumber()

            if (currentPage < pageNum) {
                next().then(() => {
                    currentPage = reader.getCurrentPageNumber()

                    if (currentPage < pageNum) {
                        next()
                    }
                })
            } else if (currentPage > pageNum) {
                prev().then(() => {
                    currentPage = reader.getCurrentPageNumber()
                    if (currentPage > pageNum) {
                        prev()
                    }
                })
            }
        })
    }

    setLocation (cfi) {
        this.setState({expaned: ''})
        this.props.setLocation(cfi)
    }

    setPercentage (percentage) {
        this.setState({expaned: ''})
        this.props.gotoPercentage((percentage * 100))
    }

    closeExpaned () {
        this.setState({expaned: ''})
    }

    tryExpaned (expaned) {
        let { toc, goto } = this.props

        switch(expaned) {
            case 'toc':
                return (
                    <Toc toc={toc} setLocation={this.setLocation.bind(this)} closeExpaned={this.closeExpaned.bind(this)}></Toc>
                )
            case 'bookMarks':
                return (
                    <BookMarks setPage={this.setPage.bind(this)}  closeExpaned={this.closeExpaned.bind(this)}></BookMarks>
                )
            case 'annotations':
                return (
                    <Annotations expaned={expaned}
                        setLocation={this.setLocation.bind(this)}
                        setPercentage={this.setPercentage.bind(this)}
                        closeExpaned={this.closeExpaned.bind(this)}></Annotations>
                )
            default:
                return (<div></div>)
        }
    }

    render () {
        let { toc, toggleToc, setLocation, book, prev, next } = this.props
        let { changePage, expaned } = this.state

        return (
            <aside className={styles.sidebar_control}>
                <div className={styles.controls_panel}>
                    <ul>
                        <li className={styles.controls_item+' '+styles.toggle_toc + ' ' +(expaned === 'toc' && styles.active)}
                            onClick={this.toggleSidebar.bind(this, 'toc')} title="目录">
                            <i className={'fa fa-bars'} aria-hidden="true"></i>
                        </li>
                        <li className={styles.controls_item+ ' '+ styles.toggle_bookmark + ' ' +(expaned === 'bookMarks' && styles.active)}
                            onClick={this.toggleSidebar.bind(this, 'bookMarks')} title="书签">
                            <i className={'fa fa-bookmark'}></i>
                        </li>

                    </ul>
                    { this.tryExpaned(expaned) }
                </div>
                <Pagination
                    goTo = {this.goTo.bind(this)}
                    page = {book.page}
                    book = {book}
                    setLocation = {setLocation}
                    prev = {prev}
                    next = {next}
                />
            </aside>
        )
    }

    // <li className={styles.controls_item+ ' ' +(expaned === 'annotations' && styles.active)}
    //     onClick={this.toggleSidebar.bind(this, 'annotations')}>
    //     <i className={'fa fa-cube'}></i>
    // </li>
}

Sidebar.defaultProps = {
    toc: []
}

const selectors = createSelector([
    state => state.book
], book => {
    return { book }
})

export default connect(selectors)(Sidebar)
