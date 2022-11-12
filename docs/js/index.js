/* 발견되면 활성화시키는 라이브러리 시작 */
function ActiveOnVisible__init() {
  $(".active-on-visible").each(function (index, node) {
    var $node = $(node);

    var onFuncName = $node.attr("data-active-on-visible-on-func-name");
    var offFuncName = $node.attr("data-active-on-visible-off-func-name");

    $node.data("data-active-on-visible-on-func-name", onFuncName);
    $node.data("data-active-on-visible-off-func-name", offFuncName);
  });

  $(window).resize(_.debounce(ActiveOnVisible__initOffset, 500));
  ActiveOnVisible__initOffset();

  $(window).scroll(_.debounce(ActiveOnVisible__checkAndActive, 50));
  ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__initOffset() {
  var windowHeight = $(window).height();

  $(".active-on-visible:not(.actived)").each(function (index, node) {
    var $node = $(node);

    var offsetTop = $node.offset().top;

    var matrix = $node
      .css("transform")
      .replace(/[^0-9\-.,]/g, "")
      .split(",");
    var translateX = matrix[12] || matrix[4];
    var translateY = matrix[13] || matrix[5];

    if (translateY) {
      offsetTop -= translateY;
    }

    $node.attr("data-active-on-visible-offsetTop", offsetTop);
    $node.data("data-active-on-visible-offsetTop", offsetTop);

    if (!$node.attr("data-active-on-visible-diff-y")) {
      $node.attr("data-active-on-visible-diff-y", "0");
    }

    if (!$node.attr("data-active-on-visible-delay")) {
      $node.attr("data-active-on-visible-delay", "0");
    }

    var diffY = $node.attr("data-active-on-visible-diff-y");
    var delay = $node.attr("data-active-on-visible-delay");

    if (diffY.substr(-2, 2) == "vh") {
      diffY = parseInt(diffY);

      diffY = windowHeight * (diffY / 100);
    } else if (diffY.substr(-1, 1) == "%") {
      diffY = parseInt(diffY);

      diffY = $node.height() * (diffY / 100);
    } else {
      diffY = parseInt(diffY);
    }

    $node.attr("data-active-on-visible-diff-y-real", diffY);
    $node.data("data-active-on-visible-diff-y", diffY);
    $node.data("data-active-on-visible-delay", delay);
  });

  ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__checkAndActive() {
  $(".active-on-visible:not(.actived)").each(function (index, node) {
    var $node = $(node);

    var offsetTop = $node.data("data-active-on-visible-offsetTop") * 1;
    var diffY = parseInt($node.data("data-active-on-visible-diff-y"));
    var delay = parseInt($node.data("data-active-on-visible-delay"));

    var onFuncName = $node.data("data-active-on-visible-on-func-name");
    var offFuncName = $node.data("data-active-on-visible-off-func-name");

    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var nodeHeight = $node.height();

    if (scrollTop + windowHeight + diffY > offsetTop) {
      setTimeout(function () {
        if ($node.hasClass("active") == false) {
          $node.addClass("active");

          if ($node.hasClass("can-active-once")) {
            $node.addClass("actived");
          }

          if (window[onFuncName]) {
            window[onFuncName]($node);
          }
        }
      }, delay);
    } else {
      if ($node.hasClass("active")) {
        $node.removeClass("active");

        if (window[offFuncName]) {
          window[offFuncName]($node);
        }
      }
    }
  });
}

$(function () {
  ActiveOnVisible__init();
});
/* 발견되면 활성화시키는 라이브러리 끝 */

// gsap
let tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 1,
});

tl.from(".section-1__text > span > span", {
  opacity: 0,
  // x:100,
  duration: 1,
  stagger: 0.5,
});

tl.to(
  ".section-1__text > span > span",
  {
    opacity: 0,
    // x:-100,
    duration: 1,
    stagger: {
      each: "0.1",
      from: "end",
    },
  },
  "+=2"
);

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#test",
    // markers: true,
    start: "top-=500",
    end: "+=500",
    scrub: true,
    onEnter: function () {
      $("#test").addClass("active");
    },
    onLeaveBack: function () {
      $("#test").removeClass("active");
    },
  },
});

let swiper = new Swiper("#test .swiper", {
  loop: true,
  slidesPerView: 1, // 개수에 따라서 이미지 너비가 달라짐
  centeredSlides: true, // 현재 슬라이드를 화면 가운데로 위치하게 설정함
  spaceBetween: 30,
  pagination: {
    el: "#test .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#test .swiper-button-next",
    prevEl: "#test .swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    980: {
      slidesPerView: 3,
    },
  },
});

$(document).ready(function () {
  $("gnb_wrap ul li:nth-of-type(1)").click(function () {
    $("html, body").animate(
      { scrollTop: $("#info_content").offset().top },
      800
    );
  });

  $("gnb_wrap ul li:nth-of-type(2)").click(function () {
    $("html, body").animate({ scrollTop: $("#test").offset().top }, 800);
  });

  $("gnb_wrap ul li:nth-of-type(3)").click(function () {
    $("html, body").animate({ scrollTop: $("#about").offset().top }, 800);
  });
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-2",
    start: "top-=500",
    // markers: true,
    end: "+=500",
    scrub: 0.4,
    onEnter: function () {
      $(".section-2").addClass("black-active");
    },
    onLeaveBack: function () {
      $(".section-2").removeClass("black-active");
    },
  },
});

tl3
  .from(".section-2__main-text > div:nth-child(1)", {
    x: -500,
    opacity: 0,
    duration: 1,
  })

  .from(".section-2__text > .txt_box", {
    x: -500,
    opacity: 0,
    duration: 1,
  })

  .from(".section-2__main-text > div:nth-child(2)", {
    x: 500,
    opacity: 0,
    duration: 1,
  });

// Only necessary to correct marker position - not needed in production
if (document.querySelector(".gsap-marker-scroller-start")) {
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

  bodyScrollBar.addListener(({ offset }) => {
    gsap.set(markers, { marginTop: -offset.y });
  });
}
