// Flight Status- Origin/Destination
// Asir Ratnani
// January 15, 2019
//

// Draw origin and destination text
function drawOriginDestText(){
  fill(255);
  textFont(font_3);
  textSize(25);
  textAlign(CENTER);
  text("Origin", 190,60);
  text("Destination", 440,60);
  noLoop();

}

// Set up buttons for setting the date.
function setupButtons(){
  fill("green");
  strokeWeight(1.5);
  rect(width-250, height/2, 220, 65);
  rect(width-250, height/2-110, 220, 65);
  rect(width-250, height/2+110, 220, 65);

  fill(0);
  textFont(font_1);
  textSize(27.5);
  textAlign(CENTER);
  text("Today's Flights", width-138, height/2+45);
  text("Tomorrow's Flights", width-138, height/2-65);
  text("Yesterday's Flights", width-138, height/2+155);
}

// Create the submit button using p5.DOM
function makeSubmitButton(){
  submitButton = createButton("Submit");
  submitButton.position(555, 77);

  submitButton.mousePressed(setOriginDest)
}
// Setup the origin and destination dropdown menus
function setupOriginDest() {
  originDropdown= createSelect();
  originDropdown.position(100, 75);
  originDropdown.size(185,25);
  
  originDropdown.option("Saskatoon");
  originDropdown.option("Toronto");
  originDropdown.option("Vancouver");
  originDropdown.option("Calgary");
  originDropdown.option("Edmonton");

  destDropdown = createSelect();
  destDropdown.position(350,75);
  destDropdown.size(185,25);
  
  destDropdown.option("Toronto");
  destDropdown.option("Vancouver");
  destDropdown.option("Calgary");
  destDropdown.option("Edmonton");
  destDropdown.option("Saskatoon");



}

// Set the Origin and Destination combo and set the correct JSON file.

function setOriginDest() {
  background(45);
  drawOriginDestText();
  setupButtons();
  // Made sure the arrays were empty each time the submit button was clicked.
  todayFlights = [];
  tomorrowFlights = [];
  yesterdayFlights = [];

  let originVal = originDropdown.value();
  let destVal = destDropdown.value();

  if (originVal === "Saskatoon" && destVal === "Toronto") {
    currentCombo = saskTor;
  }
  else if (originVal === "Saskatoon" && destVal === "Calgary") {
    currentCombo = saskCal;
  }
  else if (originVal === "Saskatoon" && destVal === "Edmonton") {
    currentCombo = saskEdm;
  }
  else if (originVal === "Saskatoon" && destVal === "Vancouver") {
    currentCombo = saskVanc;
  }
  
  else if (originVal === "Toronto" && destVal === "Vancouver") {
    currentCombo = torVanc;
  }
  else if (originVal === "Toronto" && destVal === "Calgary") {
    currentCombo = torCal;
  }
  else if (originVal === "Toronto" && destVal === "Edmonton") {
    currentCombo = torEdm;
  }
  else if (originVal === "Toronto" && destVal === "Saskatoon") {
    currentCombo = torSask;
  }

  else if (originVal === "Vancouver" && destVal === "Toronto") {
    currentCombo = vanTor;
  }

  else if (originVal === "Vancouver" && destVal === "Calgary") {
    currentCombo = vanCal;
  }
  else if (originVal === "Vancouver" && destVal === "Edmonton") {
    currentCombo = vanEdm;
  }
  else if (originVal === "Vancouver" && destVal === "Saskatoon") {
    currentCombo = vanSask;
  }

  else if (originVal === "Calgary" && destVal === "Toronto") {
    currentCombo = calTor;
  }
  else if (originVal === "Calgary" && destVal === "Vancouver") {
    currentCombo = calVanc;
  }
  else if (originVal === "Calgary" && destVal === "Edmonton") {
    currentCombo = calEdm;
  }
  else if (originVal === "Calgary" && destVal === "Saskatoon") {
    currentCombo = calSask;
  }
  
  else if (originVal === "Edmonton" && destVal === "Toronto") {
    currentCombo = edmTor;
  }
  else if (originVal === "Edmonton" && destVal === "Vancouver") {
    currentCombo = edmVanc;
  }
  else if (originVal === "Edmonton" && destVal === "Calgary") {
    currentCombo = edmCal;
  }
   else if (originVal === "Edmonton" && destVal === "Saskatoon") {
    currentCombo = edmSask;
  }
  // If the match is not listed it means the same city was chosen twice. Show Error code.
  else {
    fill(255,0,0);
    textFont(font_1);
    textSize(32);
    textAlign(CENTER);
    text("Error! The Origin cannot be the same \nas the Destination, Please try again!", width/2-100, height/2);
  }

  if (originVal !== destVal) {
    currentList = todayFlights;
    sortOriginDest();
  }
  else {
    fill(255,0,0);
    textFont(font_1);
    textSize(32);
    textAlign(CENTER);
    background(45);
    text("Error! The Origin cannot be the same \nas the Destination, Please try again!", width/2-100, height/2);
    drawOriginDestText();

  }



}

// Used empty arrays to push in current date , previous date, and next date info
function sortOriginDest() {
  for (let i = currentCombo.FindFlightResult.flights.length-1; i > 0 ; i--){
    let date = currentCombo.FindFlightResult.flights[i].segments[0].estimated_departure_time.date;
    let flightArray = currentCombo.FindFlightResult.flights[i].segments[0];
    if (date === "2019/01/20") {
      tomorrowFlights.push(flightArray);
    }
    else if (date === "2019/01/19") {
      todayFlights.push(flightArray);
    }
    else if (date === "2019/01/18") {
      yesterdayFlights.push(flightArray);
    }
    
  }
  displayOriginDest();
}

// Actually display the information in grid format. This function creates the grid and displays the info.
function displayOriginDest () {
  background(45);
  setupButtons();
  drawOriginDestText();
  
  let y = height/2-240;
  let x = 75;
  let num = currentList.length;
  textFont(font_1);
  fill(25);
  strokeWeight(5);
  rect(x,y+55,125,45);
  rect(x+125,y+55,225,45);
  rect(x+350,y+55,285,45);
  rect(x+635,y+55,90,45);
  rect(x+725,y+55,90,45);
  rect(x+815,y+55,90,45);
  rect(x+905,y+55,90,45);

  if (currentList.length === 0) {
    fill("red");
    text("Sorry, we don't have any information about this date!", width/2-100,height/2);
  }
  for (let i=0; i < num; i++){
    fill(25);
    strokeWeight(5);
    rect(x,y+100,125,45);
    rect(x+125,y+100,225,45);
    rect(x+350,y+100,285,45);
    rect(x+635,y+100,90,45);
    rect(x+725,y+100,90,45);
    rect(x+815,y+100,90,45);
    rect(x+905,y+100,90,45);

    fill(244,173,66);
    textSize(18);
    textAlign(CENTER);
    text(currentList[i].airline_iata + currentList[i].flightnumber, x+60, y+130);
    text(airlineCodes.get(currentList[i].airline), x+240, y+130);
    text(currentList[i].status, x+500, y+130);
    text(currentList[i].estimated_departure_time.time, x+680,y+130);
    text(currentList[i].estimated_arrival_time.time, x+860,y+130);
    if (currentList[i].actual_departure_time.epoch !== 0) {
      text(currentList[i].actual_departure_time.time, x+770,y+130);
    }
    else{
      text("N/A", x+770, y+130);
    }
    if (currentList[i].actual_arrival_time.epoch !== 0) {
      text(currentList[i].actual_arrival_time.time, x+950,y+130);
    }
    else {
      text("N/A", x+950, y+130);
    }

    y += 45;
  }
  strokeWeight(5);
  fill(66,241,244);
  textSize(18);
  textAlign(CENTER);
  text("Flight Number", x+63, height/2-155);
  text("Airline", x+240, height/2-155);
  text("Status", x+495, height/2-155);

  textSize(16);
  text("Est.Time", x+682, height/2-160);
  text("Of Dep.", x+682, height/2-145);
  text("Actual Time", x+772, height/2-160);
  text("Of Dep.", x+772, height/2-145);

  text("Est.Time", x+860, height/2-162);
  text("Of Arr.", x+860, height/2-147);
  text("Actual Time", x+950, height/2-160);
  text("Of Arr.", x+950, height/2-145);


  fill("orange");
  textSize(34);
  textFont(font_3);
  if (currentList === todayFlights) {
    flightDate = "2019/01/19";
  }

  else if (currentList === tomorrowFlights) {
    flightDate = "2019/01/20";
  }
  else if (currentList === yesterdayFlights) {
    flightDate = "2019/01/18";
  }
  text("Date: ", width/2+100, 60);
  fill("blue");
  text(flightDate, width/2+300, 60);



}
