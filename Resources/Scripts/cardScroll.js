$(function () {
  $('.recommend-cards').each((i, recommendCards_js) => {
    let recommendCards = $(recommendCards_js)
    let scrollPlace = $(recommendCards_js.querySelector('.cards-outside'))
    let insideCards = $(recommendCards_js.querySelector('.rec-card'))
    let goLeftBtn = $(
      $(recommendCards_js).parent().get(0).querySelector('.goto-left-btn'),
    )
    let goRightBtn = $(
      recommendCards.parent().get(0).querySelector('.goto-right-btn'),
    )
    
    const offsetLeftStart = recommendCards.offset().left
    const outsideWidth = insideCards.width()
    let cardsWidth = 19
    insideCards.each((i, v) => {
        cardsWidth += $(v).width()
        cardsWidth += 16
    })
    const absoluteMaxWidth = cardsWidth - outsideWidth

    let obj = {
        scrollPlace: scrollPlace,
        offsetLeftStart: offsetLeftStart,
        absoluteMaxWidth: absoluteMaxWidth,
        goLeftBtn : goLeftBtn,
        goRightBtn:goRightBtn
    }
    toggleArrowBtn(obj)

    goLeftBtn.click((e) => {
      let offsetLeftNow = scrollPlace.offset().left
      let newoffsetLeft = offsetLeftNow + 5
      if (newoffsetLeft >= absoluteMaxWidth)
        recommendCards.scrollLeft(absoluteMaxWidth - offsetLeftStart)
      else recommendCards.scrollLeft(newoffsetLeft)

      toggleArrowBtn(obj)
    })
    goRightBtn.click((e) => {
      let offsetLeftNow = scrollPlace.offset().left
      let newoffsetLeft = offsetLeftNow - 5
      if (-newoffsetLeft >= absoluteMaxWidth)
        recommendCards.scrollLeft(absoluteMaxWidth + offsetLeftStart)
      else recommendCards.scrollLeft(newoffsetLeft)
      toggleArrowBtn(obj)
    })
    recommendCards.scroll(() => {
        toggleArrowBtn(obj)
    })
  })
  function toggleArrowBtn(obj) {
    let scrollPlace = obj.scrollPlace;
    let offsetLeftStart = obj.offsetLeftStart;
    let absoluteMaxWidth = obj.absoluteMaxWidth;
    let goLeftBtn = obj.goLeftBtn;
    let goRightBtn = obj.goRightBtn;

    let offsetLeftNow = scrollPlace.offset().left;
    let absoluteLeft = offsetLeftStart - offsetLeftNow
    if (absoluteLeft <= 0) {
      goLeftBtn.hide()
      if (absoluteLeft == absoluteMaxWidth) goRightBtn.hide()
    } else if (absoluteLeft > absoluteMaxWidth) {
      goRightBtn.hide()
    } else {
      goLeftBtn.show()
      goRightBtn.show()
    }
  }
})
