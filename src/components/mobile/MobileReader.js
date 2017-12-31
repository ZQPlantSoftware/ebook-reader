import React, { Component } from 'react'

class MobileReader extends Component {
    constructor (props) {
        super(props)
        this.state = {
            appid: 'GZEPub',
            bookId: '',
        }

    }

    componentDidMount () {
        this.initReader()
    }

    /**
    * 渲染结束
    */
    readerDidRendition () {
        let stored = localStorage.getItem(
            this.book.generateBookKey()+ '-' + this.props.bid + '-' +'locations')

        if (stored) {
            return this.book.locations.load(stored)
        } else {
            return this.book.locations.generate(250)
        }
    }

    initReader () {
        let { getTheme, dispatch } = this.props

        EPUBJS.Hooks.register("beforeChapterDisplay").pageTurns = (callback, renderer) => {
            this.bindPaginationEvent(renderer)
            let theme = getTheme()

            try {
                let tocs = this.book.toc
                let pos = renderer.currentChapter.spinePos
                for (var i = 0;i < tocs.length; i++ ){
                    if (pos >= tocs[i].spinePos &&
                        (tocs[i + 1] ?
                            (pos < tocs[i + 1].spinePos) : true)) {
                        dispatch({type: 'book/currentToc', payload: tocs[i]})
                        break
                    }
                }

                let style = renderer.doc.createElement("style")
                style.innerHTML = " body { color: "+ theme.color +"; font-family: sans-serif;} .cover {width: 100%; height: 100%;} img {width: 100% !important;} p { font-size: "+ theme.textSize +"px; line-height: " + theme.lineHeight + "px; text-indent : 20px;}"
                renderer.doc.head.appendChild(style)
                callback()
            } catch(e) {
                callback()
            }
        }

        EPUBJS.Hooks.register('beforeChapterDisplay').pageAnimation = function (callback, renderer) {
            window.setTimeout(function () {
                let style = renderer.doc.createElement("style")
                style.innerHTML = "*{-webkit-transition: transform {t} ease;-moz-transition: tranform {t} ease;-o-transition: transform {t} ease;-ms-transition: transform {t} ease;transition: transform {t} ease;}"
                style.innerHTML = style.innerHTML.split("{t}").join("0.5s")
                renderer.doc.body.appendChild(style)

            }, 100)
            if (callback) callback()
        }

        EPUBJS.Hooks.register('beforeChapterDisplay').swipeDetection = function (callback, renderer) {
            let script = renderer.doc.createElement('script')
            script.text = "!function(a,b,c){function f(a){d=a.touches[0].clientX,e=a.touches[0].clientY}function g(f){if(d&&e){var g=f.touches[0].clientX,h=f.touches[0].clientY,i=d-g,j=e-h;Math.abs(i)>Math.abs(j)&&(i>a?b():i<0-a&&c()),d=null,e=null}}var d=null,e=null;document.addEventListener('touchstart',f,!1),document.addEventListener('touchmove',g,!1)}";
            /* (threshold, leftswipe, rightswipe) */
            // script.text += "(10,function(){parent.book.nextPage()},function(){parent.book.prevPage()});"
            renderer.doc.head.appendChild(script)
            if (callback) callback()
        }

        EPUBJS.Render.Iframe.prototype.setLeft = function(leftPos){
            this.docEl.style[this.transform] = 'translate('+ (-leftPos) + 'px, 0)';
        }

        let { appid, bookId } = this.state
        let { details, dispatchToc } = this.props

        let book = this.book = window.book = ePub(details.url, {
            restore: true,
            width: (document.body.clientWidth - 40),
            height: (document.body.clientHeight - 45),
            online: true
        });

        this.rendition = book.renderTo("reader")
        this.rendition
            .then(this.readerDidRendition.bind(this))
            .then(() => {

            this.refreshPage()

            // Save out the generated locations to JSON
            localStorage.setItem(
                book.generateBookKey() + '-' + this.props.bid + '-' + 'locations',
                book.locations.save());
        })

        book.getMetadata().then(meta => {
            document.title = meta.bookTitle + " – " + meta.creator

            let bookIdNew = [meta.bookTitle, meta.creator, meta.identifier, meta.publisher].join(":")
            let curpostmp = localStorage.getItem(this.state.appid + "|" + bookId + "|curPosCfi")

            if(this.state.bookId !== bookId)
                this.setState({ bookId: bookId })

            if (curpostmp)
                this.book.goto(curpostmp)

            book.on('renderer:locationChanged', locationChanged)
        })

        book.getToc().then(toc => {
            dispatchToc(toc)
        })

        let locationChanged = locationCfi => {
            localStorage.setItem(this.state.appid + "|" + bookId + "|curPosCfi", book.getCurrentLocationCfi())
            this.refreshPage()
        }

        this.gotoPercentage = percentage => {
            if(percentage === 1) {
                return rendition.firstPage()
            }

            let cfi = book.locations.cfiFromPercentage(percentage)
            return this.book.gotoCfi(cfi)
        }

        this.goto = index => this.book.goto(index)
    }

    refreshPage () {
        let currentLocation = this.book.getCurrentLocationCfi();
        // Get the Percentage (or location) from that CFI
        let currentPercentage = this.book.locations.percentageFromCfi(currentLocation);

        this.props.pageChanged({
            currentPercentage: currentPercentage
        })
    }

    bindPaginationEvent (renderer) {
        //绑定的事件
        let startPosition, endPosition, deltaX, deltaY, moveLength

        let $content = $(renderer.element.contentWindow)
        let that = this
        let { toggleBar } = this.props

        $content.off('touchstart')
            .off('touchmove')
            .off('touchend')
            // .off('click')

        $content
            .bind('touchstart', touchStartHandle)
            .bind('touchmove', touchMoveHandle)
            .bind('touchend', touchEndHandle)
            // .bind('click', clickHandle)

        function clickHandle(event) {
            event.stopPropagation()
            toggleBar()
        }

        function touchMoveHandle(e) {
            let touch = e.touches[0]
            endPosition = {
                x: touch.pageX,
                y: touch.pageY
            }

            deltaX = endPosition.x - startPosition.x
            deltaY = endPosition.y - startPosition.y
            moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2))

            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
        }

        function touchStartHandle (e) {
            var touch = e.touches[0]
            startPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
        }

        function touchEndHandle (e) {
            if ( !deltaX || Math.abs(deltaX) <= 10) {
                deltaX = 0
                return clickHandle(e)
            }

            if (deltaX < 0) {
                that.book.nextPage()
                deltaX = 0
            } else {
                that.book.prevPage()
                deltaX = 0
            }
        }
    }

    render () {
        const { outOfProbation } = this.props

        let style = {}
        if(outOfProbation)
            style['display'] = 'none'

        return (
            <div id="reader" style={ style }></div>
        )
    }
}

export default MobileReader
