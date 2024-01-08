let displayValue = '';
let operator = '';
let waitingForSecondOperand = false;
let historyValue = '';

function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = displayValue;
}

function updateHistory() {
  const history = document.getElementById('history');
  history.textContent = historyValue;
}
//Nút C
function clearDisplay() {
  displayValue = '0';
  historyValue = ''
  operator = '';
  waitingForSecondOperand = false;
  updateDisplay();
  updateHistory();
}
//Thêm để hiển thị
function appendtodisplay(value) {
  if (waitingForSecondOperand) {
    displayValue = value;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === '0' ? value : displayValue + value;
  }
  updateDisplay();
}
//Nút xoá
function del(){
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}
//Tính toán 
function calculate() {
  try {
    var calculation = displayValue;
    var result = eval(calculation);
    displayValue = result;
    // let history =calculation + result;
    historyValue = calculation + ' = ' + result;
    updateDisplay();
    updateHistory();
  } catch (err) {
    alert("Vui lòng nhập lại");
  }
//Tính phần trăm
}
function percent() {
  var calculation = displayValue;
  var result = eval(calculation) / 100;
  displayValue = result;
  // let history =calculation + result;
  historyValue = calculation + '% = ' + result;
  updateDisplay();
  updateHistory();
}

// function ans(){
//   var ans = result;
//   displayValue = ans;
//   updateDisplay();
// }

//Lấy dữ liệu từ bàn phím
document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (/[0-9+\-*/=]/.test(key)) {
    // Nếu key là số hoặc các phép toán, thêm vào kết quả
    appendtodisplay(key);
  }else if (key === '%') {
    // Nếu key là Backspace, xóa ký tự cuối cùng
    percent();
  }else if (key === 'Enter') {
    // Nếu key là Enter, tính kết quả
    calculate();
  } else if (key === 'Backspace') {
    // Nếu key là Backspace, xóa ký tự cuối cùng
    del();
  }
  else if (key === 'Escape') {
    // Nếu key là Backspace, xóa ký tự cuối cùng
    clearDisplay();
  }
  
});