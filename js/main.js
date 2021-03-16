let firstSection = $("#home").offset().top
let secondSection = $("#about").offset().top
let thirdSection = $("#services").offset().top
let forthSection = $("#work").offset().top
let sixthSection = $("#blog").offset().top
let sevenSection = $("#contact").offset().top


$(window).scroll(function(){

    let changescroll = $(window).scrollTop();

    if (changescroll > firstSection  ) {

        //scroll button
        


        //nav bar
        $(".navbar").removeClass("bg-transparent")
        $(".navbar").addClass("navbarbg")
        $('#home a').css("color" , "black")

        $(".navbar .container").removeClass("mt-3")
        $(".navbar .container").addClass("mt-0")

    }
    else
    {

        
        $(".navbar").addClass("bg-transparent")
        $(".navbar").removeClass("navbarbg")
        $('#home a').css("color" , "white")
        $(".navbar .container").addClass("mt-3")
        $(".navbar .container").removeClass("mt-0")

    }
    

    if (changescroll > secondSection  ) {
      $(".go-up").fadeIn(500)

    }
    else 
    {
      $(".go-up").fadeOut(300)
    }
    

})


$(".go-up").fadeOut(10)

$(".forUP").click(function(){

    $("html , body").animate( { scrollTop: "0"} , 1000 )

})





$(".home").click(function(){

    $("html , body").animate( { scrollTop: "0"} , 1000 )

})

$(".about").click(function(){

    $("html , body").animate( { scrollTop: secondSection} , 1000 )

})
$(".services").click(function(){

    $("html , body").animate( { scrollTop:thirdSection } , 1000 )

})
$(".work").click(function(){

    $("html , body").animate( { scrollTop: forthSection} , 1000 )

})
$(".blog").click(function(){

    $("html , body").animate( { scrollTop: sixthSection} , 1000 )

})
$(".contact").click(function(){

    $("html , body").animate( { scrollTop: sevenSection} , 1000 )

})


document.addEventListener("DOMContentLoaded", function() {
    // You can change this class to specify which elements are going to behave as counters.
    var elements = document.querySelectorAll(".scroll-counter")
  
    elements.forEach(function(item) {
      // Add new attributes to the elements with the '.scroll-counter' HTML class
      item.counterAlreadyFired = false
      item.counterSpeed = item.getAttribute("data-counter-time") / 25
      item.counterTarget = +item.innerText
      item.counterCount = 0
      item.counterStep = item.counterTarget / item.counterSpeed
  
      item.updateCounter = function() {
        item.counterCount = item.counterCount + item.counterStep
        item.innerText = Math.ceil(item.counterCount)
  
        if (item.counterCount < item.counterTarget) {
          setTimeout(item.updateCounter, item.counterSpeed)
        } else {
          item.innerText = item.counterTarget
        }
      }
    })
  
    // Function to determine if an element is visible in the web page
    var isElementVisible = function isElementVisible(el) {
      var scroll = window.scrollY || window.pageYOffset
      var boundsTop = el.getBoundingClientRect().top + scroll
      var viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight,
      }
      var bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight,
      }
      return (
        (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
        (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
      )
    }
  
    // Funciton that will get fired uppon scrolling
    var handleScroll = function handleScroll() {
      elements.forEach(function(item, id) {
        if (true === item.counterAlreadyFired) return
        if (!isElementVisible(item)) return
        item.updateCounter()
        item.counterAlreadyFired = true
      })
    }
  
    // Fire the function on scroll
    window.addEventListener("scroll", handleScroll)
  })
  


  // text animation 
  jQuery(document).ready(function($) {
    //set animation timing
    var animationDelay = 2500,
      //loading bar effect
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
      //letters effect
      lettersDelay = 50,
      //type effect
      typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect 
      revealDuration = 600,
      revealAnimationDelay = 1500;
  
    initHeadline();
  
  
    function initHeadline() {
      //insert <i> element for each letter of a changing word
      singleLetters($('.cd-headline.letters').find('b'));
      //initialise headline animation
      animateHeadline($('.cd-headline'));
    }
  
    function singleLetters($words) {
      $words.each(function() {
        var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');
        for (i in letters) {
          if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
          letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
        }
        var newLetters = letters.join('');
        word.html(newLetters).css('opacity', 1);
      });
    }
  
    function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function() {
        var headline = $(this);
  
        if (headline.hasClass('loading-bar')) {
          duration = barAnimationDelay;
          setTimeout(function() {
            headline.find('.cd-words-wrapper').addClass('is-loading')
          }, barWaiting);
        } else if (headline.hasClass('clip')) {
          var spanWrapper = headline.find('.cd-words-wrapper'),
            newWidth = spanWrapper.width() + 10
          spanWrapper.css('width', newWidth);
        } else if (!headline.hasClass('type')) {
          //assign to .cd-words-wrapper the width of its longest word
          var words = headline.find('.cd-words-wrapper b'),
            width = 0;
          words.each(function() {
            var wordWidth = $(this).width();
            if (wordWidth > width) width = wordWidth;
          });
          headline.find('.cd-words-wrapper').css('width', width);
        };
  
        //trigger animation
        setTimeout(function() {
          hideWord(headline.find('.is-visible').eq(0))
        }, duration);
      });
    }
  
    function hideWord($word) {
      var nextWord = takeNext($word);
  
      if ($word.parents('.cd-headline').hasClass('type')) {
        var parentSpan = $word.parent('.cd-words-wrapper');
        parentSpan.addClass('selected').removeClass('waiting');
        setTimeout(function() {
          parentSpan.removeClass('selected');
          $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
        }, selectionDuration);
        setTimeout(function() {
          showWord(nextWord, typeLettersDelay)
        }, typeAnimationDelay);
  
      } else if ($word.parents('.cd-headline').hasClass('letters')) {
        var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
        hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
        showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
  
      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          width: '2px'
        }, revealDuration, function() {
          switchWord($word, nextWord);
          showWord(nextWord);
        });
  
      } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
        $word.parents('.cd-words-wrapper').removeClass('is-loading');
        switchWord($word, nextWord);
        setTimeout(function() {
          hideWord(nextWord)
        }, barAnimationDelay);
        setTimeout(function() {
          $word.parents('.cd-words-wrapper').addClass('is-loading')
        }, barWaiting);
  
      } else {
        switchWord($word, nextWord);
        setTimeout(function() {
          hideWord(nextWord)
        }, animationDelay);
      }
    }
  
    function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('type')) {
        showLetter($word.find('i').eq(0), $word, false, $duration);
        $word.addClass('is-visible').removeClass('is-hidden');
  
      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          'width': $word.width() + 10
        }, revealDuration, function() {
          setTimeout(function() {
            hideWord($word)
          }, revealAnimationDelay);
        });
      }
    }
  
    function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');
  
      if (!$letter.is(':last-child')) {
        setTimeout(function() {
          hideLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else if ($bool) {
        setTimeout(function() {
          hideWord(takeNext($word))
        }, animationDelay);
      }
  
      if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
      }
    }
  
    function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');
  
      if (!$letter.is(':last-child')) {
        setTimeout(function() {
          showLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else {
        if ($word.parents('.cd-headline').hasClass('type')) {
          setTimeout(function() {
            $word.parents('.cd-words-wrapper').addClass('waiting');
          }, 200);
        }
        if (!$bool) {
          setTimeout(function() {
            hideWord($word)
          }, animationDelay)
        }
      }
    }
  
    function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }
  
    function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }
  
    function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
    }
  });

  //forloading 
  $(document).ready(function(){

    $(".forLoading").fadeOut(1500 , function(){

      $("body").css("overflow" , "auto")

    })

  })

  
// colorbox

$(".colorBox li").eq(0).css("background-color" , "#0078ff")
$(".colorBox li").eq(1).css("background-color" , "#f1b31a")
$(".colorBox li").eq(2).css("background-color" , "#37b8df")
$(".colorBox li").eq(3).css("background-color" , "#87ceea")
$(".colorBox li").eq(4).css("background-color" , "#e55f78")
$(".colorBox li").eq().css("background-color" , "red")


$(".colorBox li").click(function(){

let selectedColor = $(this).css("background-color")
$(".favColor").css("color" , selectedColor)
$(".icons a").css("border" , '2px solid ' + selectedColor)
$(".markColor").css("background-color" , selectedColor)
$("#services .services-icon a").css("border" , '5px solid ' + selectedColor)
$("#services .services-icon a").mouseover(function(){

  $(this).css("background-color" , selectedColor)
  $(this).css("border" , "10px solid #f5f5f5")

})

$("#services .services-icon a").mouseout(function(){

  $(this).css("background-color" , "white")
  $(this).css("border" , "5px solid " + `${selectedColor}`)

})

$(".background , .navbar-nav , .go-up a").css("background-color" , selectedColor)
$(".go-up a").css("border" , '3px solid ' + selectedColor)
$("#work i , #work span , #contact ul li i").css("color" , selectedColor)
$("#clintes .carousel-indicators li").css("background-color" , selectedColor)
$("footer").css("background-color" , selectedColor)
$("#about .about-info h3::before").css("background-color" , selectedColor)

})

$(".navbar-nav li").not(".alooo").css("border-bottom" , "1px #454648 solid")


// colorbox
let boxSize = $(".colorBox").outerWidth(true)
$(".allBox").css({ left: `-${boxSize}` })

$(".allBox i ").click(function(){

  let allBoxLeft = $(".allBox").css("left")

  if (allBoxLeft == "0px")
  {

    $(".allBox").animate({left : `-${boxSize}`} , 600)

  }
  else
  {
    $(".allBox").animate({left : "0px" } , 600)
  }

})