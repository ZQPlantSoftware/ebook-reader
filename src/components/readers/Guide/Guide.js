import React, { Component } from 'react'
import styles from './styles.less'

class Guide extends Component {

    constructor (props) {
        super(props)
    }

    render () {
        let { togglePanel } = this.props

        return (
            <div className={styles.shortcut_tips}>
                <div className={styles.hd}>
                    欢迎使用方正EPUB阅读器
                    <a href="javascript:void(0)" onClick={() => { togglePanel('guide') } } style={{'float':'right'}} className={styles.bn_flat}>关闭提示</a>
                </div>
                <div className={styles.bd}>

                </div>
            </div>
        )
    }
}

export default Guide
