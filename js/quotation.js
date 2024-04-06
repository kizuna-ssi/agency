
function calculateQuotation() {
    var a, f;
    a = calculateAge(); 
    f = document.querySelector('input[name="course"]:checked').value;
    

    if (a == 50 && f == amount_fixed) {
      document.getElementById("premium").value = "580";
      document.getElementById("product").innerText = "580円/月";
    } else if (a == 51  && f == amount_fixed) {
      document.getElementById("premium").value = "620";
      document.getElementById("product").innerText = "620円/月";

    } else {
      document.getElementById("premium").value = "引受不可";
      document.getElementById("product").innerText = "引受不可";
    }
  }

