import React, {Component, PropTypes} from 'react'

import styles from './styles.less'
import { Search, Guide } from '..'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Toolbar extends Component {

    constructor (props) {
        super(props)

        this.state = {
            show: ''
        }
    }

    toggleVH () {
        this.props.dispatch({type: "book/readingType/toggle"})
    }

    toolbarDisplay () {
        switch (this.state.show) {
            case 'search':
                return (
                    <Search bid={this.props.book.details.bid}
                        gotoSearchResult={this.props.gotoSearchResult}
                        togglePanel={this.togglePanel.bind(this)}
                        toSearch={this.toSearch.bind(this)} />
                )
            case 'guide':
                return (
                    <Guide togglePanel={this.togglePanel.bind(this)} />
                )
        }

    }

    togglePanel (value) {
        if(this.state.show === value) {
            if (this.state.show === 'search') {
                this.toSearch('')
            }

            return this.setState({
                show: ''
            })
        }

        this.setState({
            show: value
        })
    }

    toSearch (searchStr) {
        this.props.dispatch({
            type: 'book/search/toggle',
            searchStr
        })
    }

    render () {
        const { book } = this.props

        return (
            <div>
                { this.toolbarDisplay() }
                <aside className={styles.aside}>
                    <ul className={styles.panel}>
                        {/*<li id="fn-layout" className={styles.sep} data-helper="阅读模式">*/}
                            {/*<a href="javascript:void(0)" onClick={this.toggleVH.bind(this)} title="阅读模式" className={'fa ' + (book.readingType === 'h' ? 'fa-ellipsis-h' : 'fa-ellipsis-v')}></a>*/}
                        {/*</li>*/}
                        <li id="fn-search" data-helper="搜索" className={styles.sep}>
                            <a href="javascript:void(0)" onClick={this.togglePanel.bind(this, 'search')} title="搜索" target="_blank" className="fa fa-search"></a>
                        </li>
                        {/*<li className={styles.fn_helper}>*/}
                            {/*<a href="javascript:void(0)" onClick={this.togglePanel.bind(this, 'guide')} title="指南">指南</a>*/}
                        {/*</li>*/}
                    </ul>
                </aside>
            </div>
        )
    }

}

// <li id="fn-salon" data-helper="评论" className={styles.sep}>
//     <a href="#" title="评论" target="_blank" className="fa fa-comment"></a>
// </li>
// <li id="fn-question" data-helper="提问" className={styles.sep}>
//     <a href="#" title="提问" target="_blank" className="fa fa-question"></a>
// </li>
// <li id="fn-question" data-helper="喜欢" className={styles.sep}>
//     <a href="#" title="喜欢" target="_blank" className="fa fa-heart"></a>
// </li>
// <li id="fn-comment" data-helper="讨论">
//     <a href="#" title="讨论" target="_blank" className="arkicon-salon"></a>
// </li>

const selectors = createSelector([
    state => state.book
], book => {
    return { book }
})

export default connect(selectors)(Toolbar)
