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
      cpStepflow.addClass('fixed').css('padding-top', '50px');
    } else {
      cpStepflow.removeClass('fixed').css('padding-top', 0);
    }
  });
});


var qa = [
  ['この保険は責任開始日において「満50歳以上満99歳以下」の方が新規で申込み可能である', 2],
  ['この保険は掛捨型の保険で貯蓄性（満期保険金など）は無い', 1],
  ['この保険は責任開始日から「3年以内」の被保険者の自殺は、保険金が支払われない', 1],
  ['この保険の保険期間は「2年間」である', 2],
  ['この保険の払込回数には「半年払」がある', 2],
  ['この保険について、募集人には「告知受領権」がある', 2],
  ['この保険はクーリング・オフの「対象外」である', 1],
  ['申込締切日（毎月15日）までに保険会社が承諾した場合、「翌々月の1日」から保障が開始される', 2],
  ['この保険は一度解約すると再度の申込時に断られることがある', 1],
  ['この保険の払込回数（月払または年払）は「更新時にのみ」変更できる', 1],
  ['この保険の保険料払込の猶予期間は「払込期月の翌月初日から末日まで」である', 1],
];

var count = 0;
var correctNum = 0;

// Window.localStorage プロパティを使用して最後の点数を保存する関数
function saveScore(score) {
  localStorage.setItem('lastScore', score);
}

// Window.localStorage プロパティを使用して最後の点数をロードする関数
function loadLastScore() {
  var lastScore = localStorage.getItem('lastScore');
  console.log("最後のスコア: ", lastScore); // デバッグ用。コンソールに最後のスコアを出力
  if (lastScore !== null) {
    return parseInt(lastScore);
  }
  return 0; // デフォルトは0点
}

// 問題を表示する関数
function showQuestion() {
  var question = document.getElementById('question');
  var correctDisplay = document.getElementById('correctNum');

  // 最後の問題の場合は、回答ボタンを非表示にし、最初に戻るボタンを表示
  if (count === qa.length - 1) {
    question.innerHTML = '終了！　正解数は' + correctNum + '問です！';
    correctDisplay.innerHTML = '';
    var answerButtons = document.getElementsByClassName('answer-btn');
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].style.display = 'none';
    }
    var restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block';
    return; // 最後の問題であれば、以降の処理をスキップして終了
  }

  // 問題を表示
  question.innerHTML = qa[count][0];
  correctDisplay.innerHTML = '現在の正解数：' + correctNum + ' /10';
}

// クリック時の答え判定
function hantei(btnNo) {
  if (qa[count][1] == btnNo) {
    correctNum++;
  }
  
  // 次の問題表示
  count++;
  if (count === qa.length) { // 最後の問題まで到達した場合
    saveScore(correctNum); // 最後のスコアを保存
    showQuestion(); // 最後の結果を表示
  } else {
    showQuestion(); // 次の問題を表示
  }
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

// ランダムにqa配列をシャッフルする関数
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// ページが読み込まれたときに初期化
window.onload = function() {
  // qa配列をシャッフルする
  qa = shuffleArray(qa);
  // 最初の問題と正解数を表示
  showQuestion();
  
  // ページが読み込まれたときに、最後の点数をロードして表示
  var lastScore = loadLastScore();
  var loadLastScoreElement = document.getElementById('loadLastScore');
  if (loadLastScoreElement !== null) {
    loadLastScoreElement.innerHTML = "最後の点数: " + lastScore;
  }
};
