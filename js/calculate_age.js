let age;

  const userBirthdayYear = document.querySelector('.birthday-year');
  const userBirthdayMonth = document.querySelector('.birthday-month');
  const userBirthdayDay = document.querySelector('.birthday-day');
  const ageDisplay1 = document.getElementById('ageDisplay1');
  const ageDisplay2 = document.getElementById('ageDisplay2');

function createOptionForElements(elem, val) {
  let option = document.createElement('option');
  option.text = val;
  option.value = val;
  elem.appendChild(option);
}


function calculateAge() {

  const today = new Date();
  const birthDate = new Date(userBirthdayYear.value, userBirthdayMonth.value - 1, userBirthdayDay.value);

  let targetDate;
  if (today.getDate() <= 15) {
    // If today is between the 1st and 15th, target next month
    targetDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  } else {
    // If today is 16th or later, target the month after next
    targetDate = new Date(today.getFullYear() + (today.getMonth() === 11 ? 1 : 0), (today.getMonth() + 2) % 12, 1);
  }

  let age = targetDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = targetDate.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && targetDate.getDate() < birthDate.getDate())) {
    age--;
  }

  if (isNaN(age)) {
    ageDisplay1.textContent = `-`;
  } else {
    ageDisplay1.textContent = `${age} `;
  }
  ageDisplay2.textContent = `${targetDate.toLocaleDateString()}`;

  return age;

}



userBirthdayYear.innerHTML = '<option value="-">-</option>';
userBirthdayMonth.innerHTML = '<option value="1">1</option>';
userBirthdayDay.innerHTML = '<option value="1">1</option>';


for(let i = 1925; i <= 1980; i++) {
  createOptionForElements(userBirthdayYear, i);
}

for(let i = 1; i <= 12; i++) {
  createOptionForElements(userBirthdayMonth, i);
}

for(let i = 1; i <= 31; i++) {
  createOptionForElements(userBirthdayDay, i);
}

function changeTheDay() {
  if (userBirthdayYear.value && userBirthdayMonth.value) {
    userBirthdayDay.innerHTML = '';
    let lastDayOfTheMonth = new Date(userBirthdayYear.value, userBirthdayMonth.value, 0).getDate();
    for(let i = 1; i <= lastDayOfTheMonth; i++) {
      createOptionForElements(userBirthdayDay, i);
    }
  }
  calculateAge();
}

userBirthdayYear.addEventListener('change', changeTheDay);
userBirthdayMonth.addEventListener('change', changeTheDay);
userBirthdayDay.addEventListener('change', calculateAge);

// Initialize age calculation on page load
calculateAge();


setInterval(function(){
    var y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    var w = new Date().getDay();
    var wd = ["日","月","火","水","木","金","土"];
    var youbi = wd[w];
    var h = new Date().getHours();
    var min = new Date().getMinutes();
    var s = new Date().getSeconds();
    
    // 日付を表示する要素のIDを配列で持つ
    var dateDisplayIds = ["datedisplay1", "datedisplay2", "datedisplay3", "datedisplay4"];
    
    // 各要素に日付を表示する
    dateDisplayIds.forEach(function(id) {
        $("#" + id).html(y + "年" + m + "月" + d + "日" );
    });
    
},1000);
