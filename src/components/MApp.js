import React, { Component } from 'react'
import styles from './mApp.less'

import MobileReader from './mobile/MobileReader'
import Header from './mobile/Header'
import Footer from './mobile/Footer'
import Toc from './mobile/Toc'
import Loading from './mobile/Loading'
import Nav from './mobile/Nav'
import Theme from './mobile/Theme'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

// import './mobile/index.less'

class MApp extends Component {

    constructor (props) {
        super(props)

        this.state = {
            toc: false,
            bar: false,
            ttheme: false
        }
    }

    gotoPercentage (num) {
        this.refs.reader.gotoPercentage(num)
    }

    gotoLocation (loc) {
        this.refs.reader.goto(loc)
    }

    gotoToc (toc) {
        this.setState({
            toc: false
        })

        this.gotoLocation(toc)
    }

    toggleToc () {
        this.setState({
            toc: !this.state.toc
        })
    }

    toggleTheme () {
        this.setState({
            ttheme: !this.state.ttheme
        })
    }

    toggleBar () {
        let newState = {}
        if (this.state.bar) {
            newState["ttheme"] = false
        }

        newState["bar"] = !this.state.bar
        this.setState(newState)
    }

    dispatchToc (tocs) {
        this.props.dispatch({
            type: 'book/toc/success',
            data: tocs
        })
    }

    pageChanged (page) {
        page.currentPercentage = page.currentPercentage * 100

        this.props.dispatch({
            type: 'book/page',
            data: page
        })
    }

    themeChanged (theme) {
        this.props.dispatch({
            type: 'theme/change',
            data: theme
        })
    }

    handleTouchMove (event) {
        if (event.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!event.defaultPrevented) {
                event.preventDefault();
            }
        }
    }

    getTheme () {
        return this.props.theme
    }

    render () {
        let { toc, bar, ttheme } = this.state
        let { book, theme, dispatch } = this.props

        return (
            <div id="content" onTouchMove={this.handleTouchMove.bind(this)} style={{"backgroundColor": theme.backgroundColor}}>
                <Header title={ book.currentToc.label } theme={theme}/>
                {/*<Header title={ book.metadata.book_title } theme={theme}/>*/}

                { //bar &&
                    //(<Nav title={ book.metadata.book_title }
                    //    />)
                }

                { book.mount &&
                    (<MobileReader ref="reader"
                            dispatchToc={this.dispatchToc.bind(this)}
                            params={book.params}
                            details={book.details}
                            getTheme={this.getTheme.bind(this)}
                            pageChanged={this.pageChanged.bind(this)}
                            toggleBar={this.toggleBar.bind(this)}
                            bid={this.props.book.details.bid}
                            outOfProbation={book.outOfProbation}
                            dispatch={dispatch}
                            />)}
                { (!book.mount || book.outOfProbation) &&
                    <Loading toggleBar={this.toggleBar.bind(this)}/>
                }
                { toc &&
                    (<Toc gotoLocation={this.gotoLocation.bind(this)}
                            gotoToc={this.gotoToc.bind(this)}
                            toggleToc={this.toggleToc.bind(this)}/>)}

                { ttheme &&
                    (<Theme themeChanged={this.themeChanged.bind(this)}/>)
                }

                { bar &&
                    (<Footer
                        gotoPercentage={this.gotoPercentage.bind(this)}
                        toggleToc={this.toggleToc.bind(this)}
                        toggleTheme={this.toggleTheme.bind(this)}
                        />)}
            </div>
        )
    }
}

const selectors = createSelector([
    state => state.book,
    state => state.theme.theme
], (book, theme) => {
    return { book, theme }
})

export default connect(selectors)(MApp)
