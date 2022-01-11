var date = $("#currentDay");
var timeBlocks = $(".time-block");
var agenda = $(".container");

var toDoItems = [];
//each object has a hour property and a text property
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

var loadSchedule = function() {
    //format the timeBlockss depending on time
    setUptimeBlockss();
    //if there's nothing for the todos in local storage
    if(!localStorage.getItem("todos")){
      //initialize the array of objects
      initializeSchedule();
    } //otherwise dont bother bc we get it from local storage
  
    //display current date
    date.text(currentDate);
  
    //render schedule from local storage
    renderSchedule();
    //when a todo item save button is clicked, save it
    agenda.on("click", "button", saveHandler);
};

//if we don't have any todos set up, let's set up the array of objects
function initializeSchedule(){
    for(i=0; i<timeBlocks.length; i++) {
        var currentBlock = $(this);
        var currentBlockHr = parseInt(currentBlock.attr("data-hour"));

        var todoObj = {
        //set related todo hour to same as data-hour
        hour: currentBlockHr,
        //get text ready to accept string input
        text: "",
        }
        //add this todo object to todoitems array
        toDoItems.push(todoObj);
    }
//  console.log(toDoItems);

// //for each time block
//   timeBlocks.each(function(){
//     var currentBlock = $(this);
//     var currentBlockHr = parseInt(currentBlock.attr("data-hour"));

//     var todoObj = {
//       //set related todo hour to same as data-hour
//       hour: currentBlockHr,
//       //get text ready to accept string input
//       text: "",
//     }
//     //add this todo object to todoitems array
//     toDoItems.push(todoObj);
//   });

  //once we have looped thru timeBlockss, save this array of objects to local storage by stringifying it first
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  //console.log(toDoItems);
}

//format timeBlocks colors depending on time
function setUptimeBlockss(){
    for(i=0; i<timeBlocks.length; i++) {
        // console.log(i);
        var currentBlock = document.getElementById(i);
        console.log(currentBlock);
        var currentBlockHr = parseInt(currentBlock.getAttribute("data-hour"));
        console.log(currentBlockHr);
        
  
        //add style to time blocks to show where we are in the day
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

    // timeBlocks.each(function(){
    //   var currentBlock = $(this);
    //   var currentBlockHr = parseInt(currentBlock.attr("data-hour"));
      

    //   //add style to time blocks to show where we are in the day
    //   if (currentBlockHr == currentHour) {
    //     currentBlock.addClass("present").removeClass("past future");
    //   }
    //   if (currentBlockHr < currentHour) {
    //     currentBlock.addClass("past").removeClass("present future");
    //   }
    //   if (currentBlockHr > currentHour) {
    //     currentBlock.addClass("future").removeClass("past present");
    //   }
    // });
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  //loop thru array then assign the text to the timeBlocks with data-hour equal to hour. 
  //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){

  var newHour = $(this).parent().attr("data-hour");
  var newItem = (($(this).parent()).children("textarea")).val();

  //see which item we need to update based on the hour of the button clicked matching
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == newHour){
      //set its text to what was added to textarea
      toDoItems[j].text = newItem;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}



// // when the document loads
// $(document).ready(function(){

//   //format the timeBlockss depending on time
//   setUptimeBlockss();
//   //if there's nothing for the todos in local storage
//   if(!localStorage.getItem("todos")){
//     //initialize the array of objects
//     initializeSchedule();
//   } //otherwise dont bother bc we get it from local storage

//   //display current date
//   date.text(currentDate);

//   //render schedule from local storage
//   renderSchedule();
//   //when a todo item save button is clicked, save it
//   agenda.on("click", "button", saveHandler);
  
// });


// executed on page load
$(document).ready(loadSchedule);

// event listeners
