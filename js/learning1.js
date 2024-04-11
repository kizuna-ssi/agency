$(document).ready(function() {
  $('.cp_stepflow li').click(function() {
    var index = $(this).index() + 1;
    $('.open' + index).show().siblings('[class^="open"]').hide();
    
    // ページの最上部にスクロールする
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  });
  
  // 以下の処理は一度だけ記述すれば十分です
  $('.cp_stepflow li').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index() + 1;
    $('.open' + index).show().siblings('[class^="open"]').hide();
    
    // ページの最上部にスクロールする
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  });
});


$(document).ready(function() {
  var cpStepflow = $('.cp_stepflow');
  var offset = cpStepflow.offset().top; // cp_stepflowの初期位置を取得

  $(window).scroll(function() {
    if ($(window).scrollTop() > offset) {
      cpStepflow.addClass('fixed').css('padding-top', '40px');
    } else {
      cpStepflow.removeClass('fixed').css('padding-top', 0);
    }
  });
});


var qa = [
  ['「テトリス（ゲーム）」を開発したのは、日本人だ。', 2],
  ['生きている間は、有名な人であっても広辞苑に載ることはない。 ', 1],
  ['現在、2000円札は製造を停止している。', 1],
  ['パトカーは、取り締まっている最中であれば、どこでも駐車違反になることはない。', 2],
  ['昆虫の中には、口で呼吸する昆虫もいる。 ', 2],
  ['一般的に体の水分は、男性より女性のほうが多く含まれている。', 2],
  ['たとえ１ｃｍの高さであっても、地震によって起こるのは全て「津波」である。', 1],
  ['1円玉の直径は、ちょうど１ｃｍになっている。', 2],
  ['塩はカロリー０である。 ', 1],
  ['終了！', 2]
];

var count = 0;
var correctNum = 0;

window.onload = function() {
  // 最初の問題と正解数を表示
  showQuestion();
};

// 問題を表示する関数
function showQuestion() {
  var question = document.getElementById('question');
  question.innerHTML = qa[count][0];
  var correctDisplay = document.getElementById('correctNum');
  correctDisplay.innerHTML = '正解数：' + correctNum;

  // 最後の問題の場合は、回答ボタンを非表示にし、最初に戻るボタンを表示
  if (count == 9) {
    var answerButtons = document.getElementsByClassName('answer-btn');
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].style.display = 'none';
    }
    var restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block';
  }
}

// クリック時の答え判定
function hantei(btnNo) {
  if (qa[count][1] == btnNo) {
    correctNum++;
  }

  if (count == 9) {
    // 最後の問題の場合は、正解数を表示するだけで終了
    var question = document.getElementById('question');
    question.innerHTML = '正解数は' + correctNum + '問です！';
    return;
  }

  // 次の問題表示
  count++;
  showQuestion();
}

// 最初に戻るボタンをクリックしたときの処理
function restartQuiz() {
  count = 0;
  correctNum = 0;
  showQuestion();

  // 回答ボタンを再表示し、最初に戻るボタンを非表示にする
  var answerButtons = document.getElementsByClassName('answer-btn');
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].style.display = 'inline-block';
  }
  var restartButton = document.getElementById('restartButton');
  restartButton.style.display = 'none';
}

