import React, { Component } from 'react'

import Pagination from './Pagination'

import './index.less'

class Footer extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        let { gotoPage, toggleToc, gotoPercentage, toggleTheme } = this.props

        return (
            <div className="footer-bar">
                <Pagination gotoPage={ gotoPage } gotoPercentage={gotoPercentage}/>
                <ul className="footer-btns">
                    <li className="f-btn">
                        <a href="javascript:void(0)" onClick={toggleToc}>
                            <i className="gzi gzi-order"></i>
                            <label>目录</label>
                        </a>
                    </li>
                    {/*<li className="f-btn">*/}
                        {/*<a href="javascript:void(0)">*/}
                            {/*<i className="gzi gzi-comment">=</i>*/}
                            {/*<label>书签</label>*/}
                        {/*</a>*/}
                    {/*</li>*/}
                    <li className="f-btn">
                        <a href="javascript:void(0)" onClick={toggleTheme}>
                            <i className="gzi gzi-themes"></i>
                            <label>主题</label>
                        </a>
                    </li>
                    {/*<li className="download-app">*/}
                        {/*<span className="btn-download">*/}
                            {/*用客户端打开*/}
                        {/*</span>*/}
                    {/*</li>*/}
                </ul>
            </div>
        )
    }
}

export default Footer
