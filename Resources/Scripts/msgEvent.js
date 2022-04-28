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

  setTimeout(() => {
    doResponse(text)
  }, 500)
}
function doResponse(text) {
  let flag = false
  let appendHtml = ''
  $(msgObj).each((i, obj) => {
    if (obj.userInput == text) {
      flag = true
      appendHtml += `
                <div class="service-place position-relative w-100">
                    <div class="head-img"></div>
                    <div class="msg-outside mx-5 position-relative">
                `
      if (obj.msg != undefined) {
        appendHtml += `
                    <div class="msg mx-4">${obj.msg}</div>
                `
      }
      appendHtml +=
        '<small class="msg-datetime mx-4">2022/03/14 13:27:40</small>'
      if (obj.card != undefined) {
        appendHtml += `
                    <div class="recommend-outside position-relative">
                        <div class="goto-left-btn">
                            <i class="fa-solid fa-chevron-left text-primary fa-2x"></i>
                        </div>
                        <div class="recommend-cards mx-4">
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
      appendHtml += '</div></div>'
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