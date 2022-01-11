var date = $("#currentDay");
var timeBlocks = $(".time-block");
var agenda = $(".container");

var savedItemsArr = [];
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

var loadSchedule = function() {
    styleBlocks();
    if(!localStorage.getItem("todos")){
      storeItems();
    } 
    date.text(currentDate);
    displaySavedItems();
    agenda.on("click", "button", saveHandler);
};

var styleBlocks = function(){
    for(i=0; i<timeBlocks.length; i++) {
        var currentBlock = document.getElementById(i);
        console.log(currentBlock);
        var currentBlockHr = parseInt(currentBlock.getAttribute("data-hour"));
        console.log(currentBlockHr);
        
  
      if (currentBlockHr == currentHour) {
        currentBlock.className += " present";
      }
      if (currentBlockHr < currentHour) {
        currentBlock.className += " past";
      }
      if (currentBlockHr > currentHour) {
        currentBlock.className += " future";
      }
    }
}

var storeItems = function(){
    for(i=0; i<timeBlocks.length; i++) {
        var currentBlock = $(this);
        var currentBlockHr = parseInt(currentBlock.attr("data-hour"));

        var todoObj = {
        hour: currentBlockHr,
        text: "",
        }
        savedItemsArr.push(todoObj);
    }
    
  localStorage.setItem("todos", JSON.stringify(savedItemsArr));
}

var displaySavedItems = function(){
  
  savedItemsArr = localStorage.getItem("todos");
  savedItemsArr = JSON.parse(savedItemsArr);

  for (var i = 0; i < savedItemsArr.length; i++){
    var itemHour = savedItemsArr[i].hour;
    var itemText = savedItemsArr[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(savedItemsArr);
}

var saveHandler = function(){

  var newHour = $(this).parent().attr("data-hour");
  var newItem = (($(this).parent()).children("textarea")).val();

  for (var j = 0; j < savedItemsArr.length; j++){
    if (savedItemsArr[j].hour == newHour){
      savedItemsArr[j].text = newItem;
    }
  }
  localStorage.setItem("todos", JSON.stringify(savedItemsArr));
  displaySavedItems();
}

$(document).ready(loadSchedule);