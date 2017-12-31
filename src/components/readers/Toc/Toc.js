import React, { Component, PropTypes } from 'react'
import styles from './styles.less'
import stySib from '../Sidebar/styles.less'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Toc extends Component {
    constructor (props) {
        super(props)
    }

    generateSubToc (item) {
        return item.subitems.map((subItem, i) => {
            let isOut = this.computeIsOut(subItem, i, item.subitems)

            return (
                <li className={styles.toc_item_child} key={i}>
                    <a onClick={ !isOut && (() => { this.props.setLocation(subItem.href) }) }
                       title="请购买全书" style={ isOut ? {"color": "#bbb"} : {} }>
                        {subItem.label}</a>
                </li>
            )
        })
    }

    computeIsOut (item, i, list) {
        let { book } = this.props
        let isOut = book.probationObject.spinePos
            && item.spinePos > book.probationObject.spinePos

        if (list[i + 1] && isOut)
            isOut = list[i + 1].spinePos > book.probationObject.spinePos

        return isOut
    }

    render () {
        const { toc, setLocation, closeExpaned, book } = this.props
        return (
              <div className={stySib.panels_container}>
                  <a href="javascript:void(0)" className={stySib.close} onClick={closeExpaned}>×</a>
                  <div className={styles.chapters_toc}>
                        <h2>
                            <span className={styles.pattern_left}></span>
                            <span className={styles.title}>目录</span>
                            <span className={styles.pattern_right}></span>
                        </h2>
                        <ul>
                          {toc.map((item, i) => {
                              let isOut =  this.computeIsOut(item, i, toc)

                              return (
                                      <li key={i}>
                                          <a className={styles.toc_item} onClick={ !isOut && (() => {
                                              setLocation(item.href)
                                          }) }  style={ isOut ? {"color": "#bbb"} : {} }
                                          >{item.label}</a>
                                          <ul>
                                              {this.generateSubToc(item)}
                                          </ul>
                                          <div className="clearfix"></div>
                                      </li>
                                  )
                              }
                          )}
                        </ul>
                    </div>
              </div>
          )
    }
}

Toc.defaultProps = {
    toc: []
}

const selectors = createSelector([
    state => state.book
], book => {
    return { book }
})

export default connect(selectors)(Toc)
