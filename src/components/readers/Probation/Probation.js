import React, { Component, PropTypes } from 'react'
import styles from './styles.less'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Probation extends Component {
    constructor (props) {
        super(props)

        this.state = {
            word: '.'
        }

        this.state.inv = setInterval(() => {
            let word = this.state.word
            if (word.length < 4) {
                this.setState({
                    word: word + '.'
                })
                return
            }

            this.setState({
                word: '.'
            })
        }, 1000)
    }


    componentWillUnmount () {
        clearInterval(this.state.inv)
    }

    render () {
        let { book } = this.props
        let { word } = this.state

        return (
            <div className={styles.custom} style={(book.page.outOfProbation && book.params.probation != 100) || book.loading ? {display:'block'} : {}}>
                <div className={styles.purchase_guide}>
                    <div className={styles.item}>
                        {
                            (() => {
                                if (book.page.outOfProbation) {
                                    return "试读已结束。购买后可以继续阅读"
                                }
                                if (book.loading) {
                                    return book.message || "加载中" + word
                                }
                            })()
                        }
                    </div>
                    { book.page.outOfProbation &&
                        (
                            <div className={styles.item}>
                                 <a className={styles.btn} href={"http://www.csspw.cn/shop/pagelayout/list.do?nodeid=15923&releaselibID=" + book.details.bid + "&isceb=1"}>购买全书</a>
                                 {/*<a className={ styles.btn} href={"http://www.qxcbs.com/bookshop/pagelayout.action?nodeID=267&releaselibID=" + book.details.bid + "&isceb=1"}>购买全书</a>*/}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

const selectors = createSelector([
    state => state.book
], book => {
    return { book }
})

export default connect(selectors)(Probation)
