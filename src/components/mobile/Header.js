import React, { Component } from 'react'

class Header extends Component {
    constructor (props) {
        super(props)

        this.state = {}
    }

    render () {
        let { title, theme } = this.props

        return (
            <div className="header">
                <h3 id="title">
                    <a href="javascript:void(0);"
                       style={{"color": theme.color}}
                       onClick={ () => { location.back() } }>{ title }</a>
                </h3>
            </div>
        )
    }
}

export default Header
