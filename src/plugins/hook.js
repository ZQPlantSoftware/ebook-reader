let first = true
let EPUBJSHook = {
    init: () => {
        // EPUBJS.Hooks.register("beforeChapterDisplay").annotate = (callback, renderer) => {
        //
        //     console.log("[beforeChapterDisplay] renderer:", renderer)
        //
        //     if(first) {
        //         first = false
        //         window.currentChapter = renderer.currentChapter
        //         EPUBJS.core.addScript("../../assets/annotator/annotator.min.js", function() {
        //             EPUBJS.core.addScript("../../src/plugins/annotate.js", function() {
        //                 callback()
        //             }, renderer.doc.head)
        //         }, renderer.doc.head)
        //     } else {
        //         callback()
        //     }
        // }

    },
    pageChanged: newChapter => {

        // EPUBJS.Hooks.register("beforeChapterDisplay").pageTurns = (callback, renderer) => {
        //     // this.bindPaginationEvent(renderer)
        //
        //     try {
        //         let style = renderer.doc.createElement("style")
        //         style.innerHTML = ".cover {width: 100%; height: 100%;} img {width: 100% !important;} p {line-height: 40px; text-indent : 20px;}"
        //         renderer.doc.body.appendChild(style)
        //         callback()
        //     } catch(e) {
        //         callback()
        //     }
        //
        // }
        // let chapter = window.currentChapter
        // //chapter changed
        // if(!chapter || chapter.absolute !== newChapter.absolute) {
        //     window.currentChapter = newChapter
        //     chapter = newChapter
        //     let head = window.frames[0].document.head
        //
        //     //EPUBJS.core.addCss(["../../../../../../src/plugins/hook.css"], () => {}, head)
        //     // EPUBJS.core.addCss(["src/plugins/hook.css"], () => {}, head)
        //     // EPUBJS.core.addScripts(["./assets/annotator/annotator.min.js", "./src/plugins/annotate.js"], () => {
        //     //     EPUBJS.core.addCss(["./src/plugins/hook.css"], () => {}, head)
        //     // }, head)
        //
        //     line-height: 40px;
        //         text-indent : 20px;
        // }
    },
    renderer: null
}

export default EPUBJSHook
