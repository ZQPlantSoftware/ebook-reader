import React, { Component } from 'react'
import styles from './styles.less'
import stySib from '../Sidebar/styles.less'
import moment from 'moment'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class BookMarks extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isMarked:false
        }
    }

    toggleMark () {
        const { dispatch, book } = this.props
        let cfi = book.page.page.cfi //this.props.getCurrentLocationCfi()

        if(this.state.isMarked) {
            dispatch({
                type: 'bookMarks/del',
                data: {
                    user_id: book.params.uid,
                    book_id: book.params.bid,
                    page: book.page.currentPage
                }
            })
        } else {
            if(book.params.uid === null || book.params.uid === -1) {
                return alert("请登录后重试!");
            }
            let abst = window.Helper.textFromPoint()
            if(abst.length > 40)
                abst = abst.substring(0, 40) + '...'

            dispatch({
                type: 'bookMarks/add',
                data: {
                    book_id: book.params.bid,
                    user_id: book.params.uid,
                    abst: abst,
                    description: '',
                    percentage: book.page.currentPercentage,
                    cfi: cfi,
                    page: book.page.currentPage
                }
            })
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextState.isMarked !== this.state.isMarked
            // || nextProps.book.page.currentPage !== this.props.book.page.currentPage
            || nextProps.book.page.page.cfi !== this.props.book.page.page.cfi
            || nextProps.bookMarks !== this.props.bookMarks
    }

    componentWillUpdate (nextProps, nextState) {
        // if(nextProps.book.page.currentPage !== this.props.book.page.currentPage
        if(nextProps.book.page.page.cfi !== this.props.book.page.page.cfi
            || nextProps.bookMarks !== this.props.bookMarks)
            this.isMarked(nextProps.book, nextState.isMarked, nextProps.bookMarks)
    }

    isMarked (book, isMarked, bookMarks) {
        let item

        for(let i = 0;i < bookMarks.bookMarks.length; i++) {
            if( bookMarks.bookMarks[i].cfi === book.page.page.cfi ) {
                // if( bookMarks.bookMarks[i].page === book.page.currentPage ) {
                return this.setState({
                    isMarked: true
                })
            }
        }

        if(isMarked)
            this.setState({
                isMarked: false
            })
    }

    render () {
        const { isMarked } = this.state
        const { book } = this.props

        return (
              <div className={styles.bookmarks_layout} title="添加书签">
                { book.readingType !== 'v' && !book.page.outOfProbation &&
                  <i className={styles.bookmark + ' ' + (isMarked && styles.active)}
                      onClick={this.toggleMark.bind(this)}></i>
                  }
              </div>
          )
    }
}

BookMarks.defaultProps = {
    book: {
        ctf: '',
        page: {
            currentPage: 1,
            currentPercentage: 1
        }
    }
}

const selectors = createSelector([
    state => state.bookMarks,
    state => state.book
], (bookMarks, book) => {
    return { bookMarks, book }
});

export default connect(selectors)(BookMarks)
