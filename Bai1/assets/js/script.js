const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
let SumOfTask = 0;
// hàm trả về số ngày trong tháng 
function getDaysInMonth(num, year) {
        const DayNum = new Date(Number(year), Number(num), 0);
        return DayNum.getDate();
}
// hàm trả về ngày đầu tiên của tháng là thứ mấy
function getStartDayInMonth(month, year) {
        return new Date(Number(year), Number(month), 1).getDay();
}
// hàm set ngày cho từng cell trong calendar
function Set_Day(num, year){
       SumOfTask = Number(localStorage.getItem("SumTask"));
       let start = 1;
       let DayNum = getDaysInMonth(Number(num) + 1 , year);
       let StartDay = getStartDayInMonth(num , year);
       
       if(StartDay == 0) StartDay = 7;
       let Day = document.getElementsByClassName("calendar__day");
       let DayTask = document.getElementsByClassName("calendar__day--container");
       let Task_content = document.getElementsByClassName("calendar__day--task");
       for(let j = 0; j < StartDay; j++){
               Day[j].innerHTML = "";
               Highlight_Current_Day(Day[j], num, year, DayTask[j]);
               HasTask(Day[j].innerHTML, num, year, Task_content[j], DayTask[j]);
       }
       for(let i = StartDay; i <= Day.length; i++){
               Day[i-1].innerHTML = start;
               start++;
               if(start > DayNum + 1) Day[i-1].innerHTML = "";
               Highlight_Current_Day(Day[i-1], num, year, DayTask[i-1]);
               HasTask(Day[i-1].innerHTML, num, year, Task_content[i-1], DayTask[i-1]);
       }
}
// hàm hightlight ngày hiện tại
function Highlight_Current_Day(Day, month, year, DayTask){
       if(currentDate.getDate() == Day.innerHTML && currentMonth == Number(month) && currentYear == Number(year)){
               Day.style.backgroundColor = "inherit";
               DayTask.style.backgroundColor = "rgb(170, 253, 188)";
       }
       else {
               Day.style.backgroundColor = "inherit";
               DayTask.style.backgroundColor = "white";
       }
}
// hàm set tên cho tháng tương ứng
function Set_Month(num){
    const month = document.querySelector("span.calendar__month");
    switch(Number(num)){
        case 0: month.innerHTML = "January";
                break;
        case 1: month.innerHTML = "February";
                break;  
        case 2: month.innerHTML = "March";
                break;  
        case 3: month.innerHTML = "April";
                break;
        case 4: month.innerHTML = "May";
                break;
        case 5: month.innerHTML = "June";
                break;
        case 6: month.innerHTML = "July";
                break;   
        case 7: month.innerHTML = "August";
                break;
        case 8: month.innerHTML = "September";
                break;
        case 9: month.innerHTML = "October";
                break; 
        case 10: month.innerHTML = "November";
                break;
        case 11: month.innerHTML = "December";
                break;
    }
    Set_Month_Value(num);
}
function Set_Month_Value(num){
    const prev = document.getElementById("prev-btn");
    const next = document.getElementById("next-btn");
    prev.value = Number(num);
    next.value = prev.value;
}

function changeMonth(num){
    const prev = document.getElementById("prev-btn");
    const next = document.getElementById("next-btn");

    const year = document.querySelector("p.calendar__year");
//     prev.value = Number(prev.value);
//     next.value = prev.value;
    if(num == 1){
        prev.value -= 1;
        next.value -= 1;
        if(prev.value == -1) {
            prev.value = 11;
            next.value = 11;
            year.innerHTML = Number(year.innerHTML) - 1;
        }
 
    }
    if(num == 2) {
        prev.value ++;
        next.value ++;
        if(prev.value == 12) {
            prev.value = 0;
            next.value = 0;
            year.innerHTML = Number(year.innerHTML) + 1;
        }
    }
 
    Set_Month(prev.value);
    Set_Day(prev.value, year.innerHTML);
}

// hàm chuyển từ weekends sang weekdays và ngược lại
function changetoWeekendorWeekday(){
    const weekend = document.getElementsByClassName("calendar__weekend");
    const weekday = document.getElementsByClassName("calendar__weekday");
    const btn = document.querySelector("button.calendar__weekends-btn");
    if(weekend[0].style.display == "none" || weekend[0].hasAttribute("style") != true){
        for(let i = 0; i< weekday.length; i++){
                weekday[i].style.display = "none";
           }
        for(let j = 0; j< weekend.length; j++){
             weekend[j].style.display = "block";
        }
        btn.innerHTML = "Weekdays";
        btn.style.color = "white";
        btn.style.backgroundColor = "blue";
        btn.style.border = "none"
    }
    else{
        for(let i = 0; i< weekend.length; i++){
                weekend[i].style.display = "none";
        }
        for(let j = 0; j< weekday.length; j++){
                weekday[j].style.display = "block";
           }
        btn.innerHTML = "Weekends";
        btn.style.color = "gray";
        btn.style.backgroundColor = "inherit";
        btn.style.border = "1px solid gray !important";
        }
}

// ẩn hiện chức năng addTask
function HideTask(task, btn){
        task.style.display = "none";
        for(let i = 0; i< btn.length; i++){
                btn[i].style.color = "gray";
                btn[i].style.backgroundColor = "inherit";
                btn[i].style.border = "1px solid gray !important";
        }
}

function ShowTask(task, btn){
        task.style.display = "flex";
        for(let i = 0; i< btn.length; i++){
                btn[i].style.color = "white";
                btn[i].style.backgroundColor = "blue";
                btn[i].style.border = "1px solid blue !important";
        }
        // if(){

        // }
}

function addTaskSwitch(){
        const task = document.querySelector("div.calendar__add-task--container");
        const btn = document.querySelectorAll("button.calendar__add-task-btn");
        if(task.style.display == "none" || task.hasAttribute("style") != true){
                ShowTask(task, btn);
                
        }
        else HideTask(task, btn);
        
}

function SetTask(category, day, month, year, content, id){
        this.category = category;
        this.day = day;
        this.month = month-1;
        this.year = year;
        this.content = content;
        this.id = id;
}

function AddTask(category, day, month, year, content){
        SumOfTask = Number(localStorage.getItem("SumTask"));
        let check = checkHasTask(day, month, year);
        let task;
        if(check == 999){
                SumOfTask ++;
                task = new SetTask(category, day, month, year, content, SumOfTask);
                const DataSave = JSON.stringify(task);
                localStorage.setItem(SumOfTask, DataSave);
        }
        else{
        task = new SetTask(category, day, month, year, content, check);
        const DataSave = JSON.stringify(task);
        localStorage.setItem(check, DataSave);
        }
        // alert(task.day);
        
        
        localStorage.setItem("SumTask", SumOfTask);
        // alert(SumOfTask);
        // location.reload();
        Set_Day(month-1, year);
}

function HasTask(day, month, year, taskcontent, daytask){
        // localStorage.clear();
        SumOfTask = Number(localStorage.getItem("SumTask")); 
        for(let i = 1; i<= SumOfTask; i++){
        let task = localStorage.getItem(localStorage.key(i));
        let date = JSON.parse(task);
        if(date.day == Number(day) && date.month == Number(month) && date.year == Number(year)){
            taskcontent.innerHTML = date.content;
            Set_Background_based_on_cat(date.category, daytask);
            return;
        }
        else taskcontent.innerHTML = "";
        }
}
// chỗ này đang lỗi
function checkHasTask(day, month, year){
        let task, date;
        SumOfTask = Number(localStorage.getItem("SumTask"));
        for(let i = 1; i<= SumOfTask; i++){
                task = localStorage.getItem(localStorage.key(i));
                date = JSON.parse(task);
                // localStorage.setItem(i, date);
                console.log(date.day + '+' + i);
                console.log('+' + day);
                // if(date.day == undefined) return 999;
                if(date.day == Number(day) && date.month == Number(month)-1 && date.year == Number(year)){
                    alert(date.id);
                    return date.id;
                }
                
        }
        // console.log("adu" + SumOfTask);
        return 999;
}

function SaveTask(){
        let date = document.querySelector("span.calendar__add-task--date");
        date = new Date(date.innerHTML);
        let category = document.querySelector("button.calendar__add-task--category-btn");
        let title = document.querySelector("input.calendar__add-task--title-input");
        let description = document.querySelector("input.calendar__add-task--des-input");
        let content = "<b>" + title.value + "</b>" + "<br>" + description.value;
        // // alert(content);
        // AddTask("Marketing",8, 3, 2022, 'aaaaa');
        if(date.getDate() != undefined)
        AddTask(category.innerHTML ,date.getDate(), date.getMonth() + 1 , date.getFullYear(), content);
        
}

function SaveCategory(){
        const category = document.forms["choose_cat"]["category"];
        const btn = document.querySelector("button.calendar__add-task--category-btn");
        btn.innerHTML = category.value;
        document.querySelector("div.calendar__category--container").style.display = "none";
}

function Set_Category(){
        document.querySelector("div.calendar__category--container").style.display = "flex";
}

function Set_Background_based_on_cat(cat_name, daytask){

        switch(cat_name){
                case "Marketing" : daytask.style.backgroundColor = "blueviolet";
                break;
                case "Design" : daytask.style.backgroundColor = "rgb(131, 131, 255)";
                break;
                case "Development" : daytask.style.backgroundColor = "rgb(230, 230, 42)";
                break;
                case "Finance" : daytask.style.backgroundColor = "rgb(255, 133, 89)";
                break;

        }
}
// const Categories = ["Marketing", "Design", "Development", "Finance"];
// const Cat_Color = ["Red", "Blue", "Yellow", "Green"];
// let Category;
// for(let i = 0; i < Categories.length; i ++){
//       let Category[i] = new SetCategory(i + 1,Categories[i],Cat_Color[i]);
//        console.log(Category[i].cat_color);
// }