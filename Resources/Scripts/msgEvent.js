function doTalk(text) {
  $('#msgPlace').append(`
        <div class="user-place">
                <div class="msg-outside">
                    <div class="msg">
                        <p>${text}</p>
                    </div>
                </div>
            </div>
        `)

        let marginForHeader = document.documentElement.style.getPropertyValue(
            '--margin-for-header',
          )
          let _marginForHeader = marginForHeader.replace('px', '')
        $(this).scrollTop($('.user-place').last().offset().top - _marginForHeader)
  setTimeout(() => {
    doResponse(text)
  }, 500)
}
function doResponse(text) {
  let appendHtml = ''
  $(msgObj).each((i, obj) => {
    if (obj.userInput == text) {
      appendHtml += `
      <div class="service-place position-relative w-100">
        <div class="head-img">
            <img src="./Resources/Images/service-head.png" alt="司法院客服頭貼">
        </div>
        <div class="msg-outside mx-md-5 ms-5  position-relative">
                `
      if (obj.msg != undefined) {
        appendHtml += `
                    <div class="msg mx-md-4 ms-4">${obj.msg}</div>
                `
      }
      appendHtml +=
        '<small class="msg-datetime mx-md-4">2022/03/14 13:27:40</small></div>'
      if (obj.card != undefined) {
        appendHtml += `
                    <div class="recommend-outside position-relative">
                        <div class="goto-left-btn">
                            <i class="fa-solid fa-chevron-left text-primary fa-2x"></i>
                        </div>
                        <div class="recommend-cards mx-md-4 mx-3">
                            <div class="position-relative d-flex cards-outside">
                                ${obj.card}
                            </div>
                        </div>
                        <div class=" goto-right-btn">
                            <i class="fa-solid fa-chevron-right text-primary fa-2x"></i>
                        </div>
                    </div>
                    `
      }
      appendHtml += '</div>'
      $('#msgPlace').append(appendHtml)

      if (obj.card != undefined) {
          let marginForHeader = document.documentElement.style.getPropertyValue(
            '--margin-for-header',
          )
          let _marginForHeader = marginForHeader.replace('px', '')
        
          $(this).scrollTop($('.user-place').last().offset().top - _marginForHeader)
          $(".recommend-cards .rec-card a[href='javascript:void(0)']").unbind(
            'click',
            recommendFn,
          )
          $(".recommend-cards .rec-card a[href='javascript:void(0)']").bind(
            'click',
            (recommendFn = (e) => {
              doTalk($(e.currentTarget).text())
            }),
          )
          cardScroll()
      }
      return false
    }
  })

}

let recommendFn
$(function () {
  $(".recommend-cards .rec-card a[href='javascript:void(0)']").bind(
    'click',
    (recommendFn = (e) => {
      doTalk($(e.currentTarget).text())
    }),
  )
})
