$(function () {
  cardScroll()
})
$(window).resize(()=>{
  cardScroll()
})

function cardScroll() {
  $('.recommend-cards').each((i, recommendCards_js) => {
    let scrollFn
    let recommendCards = $(recommendCards_js)
    let scrollPlace = $(recommendCards_js.querySelector('.cards-outside'))
    let insideCards = $(recommendCards_js.querySelectorAll('.rec-card'))
    let goLeftBtn = $(
      $(recommendCards_js).parent().get(0).querySelector('.goto-left-btn'),
    )
    let goRightBtn = $(
      recommendCards.parent().get(0).querySelector('.goto-right-btn'),
    )

    const offsetLeftStart = recommendCards.offset().left
    const outsideWidth = scrollPlace.width()
    let cardsWidth = 0
    insideCards.each((i, v) => {
      if($(v).hasClass("card")){
        cardsWidth += 288  //18rem
      }
      else{
        cardsWidth += $(v).width()
      }
      cardsWidth += 16 //1rem
    })
    const absoluteMaxWidth = cardsWidth - outsideWidth

    let obj = {
      scrollPlace: scrollPlace,
      offsetLeftStart: offsetLeftStart,
      absoluteMaxWidth: absoluteMaxWidth,
      goLeftBtn: goLeftBtn,
      goRightBtn: goRightBtn,
    }
    toggleArrowBtn(obj)

    let intervalScollEvent
    goLeftBtn.mousedown((e) => {
      let newOffset = recommendCards.offset().left - scrollPlace.offset().left
      recommendCards.scrollLeft(newOffset - 20)
      intervalScollEvent = window.setInterval(() => {
        if (goLeftBtn.css('display') != 'none') {
          newOffset = recommendCards.offset().left - scrollPlace.offset().left
          recommendCards.scrollLeft(newOffset - 20)
        }
        else{
          clearInterval(intervalScollEvent)
        }
      }, 70)
    })
    goLeftBtn.mouseup(() => {
      clearInterval(intervalScollEvent)
    })
    goRightBtn.mousedown((e) => {
      let newOffset = recommendCards.offset().left - scrollPlace.offset().left
      recommendCards.scrollLeft(newOffset + 20)
      intervalScollEvent = window.setInterval(() => {
        if (goRightBtn.css('display') != 'none') {
          newOffset = recommendCards.offset().left - scrollPlace.offset().left
          recommendCards.scrollLeft(newOffset + 20)
        }
        else{
          clearInterval(intervalScollEvent)
        }
      }, 70)
    })
    goRightBtn.mouseup(() => {
      clearInterval(intervalScollEvent)
    })
    //監聽捲軸
    recommendCards.unbind('scroll', scrollFn)
    recommendCards.bind(
      'scroll',
      (scrollFn = () => {
        toggleArrowBtn(obj)
      }),
    )
  })
  function toggleArrowBtn(obj) {
    let scrollPlace = obj.scrollPlace
    let offsetLeftStart = obj.offsetLeftStart
    let absoluteMaxWidth = obj.absoluteMaxWidth
    let goLeftBtn = obj.goLeftBtn
    let goRightBtn = obj.goRightBtn

    let offsetLeftNow = scrollPlace.offset().left
    let absoluteLeft = offsetLeftStart - offsetLeftNow

    if (absoluteMaxWidth <= 0) {
      goLeftBtn.hide()
      goRightBtn.hide()
    } else {
      absoluteLeft <= 0 ? goLeftBtn.hide() : goLeftBtn.show()
      absoluteLeft >= absoluteMaxWidth ? goRightBtn.hide() : goRightBtn.show()
    }
  }
}
