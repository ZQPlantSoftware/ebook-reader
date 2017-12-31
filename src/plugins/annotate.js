/***
 * 注入到EPUB里面的JS
*/

var params = window.top.params

var app = new annotator.App()
    .include(annotator.ui.main, document.getElementsByTagName("body")[0])
    .include(annotator.storage.http, {
        prefix: 'http://182.92.11.96:9898/annotator'
    })
    .include(() => {
            return {
                beforeAnnotationCreated: function (annotation) {
                    annotation.uri = window.location.href
                    annotation.user_id = params.uid
                    annotation.book_id = params.bid
                    annotation.token = params.token
                    annotation.percentage = window.top.params.percentage
                    annotation.chapter = window.top.currentChapter.absolute
                }
            }
    })

app.start().then(function() {
    var res = app.annotations.load({
        user_id: params.uid,
        book_id: params.bid,
        percentage: params.percentage,
        chapter: window.top.currentChapter.absolute,
        token: params.token
    })
})
