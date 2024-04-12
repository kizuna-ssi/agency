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
  ['新規でお申込みいただける方は、責任開始日において満50歳以上満99歳以下の方です', 2],
  ['この保険は掛捨型の保険で貯蓄性（満期保険金など）はありません。', 1],
  ['責任開始日から３年以内の被保険者の自殺は、保険金が支払われません', 1],
  ['この保険の保険期間は2年間です', 2],
  ['この保険の払込回数には半年払があります', 2],
  ['この保険について、募集人には告知受領権があります', 2],
  ['この保険は保険期間が１年以下であるため、クーリング・オフの対象外です', 1],
  ['申込締切日（毎月15日）までに保険会社が承諾した場合は、 翌々月の1日から保障が開始されます', 2],
  ['一度解約されると、再申込み時に被保険者の健康状態などによってお引き受けできないことがあります', 1],
  ['この保険の払込回数の変更（月払または年払）は、更新時にのみ行うことができます', 1],
  ['終了！', 0]
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
  correctDisplay.innerHTML = '現在の正解数：' + correctNum + ' /10';

  // 最後の問題の場合は、回答ボタンを非表示にし、最初に戻るボタンを表示
  if (count === 10) {
    var answerButtons = document.getElementsByClassName('answer-btn');
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].style.display = 'none';
    }
    var restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block';
    return; // 最後の問題であれば、以降の処理をスキップして終了
  }
}


// クリック時の答え判定
function hantei(btnNo) {
  if (qa[count][1] == btnNo) {
    correctNum++;
  }

  if (count == 10) {
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

