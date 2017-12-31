import React, { Component } from 'react'

class Nav extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        let { title } = this.props

        return (
            <div className="nav">
                <a href="javascript:void(0);" className="title">
                    <i className=""> &#60; </i>
                    方正阅读 － { title }
                </a>
            </div>
        )
    }
}

export default Nav
