let greatSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="24.51366"
   height="22.125"
   viewBox="0 0 24.51366 22.125"
   fill="none"
   version="1.1"
   id="svg4"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <g
     id=""
     transform="translate(5.375,-0.625)">
    <path
       d="m 1.75,10.375 4.375,-8.75 c 0.92826,0 1.8185,0.36875 2.47487,1.02513 C 9.25625,3.3065 9.625,4.19674 9.625,5.125 V 7.75 h 6.7703 c 0.2482,-6.1e-4 0.4935,0.05188 0.7197,0.15396 0.2262,0.10208 0.4279,0.25138 0.5916,0.43786 0.1637,0.18649 0.2856,0.40585 0.3575,0.64334 0.0719,0.23749 0.0921,0.48763 0.0593,0.73359 L 16.8109,20.2188 c -0.0531,0.4215 -0.2577,0.8093 -0.5757,1.091 -0.3179,0.2818 -0.7275,0.4382 -1.1524,0.4402 H 1.75"
       stroke="#404040"
       stroke-width="2"
       stroke-linecap="round"
       stroke-linejoin="round" />
    <path
       d="M -3.5,10.375 H 1.75 V 21.75 H -3.5 c -0.23206,0 -0.45462,-0.0922 -0.61872,-0.256299 C -4.28281,21.3296 -4.375,21.1071 -4.375,20.875 V 11.25 c 0,-0.23206 0.09219,-0.45462 0.25628,-0.618719 C -3.95462,10.46719 -3.73206,10.375 -3.5,10.375 Z"
       stroke="#404040"
       stroke-width="2"
       stroke-linecap="round"
       stroke-linejoin="round" />
  </g>
</svg>
`

function doTalk(text, resType) {
  $('#msgPlace').append(`
        <div class="user-place w-100 position-relative">
            <div class="msg-outside">
                <div class="msg mx-md-4">
                    <p>${text}</p>
                </div>
                <small class="msg-datetime mx-md-4 mt-2">${moment().format(
                  'YYYY/MM/DD HH:mm:ss',
                )}</small>
            </div>
        </div>
        `)

  let marginForHeader = document.documentElement.style.getPropertyValue(
    '--margin-for-header',
  )
  let _marginForHeader = marginForHeader.replace('px', '')
  $(this).scrollTop($('.user-place').last().offset().top - _marginForHeader)
  setTimeout(() => {
    doResponse(text, resType)
  }, 500)
}
function doResponse(text, resType) {
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
      if (resType == 'multi') {
        if (obj.text != undefined) {
          appendHtml += `
                      <div class="msg mx-md-4 ms-4 multi-answer">
                        <p><strong>我幫您找到的相關問題：</strong></p>
                        <hr>
                        <ul>
                        `
          $(obj.text).each((i, txt) => {
            appendHtml += `<li>${txt}</li>`
          })

          appendHtml += `
                        </ul>
                      </div>
                  `
        }
      } else if (obj.msg != undefined) {
        appendHtml += `
                    <div class="msg mx-md-4 ms-4">${obj.msg}</div>
                `
      }
      else return;
      
      appendHtml += `<small class="d-flex mx-md-4 align-items-center response-place flex-wrap">
              您是否滿意本次回答：
              <button class="btn btn-outline-dark btn-sm res-great my-2 me-1">
                  ${greatSvg}
                  滿意
              </button>
              <button class="btn btn-outline-dark btn-sm res-bad my-2">
                ${greatSvg}
                  不滿意
              </button>
          </small>`

      appendHtml += `<small class="msg-datetime mx-md-4">${moment().format(
        'YYYY/MM/DD HH:mm:ss',
      )}</small></div>`
      if (obj.card != undefined) {
        appendHtml += `
                    <div class="recommend-outside mx-md-2 position-relative">
                        <div class="goto-left-btn">
                            <i class="fa-solid fa-chevron-left text-primary"></i>
                        </div>
                        <div class="recommend-cards mx-md-4 mx-md-3">
                            <div class="position-relative d-flex cards-outside py-1">
                                ${obj.card}
                            </div>
                        </div>
                        <div class=" goto-right-btn">
                            <i class="fa-solid fa-chevron-right text-primary"></i>
                        </div>
                    </div>
                    `
      }
      appendHtml += '</div>'
      $('#msgPlace').append(appendHtml)

      let marginForHeader = document.documentElement.style.getPropertyValue(
        '--margin-for-header',
      )
      let _marginForHeader = marginForHeader.replace('px', '')

      $(this).scrollTop($('.user-place').last().offset().top - _marginForHeader)

      if (obj.card != undefined) {
        $("a[href='javascript:void(0)'].rec-target").unbind(
          'click',
          recommendFn,
        )
        $("a[href='javascript:void(0)'].rec-target").bind(
          'click',
          (recommendFn = (e) => {
            doTalk($(e.currentTarget).text())
          }),
        )

        $('.response-place button').unbind('click', responseFn)
        $('.response-place button').bind(
          'click',
          (responseFn = (e) => {
            $(e.currentTarget)
              .parent()
              .html("<span class='my-2 res-thanks'>感謝您的回饋！</span>")
          }),
        )

        if (!mobile()) {
          $('.recommend-cards').addClass('hasscrollbar')
        }

        cardScroll()
      }
      return false
    }
  })
}

let recommendFn
let responseFn
$(function () {
  $("a[href='javascript:void(0)'].rec-target").bind(
    'click',
    (recommendFn = (e) => {
      doTalk($(e.currentTarget).text())
    }),
  )
})

function mobile() {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}
