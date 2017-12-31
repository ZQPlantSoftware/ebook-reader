import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Themes extends Component {
    constructor (props) {
        super(props)
    }

    handleThemeClick (theme) {
        let $body = $($('iframe')[0].contentDocument).find('body')
        $body.css("color", theme.color + " !important")
        this.props.themeChanged(theme)
    }

    handleFamilyClick (px) {
        // let $body = $($('iframe')[0].contentDocument).find('body')
        // $body.css("font-size", px + "px")

        let $head = $($('iframe')[0].contentDocument).find('head')
        $head.html($head.html() +
            "<style> p { font-size: " + px + "px; } </style>")
        this.props.themeChanged({textSize: px})
    }

    handleHeightClick (px) {
        let $head = $($('iframe')[0].contentDocument).find('head')
        $head.html($head.html() +
            "<style> p { line-height: " + px + "px; } </style>")
        // $body.css("line-height", px + "px")
        this.props.themeChanged({lineHeight: px})
    }

    shouldComponentUpdate (newProps) {
        return newProps.theme != this.props.theme
    }

    render () {
        let { theme } = this.props

        return (
            <div className="themes-box-2">
                <ul>
                    <li>
                        <span className="title">字体</span>
                        <span className={"g-box circle" + (theme.theme.textSize === 14 ? " active": "")}
                              onClick={this.handleFamilyClick.bind(this, 14)}>
                            &nbsp;&nbsp;小
                        </span>
                        <span className={"g-box circle" + (theme.theme.textSize === 16 ? " active": "")}
                              onClick={this.handleFamilyClick.bind(this, 16)}>
                            &nbsp;&nbsp;中
                        </span>
                        <span className={"g-box circle" + (theme.theme.textSize === 20 ? " active": "")}
                              onClick={this.handleFamilyClick.bind(this, 20)}>
                            &nbsp;&nbsp;大
                        </span>
                    </li>
                    <li>
                        <span className="title">行间距</span>
                        <span className={"g-box circle" + (theme.theme.lineHeight === 18 ? " active": "")}
                              onClick={this.handleHeightClick.bind(this, 18)}>
                            &nbsp;&nbsp;小
                        </span>
                        {theme.lineHeight}
                        <span className={"g-box circle" + (theme.theme.lineHeight === 22 ? " active": "")}
                              onClick={this.handleHeightClick.bind(this, 22)}>
                            &nbsp;&nbsp;中
                        </span>
                        <span className={"g-box circle" + (theme.theme.lineHeight === 26 ? " active": "")}
                              onClick={this.handleHeightClick.bind(this, 26)}>
                            &nbsp;&nbsp;大
                        </span>
                    </li>
                    <li>
                        <span className="title">背景</span>

                        {theme.themes.map(item => {
                            let cls = "bg-block circle"

                            if (theme.theme.id === item.id) {
                                cls += " active"
                            }

                            return (
                                <span key={item.id}
                                    className={cls}
                                    onClick={this.handleThemeClick.bind(this, item)}
                                    style={{"backgroundColor": item.backgroundColor, "color": item.color}}>

                                    {/*{theme.theme.id === item.id && (<i className="gzi gzi-active"></i>)}*/}
                                </span>
                            )
                        })}
                    </li>
                </ul>

            </div>
        )
    }
}

const selectors = createSelector([
    state => state.theme
], theme => {
    return { theme }
})

export default connect(selectors)(Themes)
