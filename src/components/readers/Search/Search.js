import React, { Component } from 'react'
import styles from './styles.less'
import SearchResults from './SearchResults'
import { toSearch } from '../../../services/book.js'

class Search extends Component {
    constructor (props) {
        super(props)

        this.state = {
            content: null,
            results: []
        }

    }

    search () {
        let content = this.refs.searchContent.value
        //clear highlight when it begin to search
        // let $body = $($('iframe')[0].contentDocument).find('body')
        // $body.unhighlight()
        // $body.highlight(content, { element: 'span' })

        this.props.toSearch(content)

        toSearch({data: {str: content, bid: this.props.bid}}).then(data => {
            $(this.refs.searchContent).attr("disabled", false)
            this.setState({results: data.jsonResult.data})
        })
    }

    handleKeyDown (e) {

        if (e.keyCode == 13) {
            this.search()
            $(this.refs.searchContent).attr("disabled", true)
            return false
        }

    }

    render () {
        let { gotoSearchResult } = this.props
        let { results } = this.state

        return (
            <div className={styles.search_dialog}>
                <h3 className={styles.dialog_title}>搜索本文</h3>
                <div className={styles.search_box}>
                    <div className={styles.search_form}>
                        <input type="text"
                            onKeyDown={this.handleKeyDown.bind(this)}
                            className={styles.search_box}
                            ref="searchContent"
                            placeholder="输入字词或者页码"/>
                        <button className="fa fa-search" type="button" onClick={this.search.bind(this)}></button>
                    </div>
                    <SearchResults gotoSearchResult={gotoSearchResult} results={results}/>
                </div>
            </div>
        )
    }
}

export default Search
