import React, { Component } from 'react'
import styles from './styles.less'

class SearchResults extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount () {

    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.results != this.props.results
    }

    handleSearchClick (cfi, highlight) {
        this.props.gotoSearchResult(cfi + '/1:0', highlight)
    }

    render () {
        let { results } = this.props

        return (
            <div className={styles.result}>
                <div className={styles.search_result}>
                    <h4 className={styles.results_title}>搜索结果 {results.length}个</h4>
                    <ul>
                        {results.map((data, i) => {
                            return (
                                <li className={styles.result_item} key={i}>
                                    <a href="javascript:void(0)" onClick={this.handleSearchClick.bind(this, data.cfi, data.highlight)}>
                                        <span className={styles.result_title}>
                                            {data.title}
                                        </span>
                                        <p className={styles.abstract} dangerouslySetInnerHTML={{__html: data.highlight}}></p>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}


// <li className={styles.result_item}>
//     <span className={styles.result_title}>
//         序：生命中多添一盏明灯
//     </span>
//     <p className={styles.abstract}>
//         序：生命中多添一盏明灯序：生命中多添一盏明灯序：生命中多添一盏明灯
//     </p>
// </li>
// <li className={styles.result_item}>
//     <span className={styles.result_title}>
//         序：生命中多添一盏明灯
//     </span>
//     <p className={styles.abstract}>
//         序：生命中多添一盏明灯序：生命中多添一盏明灯序：生命中多添一盏明灯
//     </p>
// </li>
// <li className={styles.result_item}>
//     <span className={styles.result_title}>
//         序：生命中多添一盏明灯
//     </span>
//     <p className={styles.abstract}>
//         序：生命中多添一盏明灯序：生命中多添一盏明灯序：生命中多添一盏明灯
//     </p>
// </li>

export default SearchResults
