//
// (function() {
//
//     var book = ePub("../../test/books/c/", {
//         width: (document.body.clientWidth - 20),
//         height: (document.body.clientHeight - 25)
//     });
//
//     rendition = book.renderTo("main")
//
//     console.log("book:", book)
//
//     book.getToc().then(function (toc) {
//
//         rendition.then(function () {
//             EPUBJS.core.addCss(["../../../../../src/plugins/hook.css"], function () {
//                 console.log("hook success!")
//             }, window.frames[0].document.head)
//         })
//     })
// 
//     book.getMetadata().then(function (metadata) {
//
//     })
//
//     //绑定的事件
//     var startPosition, endPosition, deltaX, deltaY, moveLength
//
//     var $body = $('body')
//     $body.bind('touchstart', touchStartHandle)
//         .bind('touchmove', touchMoveHandle)
//         .bind('touchend', touchEndHandle)
//
//     $(book.element).bind('touchstart', touchStartHandle)
//         .bind('touchmove', touchMoveHandle)
//         .bind('touchend', touchEndHandle)
//
//     function touchMoveHandle(e) {
//         var touch = e.touches[0]
//         endPosition = {
//             x: touch.pageX,
//             y: touch.pageY
//         }
//
//         deltaX = endPosition.x - startPosition.x
//         deltaY = endPosition.y - startPosition.y
//         moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2))
//     }
//
//     function touchStartHandle (e) {
//         var touch = e.touches[0]
//         startPosition = {
//             x: touch.pageX,
//             y: touch.pageY
//         }
//     }
//
//     function touchEndHandle (e) {
//         if (deltaX < 0) {
//             console.log("向左滑动")
//             book.nextPage()
//         } else {
//             console.log("向右滑动")
//             book.prevPage()
//         }
//     }
//
// })()
