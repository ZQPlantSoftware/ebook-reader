import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import EPUBJSHook from '../../../plugins/hook.js'

class EpubView extends Component {

    constructor (props) {
        super(props)
        this.state = {
            appid: 'GZEPub',
            bookId: '',
            prevflag: false,        // scroll flag
            isLoaded: false,
            toc: []
        }

        this.book = this.rendition = this.prevPage = this.nextPage = null
        // EPUBJSHook.init()
        EPUBJS.Hooks.register('beforeChapterDisplay').pageTurns = (callback, renderer) => {
            // this.bindPaginationEvent(renderer)
            try {
                let style = renderer.doc.createElement('style')
                style.innerHTML = '@font-face {font-family:"lth"; src: url("../../../../../assets/fonts/LTXH.TTF") format("truetype"); font-weight:normal; font-style: normal;} img {max-width: 100% !important;} body { font-family: "lth"; } .content, p {line-height: 30px; text-indent : 20px;} a { color: #999; }'
                renderer.doc.body.appendChild(style)

                if (renderer.currentChapter.spinePos < 2) {
                    let style1 = renderer.doc.createElement('style')
                    style1.innerHTML = '.cover {width: 100%; height: 100%;} img {width: 100% !important;}'
                    renderer.doc.body.appendChild(style1)
                }

                callback()
            } catch(e) {
                callback()
            }
        }

        EPUBJS.Hooks.register('beforeChapterDisplay').highlight = function (callback, renderer) {
            var s = document.createElement('style')
            s.innerHTML =  '.highlight { background: yellow; font-weight: normal; }'
            renderer.render.document.head.appendChild(s);
            if(callback) callback();
        }
    }

    componentDidMount () {
        const { tocChanged, addBookFull, details, params } = this.props
        let { appid } = this.state

        let book = this.book = ePub({
            restore: true,
            //reload: true,
            online: false,
        })

        let setMetadata = meta => {
            document.title = meta.bookTitle + ' – ' + meta.creator

            let curpostmp = localStorage.getItem(this.state.appid + '|' + params.bid + '|curPosCfi')

            if (curpostmp && (params.probation >= 100 || !params.probation) )
                this.book.goto(curpostmp)

            book.on('renderer:locationChanged', locationChanged)
        }

        let locationChanged = locationCfi => {
            localStorage.setItem(this.state.appid + '|' + params.bid + '|curPosCfi', book.getCurrentLocationCfi())
        }

        // book.open('http://www.csspw.cn/epub/' + params.url)
        book.open(params.url)

        book.getToc().then(toc => {
            tocChanged(toc)
            this.initReader()
    	  })

        // if(params.url && !details.id)
        book.getMetadata().then(setMetadata)
        // else
        //     afterMetadata(this.props.details.metadata)
    }

    componentWillUnmount () {
        this.book = this.rendition = this.prevPage = this.nextPage = null
    }

    shouldComponentUpdate (nextProps, nextState) {
        return !this.state.isLoaded
            || nextProps.location !== this.state.location
            || nextProps.readingType !== this.props.readingType
            || nextProps.outOfProbation !== this.props.outOfProbation
            || nextProps.loading !== this.props.loading
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.location !== this.props.location)
            this.book.goto(this.props.location)
    }

    getCurrentLocationCfi () {
        return this.book.getCurrentLocationCfi()
    }

    initReader () {
        const { viewer } = this.refs
        const { toc } = this.state
        const { location, locationChanged, pageChanged, details, pageList, addBookFull, locations, loading, params } = this.props
        const book = this.book

        this.rendition = this.book.renderTo(viewer, {
            method: 'paginate',
            contained: true,
            width: '100%',
            height: '100%'
        })

        //渲染完成
        this.rendition.then(() => {

            // book.generatePagination().then(() => {
            //     if(params.url && !details.id) {
            //        addBookFull({
            //            book: {
            //                url: params.url,
            //                title: book.metadata.bookTitle,
            //                probation: params.probation
            //            },
            //            metadata: book.metadata,
            //            pages: book.pageList,
            //            spines: book.spine,
            //        })
            //    }
            // })

            if(params.url && !details.id) {
                book.generatePagination().then(() => {
                    addBookFull({
                        book: {
                            url: params.url,
                            title: book.metadata.bookTitle,
                            probation: params.probation
                        },
                        metadata: book.metadata,
                        pages: book.pageList,
                        spines: book.spine,
                        params: params
                    })
                })
            } else {
                book.loadPagination(pageList)
            }

            // generate page
            this.refreshPage()
            EPUBJSHook.pageChanged(book.currentChapter)

            // get probation toc
            if (params.probation) {
                let p = params.probation / 100
                let cfi = this.book.pagination.cfiFromPage(
                parseInt(pageList.length * p))

                let cfiObject = new EPUBJS.EpubCFI(cfi)
                this.props.dispatch({type: 'book/probation/object', payload: cfiObject})
            }

            //bind event
            window.frames[0].onkeydown = this.keyDownEvent.bind(this)
            $(document).scroll(this.mousewhellEvent.bind(this))
        })

        book.pageListReady.then(pageList => this.refreshPage())

        book.on('book:pageChanged', location => {
            this.refreshPage()
            EPUBJSHook.pageChanged(book.currentChapter)
        })

        this.prevPage = () => this.book.prevPage()
        this.nextPage = () => this.book.nextPage()
        this.goto = pageNum => this.book.goto(pageNum)
    }

    scollToPrevChapter () {
        if(this.book.spinePos === 0)
            return

        this.book.prevChapter().then(() => {
            this.props.computHeight()
            this.book.renderer.resize("100%", window.frames[0].document.body.clientHeight, true)

            this.setState({
                prevflag: true
            })
            window.scrollTo(0, window.frames[0].document.body.clientHeight - 150)
        })
    }

    scollToNextChapter () {
        if(this.state.prevflag)
            return this.setState({
                prevflag: false
            })

        if(this.book.spinePos >= this.book.spine.length - 1)
            return

        this.book.forceSingle(true)

        this.book.nextChapter().then(() => {
            this.props.computHeight()
            this.book.renderer.resize("100%", window.frames[0].document.body.clientHeight, true)
            window.scrollTo(0, 2)
        })
    }

    mousewhellEvent (e, delta) {
        let { readingType } = this.props

        if(readingType !== 'v')
            return

        let $window = $(window)

        if(($window.height() + $window.scrollTop()) >= $("#article_wrapper").height())
            this.scollToNextChapter()
        else if($window.scrollTop() === 0)
            this.scollToPrevChapter()
    }

    getCurrentPageNumber() {
        let currentLocation = this.book.getCurrentLocationCfi()
        return this.book.pagination.pageFromCfi(currentLocation)
    }

    refreshPage () {
        let { pageList, probation } = this.props
        let currentLocation = this.book.getCurrentLocationCfi()
        let currentPage = this.book.pagination.pageFromCfi(currentLocation)
        let currentPercentage = currentPage/this.book.pageList.length * 100 //this.book.pagination.percentageFromCfi(currentLocation)
        let currentToc = this.book.toc[this.book.spinePos]
        let page = this.book.pageList[currentPage - 1]

        this.props.pageChanged({
            currentPage: currentPage,
            currentPercentage: currentPercentage,
            currentToc: currentToc,
            currentLocation: currentLocation,
            outOfProbation: probation > 0 && currentPercentage >= probation, //this.book.currentChapter.spinePos >= probation,
            page: page
        })
    }

    keyDownEvent (e) {
        switch(e.code) {
            case 'ArrowDown':
            case 'ArrowRight':
                this.nextPage()
                break
            case 'ArrowUp':
            case 'ArrowLeft':
                this.prevPage()
                break
        }
    }

    render () {
        const { isLoaded } = this.state
        const { loadingView, styles, readingType, chapter, outOfProbation, loading, params } = this.props

        let style = {}
        if(readingType === 'v')
            style['height'] = chapter.height
        else
            style['height'] = '100%'

        if((outOfProbation && params.probation != 100) || loading)
            style['display'] = 'none'

        return (
            <div ref='viewer' style={style}></div>
        )

        // <div ref='viewer'>
        //     {isLoaded && this.renderBook() || loadingView}
        // </div>
    }
}

EpubView.defaultProps = {
    loadingView: null,
    locationChanged: null,
    tocChanged: null
}

EpubView.propTypes = {
    url: PropTypes.string,
    loadingView: PropTypes.element,
    location: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    locationChanged: PropTypes.func,
    tocChanged: PropTypes.func,
    styles: PropTypes.object
}

export default EpubView
