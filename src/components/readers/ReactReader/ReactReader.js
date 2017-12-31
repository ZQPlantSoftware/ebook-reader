import React, {Component, PropTypes} from 'react'
import { EpubView, Toolbar, Sidebar, Header, BookMark, Probation } from '..'

import styles from './styles.less'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class ReactReader extends Component {

    constructor (props) {
        super(props)
        const { location } = this.props

        this.state = {
            toc: [],
            location: location,
            expanedToc: false,
            page: {
                totalPages: 0,
                currentPage: 0,
                currentLocation: null,
                currentPercentage: 0,
                currentChapter: null,
                page: null                  // EPUBJS 原生page对象
            }
        }
    }

    next () {
        return this.refs.reader.nextPage()
    }

    prev () {
        return this.refs.reader.prevPage()
    }

    pageChanged (page) {
        this.props.dispatch({
            type: 'book/ctf/change',
            cfi: page.currentLocation,
            page: page
        })
        params.percentage = page.currentPercentage

        this.setState({
            page: { ...this.state.page, ...page }
        })

    }

    setPagePercent (percent) {
        this.setState({
            pagePercent: percent
        })
    }

    onTocChange (toc) {
        const {tocChanged} = this.props
        this.setState({
          toc: toc
        }, () => tocChanged && tocChanged(toc))
    }

    onLocationChange (loc) {
        const { locationChanged } = this.props
        return locationChanged && locationChanged(loc)
    }

    goto (target) {
        return this.refs.reader.goto(target)
    }

    gotoPercentage (percentage) {
        this.refs.reader.goto(percentage+'%')
    }

    setLocation (loc) {
        this.setState({
            location: loc
        })
    }

    getCurrentLocationCfi () {
        return this.refs.reader.getCurrentLocationCfi()
    }

    addBook (book) {
        this.props.dispatch({
            type: 'book/add',
            data: book
        })
    }

    addBookFull (book) {
        this.props.dispatch({
            type: 'book/full/add',
            data: book
        })
    }

    computHeight () {
        return this.props.dispatch({type: 'book/height/new'})
    }

    gotoSearchResult (cfi, str) {
        let boot = this.refs.reader.book
        boot.gotoCfi(cfi)
        boot.on("renderer:chapterDisplayed", function () {
            let iframeDoc = $('iframe')[0].contentDocument;
            $(iframeDoc).find('body').highlight(str, { element:'span' })
        })
    }

    componentDidMount () {
        //this.bindEventEmiter()
    }

    render () {
        const { title, showToc, loadingView, book, dispatch } = this.props
        const { toc, location, expanedToc, page } = this.state
        const clickTest = this.clickTest

        return (
          <div className={styles.container}>
            <div ref="article" id="article_wrapper" className={styles.article} style={book.readingType === 'h' ? {} : { height: book.chapter.height }}>
                <div className={styles.inner}>
                    <div className={styles.page} style={book.readingType === 'h' ? {} : { height: book.chapter.height }}>
                        <Header title={title} />
                        <div className={styles.reader} style={{'height': '100%'}} ref="reader_wrapper">
                            {book.mount && (
                                <EpubView
                                  ref='reader'
                                  details={book.details}
                                  pageList={book.pageList}
                                  page={book.page}
                                  readingType={book.readingType}
                                  locations={book.locations}
                                  probation={book.params.probation}
                                  outOfProbation={book.page.outOfProbation}
                                  chapter={book.chapter}
                                  loading={book.loading}
                                  params={book.params}
                                  location={location}
                                  loadingView={loadingView}
                                  dispatch={dispatch}

                                  computHeight={this.computHeight.bind(this)}
                                  addBook={this.addBook.bind(this)}
                                  addBookFull={this.addBookFull.bind(this)}
                                  pageChanged={this.pageChanged.bind(this)}
                                  tocChanged={this.onTocChange.bind(this)}
                                  setPagePercent={this.setPagePercent.bind(this)}
                                  locationChanged={this.onLocationChange.bind(this)}
                                />
                            )}
                            <Probation />
                        </div>
                    </div>
                </div>
                <BookMark getCurrentLocationCfi={this.getCurrentLocationCfi.bind(this)}/>

                {/*{*/}
                  {/*book.details.id && (*/}
                      <Sidebar page={page}
                               prev={this.prev.bind(this)}
                               next={this.next.bind(this)}
                               setLocation={this.setLocation.bind(this)}
                               toc={toc}
                               reader={this.refs.reader}
                               gotoPercentage={this.gotoPercentage.bind(this)}
                               goto={this.goto.bind(this)}/>
                    {/*)*/}
                {/*}*/}
            </div>
            <Toolbar gotoSearchResult={this.gotoSearchResult.bind(this)}/>
            {
              book.details.id && (
                  <progress
                      className={styles.reading_progress}
                      max="100"
                      value={Math.floor(book.page.currentPage / book.page.totalPages * 100)}>
                  </progress>
                )
            }
          </div>
        )
  }
}
//<Toolbar />

class LoadingView extends Component {
    render () {
        return <div className={styles.loadingView}>加载中… </div>
    }
}

ReactReader.defaultProps = {
    loadingView: <LoadingView />,
    locationChanged: null,
    tocChanged: null,
    showToc: true
}

ReactReader.propTypes = {
    title: PropTypes.string,
    loadingView: PropTypes.element,
    url: PropTypes.string,
    showToc: PropTypes.bool,
    location: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    locationChanged: PropTypes.func,
    tocChanged: PropTypes.func
}

const selectors = createSelector([
    state => state.bookMarks,
    state => state.book
], (bookMarks, book) => {
    return { bookMarks, book }
})

export default connect(selectors)(ReactReader)
