import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Toc extends Component {
    constructor (props) {
        super(props)

        this.state = {
            height: $(window).height()
        }
    }

    render () {
        let { book, gotoToc, toggleToc } = this.props
        let { height } = this.state

        return (
            <div className="toc">
                <div className="hd">
                    <h2>~ 目录 ~</h2>
                </div>
                <div className="bd" style={{'height': (height - 78 - 42) + 'px'}}>
                    <ul>
                        {book.toc.map((item, i) => {
                            return (
                                <li className="toc-item level-0" key={i} onClick={ () => { gotoToc(item.href) } }>
                                    <a href="javascript:void(0)">
                                        <span className="text">{item.label}</span>
                                    </a>
                                    <ul>
                                    {
                                        item.subitems.map((subItem, i) => {
                                            return (
                                                <li className="toc-item level-1" key={subItem.cfi}
                                                        onClick={ (e) => { gotoToc(subItem.cfi); e.stopPropagation() } }>
                                                    <a href="javascript:void(0)">
                                                        <span className="text">{subItem.label}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                    </ul>
                                </li>

                            )
                        })}
                    </ul>
                    <div className="clearfix"></div>
                </div>
                <div className="ft">
                    <div className="close" onClick={ toggleToc }>
                        <i className="gzi gzi-more"></i>
                    </div>
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

export default connect(selectors)(Toc)
