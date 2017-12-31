import React, { Component } from 'react'
import styles from './styles.less'
import stySib from '../Sidebar/styles.less'
import moment from 'moment'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Annotations extends Component {
    constructor (props) {
        super(props)

        this.props.dispatch({
            type:'annotator/get',
            data: {
                user_id: window.params.uid,
                book_id: window.params.bid
            }
        })
    }

    delAnnHandle (id) {
        this.props.dispatch({
            type: 'annotator/del',
            data: {
                id: id
            }
        })
    }

    gotoAnnotation (item) {
        this.props.gotoPercentage(item.percentage)
    }

    mapAnnotator (annotators) {
        let { setPercentage } = this.props
        let chapter = ''
        let result = annotators.map((item, i) => {
            let res = (
                    <li className={styles.annotations_item} key={item.id}>
                        <div className={styles.annotation_content}>
                            <div className={styles.quote}>{item.quote}</div>
                            <div className={styles.note}>{item.text}</div>
                            <div className={styles.actions}>
                                <div className={styles.common_actions}>
                                    <a href="javascript:void(0)" onClick={function() { setPercentage(item.percentage) }} className="jump-annotation">跳至此段</a>
                                </div>
                                <div className={styles.edit_actions}>
                                    <span className="timestamp">{item.creatd}</span>
                                    <span className="private-info-wrapper" style={{display: 'none'}}>
                                        <i className="middle-dot"></i>
                                        <span className="private-info">仅自己可见</span>
                                    </span>
                                    <a href="#" className={styles.delete_annotation} onClick={this.delAnnHandle.bind(this, item.id)}>删除</a>
                                </div>
                            </div>
                        </div>
                    </li>
                )
                item.chapter !== chapter ? chapter = item.chapter : ''

                return res
        })
        return result
    }

    render () {
        const { annotator, setLocation, expaned, closeExpaned } = this.props

        return (
              <div className={stySib.panels_container}>
                <a href="javascript:void(0)" className={stySib.close} onClick={closeExpaned}>×</a>
                <div className={styles.annotations +' '+ styles.controls_content}>
                    <div className={styles.panel_head}>
                        <h2>我的批注</h2>
                    </div>
                    <div className={styles.panel_body}>
                        <ul className={styles.annotations_list}>
                            {this.mapAnnotator(annotator.annotator)}
                        </ul>
                    </div>
                </div>
            </div>
          )
    }
}

const selectors = createSelector([
    state => state.annotator
], annotator => {
    return { annotator }
})

export default connect(selectors)(Annotations)

// <a href="#" className="comment-annotation"> 回复 </a>
// <i className={styles.middle_dot}></i>
// <span className="share-wrapper" style={{display: 'inline'}}>
//     <a href="#" className="share-annotation">推荐</a>
//     <i className={styles.middle_dot}></i>
// </span>

//<a href="#" className={styles.modify_annotation}>修改</a>
// &nbsp;|&nbsp;
