let slider = document.getElementById("range");
let sliderDisplay = document.getElementById("rangeDisplay");
let startingPrice = document.getElementById("summaryPrice");
let discountValue = document.getElementById("summaryDiscount");
let totalPrice = document.getElementById("totalPrice");
let estimatedTime = document.getElementById("estimatedTime");
let additionalCost = document.getElementById("summaryExtras");
let selfPlaySwitch = document.getElementById("selfPlaySwitch");
let queueTypeImage = document.getElementById("queueTypeImage");
let queueLeftArrow = queueTypeImage.previousElementSibling;
let queueRightArrow = queueTypeImage.nextElementSibling;
let queueTypeText = document.getElementById("queueTypeText");
let pricesSelection = document.getElementById("pricesSelection");
let queueType = document.getElementById("queueType");
let valueType = document.getElementById("valueType");
let sliderStarting = document.getElementById("rangeSelection");
let imageStarting = document.getElementById("imageSelection");
let sliderStartingRange = sliderStarting.firstElementChild;
let sliderStartingDisplay = sliderStarting.lastElementChild;
let title = document.getElementById("mainSelectionHeader") /////change
let information = document.getElementById("whatYouGetInformation");
let currencyValue = document.getElementById("currencyValue");

let paypalButton = document.getElementById("purchaseContact")


sliderStarting.disabled = true;

selfPlaySwitch.disabled = true;

let titleValues = ["How many wins would you like?", "How many kills would you like?", "What level would you like to reach?", "What package would you like?", "How many challenges or dailies to complete?", "How many hours would you like?"];

let field1Values = ["QUEUE TYPE", "QUEUE TYPE", "STARTING LEVEL", "PACKAGE TYPE", "TYPE TO COMPLETE", "COACH"];
let field1Types = ["Picture", "RangeBar"];

let field2Values = ["AMOUNT OF WINS", "AMOUNT OF KILLS", "END LEVEL", "STARTING LEVEL", "AMOUNT TO COMPLETE", "AMOUNT OF HOURS"];
let sliderAttribute = ["25", "500", "100", "79", "10", "30"];


let currentSelection = 0;

let queueTypeOptions = ["Solo", "Duo"];
let packageTypeOptions = ["Omega", "Carbide"];
let typeToCompleteOptions =["BattlePass", "Dailies"];
let coaches = ["Tom", "Maz"];

let pictureOptions = [queueTypeOptions, queueTypeOptions, "", packageTypeOptions, typeToCompleteOptions, coaches];

let startCounter = 0;

let convert = false;
let convertVal = 1;
let convertIcon = "€"
const euroToGDP = 0.87;
const euroToUSD = 1.17;
const GDPIcon = '£';
const USDIcon = '$';
const EUROIcon = '€';
let cachedStartValue = 0;
let cachedEndValue = 0;


currencyValue.onchange = function () {
  if (currencyValue.value === "EURO")
  {
    convertVal = 1;
    convertIcon = EUROIcon;
    convertBothPrices();
    convert = false;
  }
  else {
    convert = true;
    if (currencyValue.value === "GDP")
    {
      convertVal = euroToGDP;
      convertIcon = GDPIcon;
    }
    else if (currencyValue.value === "USD")
    {
      convertVal = euroToUSD;
      convertIcon = USDIcon;
    }

    convertBothPrices();

  }


};

function convertBothPrices() {
  startingPrice.innerHTML = `${convertIcon}${(cachedStartValue * convertVal).toFixed(2)}`;
  totalPrice.innerHTML = `${convertIcon}${(cachedEndValue * convertVal).toFixed(2)}`;
}

function convertPrice(PriceF) {
  cachedStartValue = PriceF;
  if (convert)
  {
  startingPrice.innerHTML = `${convertIcon}${(PriceF * convertVal).toFixed(2)}`;
  }
  else
  {
  startingPrice.innerHTML = `€${PriceF}`;
  }
}

function convertTotalPrice(totalPriceF) {
  cachedEndValue = totalPriceF;
  if (convert)
  {
    totalPrice.innerHTML = `${convertIcon}${(totalPriceF * convertVal).toFixed(2)}`;
  }
  else
  {
    totalPrice.innerHTML = `€${totalPriceF}`;
  }
}

queueLeftArrow.addEventListener("click", () => {

    startCounter -= 1;

    if (startCounter >= pictureOptions[currentSelection].length || startCounter < 0)
    {
      startCounter = (pictureOptions[currentSelection].length - 1);
    }
    queueTypeText.innerHTML = pictureOptions[currentSelection][startCounter];
    if (currentSelection === 0)
    {
      if (startCounter === 1)
      {
        selfPlaySwitch.disabled = false;
      }
      else
      {
        selfPlaySwitch.disabled = true;
      }
      queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][startCounter]}.svg`);
    }
    else if (currentSelection === 1)
    {
    queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][startCounter]}.svg`);
    }
    else if (currentSelection === 3) {
      queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][startCounter]}.png`);
      if (startCounter === 0) {
      slider.setAttribute("max", "79");
      slider.value = 1;
      sliderDisplay.innerHTML = 1;
      }
      else {
      slider.setAttribute("max", "64");
      slider.value = 1;
      sliderDisplay.innerHTML = 1;
      }
    }
    else {
      queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][startCounter]}.png`);
    }
})

queueRightArrow.addEventListener("click", () => {
  startCounter += 1;

  if (startCounter >= pictureOptions[currentSelection].length || startCounter < 0)
  {
    startCounter = 0;
  }
  queueTypeText.innerHTML = pictureOptions[currentSelection][startCounter];
  if (currentSelection === 0)
  {
    if (startCounter === 1)
    {
      selfPlaySwitch.disabled = false;
    }
    else
    {
      selfPlaySwitch.disabled = true;
      selfPlaySwitch.checked = false;
    }
    queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][startCounter]}.svg`);
  }
  else if (currentSelection === 1)
  {
  queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][startCounter]}.svg`);
  }
  else if (currentSelection === 3) {
    queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][startCounter]}.png`);
    if (startCounter === 0) {
    slider.setAttribute("max", "79");
    slider.value = 1;
    sliderDisplay.innerHTML = 1;
    sliderAmount = 1;
    calculateWhenStoppedPackage.call(slider);
    }
    else {
    slider.setAttribute("max", "64");
    slider.value = 1;
    sliderDisplay.innerHTML = 1;
    sliderAmount = 1;
    calculateWhenStoppedPackage.call(slider);
    }
  }
  else
  {
    queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][startCounter]}.png`);
  }
})

let sliderAmount = slider.value;
let startSliderAmount = sliderStartingRange.value;
const winsCostEuro = 8;
const killCostEuro = 0.4;
const challengeCostEuro = 4;
const coachCostEuro = 18;


const discountAt5 = 5;
const discountAt15= 10;
const discountAt100 = 5;
const discountAt200 = 10;

const baseDiscount = 0;


const estimateTimePerWin = 28;
const estimateTimePerKill = 2;
const estimatedTimePerChallenge = 35;
const euroS = "€";
const selfPlayValue = 30;
let totalTimeTaken = (slider.value * estimateTimePerWin);
let currentDiscount = baseDiscount;
let extrasIncrease = 0;

let startingXpValue = 0;
let endingXpValue = 7300;


// startingPrice.innerHTML = `${euroS} ${(winsCostEuro * sliderAmount)}`;
// discountValue.innerHTML = `-${baseDiscount}%`;
// totalPrice.innerHTML = `${euroS} ${(winsCostEuro * sliderAmount)}`;
// estimatedTime.innerHTML = `${totalTimeTaken} minutes`;
// additionalCost.innerHTML = '0%';



sliderDisplay.innerHTML = sliderAmount;


  function winsFunction() {
    sliderDisplay.innerHTML = this.value;
    sliderAmount = this.value;
    priceAmount = (this.value * winsCostEuro);


    if (sliderAmount > 15) {
        discountValue.innerHTML = `-${discountAt15}%`;
        currentDiscount = discountAt15;
    }
    else if (sliderAmount > 5) {
      discountValue.innerHTML = `-${discountAt5}%`;
      currentDiscount = discountAt5;
    }
    else {
      discountValue.innerHTML = `-${baseDiscount}%`;
      currentDiscount = baseDiscount;
    }





    totalTimeTaken = sliderAmount * estimateTimePerWin;

    if ((totalTimeTaken / 60) > 1) {
      // let wholeTime = toString(toFloat(totalTimeTaken/60).toFixed(2)).split(".");
      let wholeTime = Math.round(totalTimeTaken/60);
      // let wholeTimeStringArr = toString(wholeTime).split('.');
      // let hours = parseInt(wholeTime[0]);
      // let minutes = parseInt(wholeTime[1]);

      // if (minutes > 5){
      //   hours += 1;
      // }
      estimatedTime.innerHTML = `${wholeTime} hours`;

      // let minutes = parseInt(((wholeTime[1] / 10) * 60));
    }
    else
    {
      estimatedTime.innerHTML = `${totalTimeTaken} minutes`;
    }

    // startingPrice.innerHTML = `€${priceAmount}`;
    convertPrice(priceAmount);

    if (extrasIncrease > 0)
    {
      if (currentDiscount > extrasIncrease)
      {
        let discountDecimal = ((currentDiscount - extrasIncrease) * 0.01);

        let discountedTotal = (priceAmount - (priceAmount * discountDecimal)).toFixed(2);

        // totalPrice.innerHTML =`€${discountedTotal}`;
        convertTotalPrice(discountedTotal);

      }
      else if (currentDiscount == extrasIncrease)
      {
        // totalPrice.innerHTML =`€${priceAmount}`
        convertTotalPrice(priceAmount);
      }
      else
      {
        let discountDecimal = ((extrasIncrease - currentDiscount) * 0.01);

        let discountedTotal = (priceAmount + (priceAmount * discountDecimal)).toFixed(2);

        // totalPrice.innerHTML =`€${discountedTotal}`;
        convertTotalPrice(discountedTotal);
      }
    }
    else {
      let discountDecimal = (currentDiscount * 0.01);

      let discountedTotal = (priceAmount - (priceAmount * discountDecimal)).toFixed(2);

      // totalPrice.innerHTML =`€${discountedTotal}`;
      convertTotalPrice(discountedTotal);

    }


}

winsFunction.call(slider);

function KDAFunction() {
  sliderDisplay.innerHTML = this.value;
  sliderAmount = this.value;
  priceAmount = (this.value * killCostEuro).toFixed(2);


  if (sliderAmount > 200) {
      discountValue.innerHTML = `-${discountAt200}%`;
      currentDiscount = discountAt200;
  }
  else if (sliderAmount > 100) {
    discountValue.innerHTML = `-${discountAt100}%`;
    currentDiscount = discountAt100;
  }
  else {
    discountValue.innerHTML = `-${baseDiscount}%`;
    currentDiscount = baseDiscount;
  }


  totalTimeTaken = sliderAmount * estimateTimePerKill;

  if ((totalTimeTaken / 60) > 1) {
    // let wholeTime = toString(toFloat(totalTimeTaken/60).toFixed(2)).split(".");
    let wholeTime = Math.round(totalTimeTaken/60);
    // let wholeTimeStringArr = toString(wholeTime).split('.');
    // let hours = parseInt(wholeTime[0]);
    // let minutes = parseInt(wholeTime[1]);

    // if (minutes > 5){
    //   hours += 1;
    // }
    estimatedTime.innerHTML = `${wholeTime} hours`;

    // let minutes = parseInt(((wholeTime[1] / 10) * 60));
  }
  else
  {
    estimatedTime.innerHTML = `${totalTimeTaken} minutes`;
  }

  // startingPrice.innerHTML = `€${priceAmount}`;
  convertPrice(priceAmount);

  let discountDecimal = (currentDiscount * 0.01);

  let discountedTotal = (priceAmount - (priceAmount * discountDecimal)).toFixed(2);

  convertTotalPrice(discountedTotal);

  // totalPrice.innerHTML =`€${discountedTotal}`;

}

function challengeFunction() {
  sliderDisplay.innerHTML = this.value;
  sliderAmount = this.value;
  priceAmount = (this.value * challengeCostEuro).toFixed(2);


  discountValue.innerHTML = `-${baseDiscount}%`;
  currentDiscount = baseDiscount;

  totalTimeTaken = sliderAmount * estimatedTimePerChallenge;

  if ((totalTimeTaken / 60) > 1) {
    // let wholeTime = toString(toFloat(totalTimeTaken/60).toFixed(2)).split(".");
    let wholeTime = Math.round(totalTimeTaken/60);
    // let wholeTimeStringArr = toString(wholeTime).split('.');
    // let hours = parseInt(wholeTime[0]);
    // let minutes = parseInt(wholeTime[1]);

    // if (minutes > 5){
    //   hours += 1;
    // }
    estimatedTime.innerHTML = `${wholeTime} hours`;

    // let minutes = parseInt(((wholeTime[1] / 10) * 60));
  }
  else
  {
    estimatedTime.innerHTML = `${totalTimeTaken} minutes`;
  }

  convertPrice(priceAmount);
  // startingPrice.innerHTML = `€${priceAmount}`;

  let discountDecimal = (currentDiscount * 0.01);

  let discountedTotal = (priceAmount - (priceAmount * discountDecimal)).toFixed(2);

  convertTotalPrice(discountedTotal);

  // totalPrice.innerHTML =`€${discountedTotal}`;

}

function coachingFunction() {
  sliderDisplay.innerHTML = this.value;
  sliderAmount = this.value;
  priceAmount = (this.value * coachCostEuro).toFixed(2);


  discountValue.innerHTML = `-${baseDiscount}%`;
  currentDiscount = baseDiscount;

  estimatedTime.innerHTML = `${sliderAmount} hours`;

  // startingPrice.innerHTML = `€${priceAmount}`;
  convertPrice(priceAmount);

  let discountDecimal = (currentDiscount * 0.01);

  let discountedTotal = (priceAmount - (priceAmount * discountDecimal)).toFixed(2);

  // totalPrice.innerHTML =`€${discountedTotal}`;
  convertTotalPrice(discountedTotal);

}

function levelingFunctionStart() {

  sliderStartingDisplay.innerHTML = this.value;
  sliderStartingAmount = this.value;

  slider.setAttribute("min", (parseInt(sliderStartingAmount)+ 1)) ;


  // if (sliderStartingAmount >= 90)
  // {
  //   (sliderStartingAmount - 90)
  //   25400 + (sliderStartingAmount * 700)
  // }
  // else if (sliderStartingAmount >= 80)
  // {
  //   (sliderStartingAmount - 80)
  //   19300 + (sliderStartingAmount * 600)
  // }
  // else if (sliderStartingAmount >= 70)
  // {
  //   (sliderStartingAmount - 70)
  //   14300 + (sliderStartingAmount * 500)
  // }
  // else if

}

let xpValueForStart = 0;
let xpValueForEnd = 0;
let xpTotal = 0;

const xpPerMin = 74;
const xpPerHour = (xpPerMin * 60);
const xpPerDay = (xpPerHour * 8);
const costPerHour = 12;
const costPerMin = (costPerHour / 60);

function levelingFunctionEnd() {
  sliderDisplay.innerHTML = this.value;
  sliderAmount = this.value;
}

const xpArray = [
["350", "350", "0", "100"],
["8000", "1250", "10", "100"],
["26050", "2300", "20", "150"],
["57300", "3800", "30", "150"],
["103550", "5300", "40", "200"],
["167550", "7300", "50", "300"],
["257050", "10300", "60", "400"],
["382050", "14300", "70", "500"],
["552550", "19300", "80", "600"],
["778650", "25400", "90", "700"]
];

function calculateLevelXP(sliderStartLevel, arrayVal)
{
  let totalXp = parseInt(arrayVal[0]);
  let levelXp = parseInt(arrayVal[1]);
  let levelCount = (parseInt(sliderStartLevel) - parseInt(arrayVal[2]));
  for (let i = 0; i < levelCount; i++) {
    levelXp += parseInt(arrayVal[3]);
    totalXp += levelXp;

  }
  return totalXp;
}

// startingXpValue = 778650;
// levelXP = 25400;
// levelCount = (parseInt(sliderStartingAmount) - 90);
// for (let i = 0; i < levelCount; i++) {
//   startingXpValue += levelXP;
//   levelXP += 700;

function calculateWhenStoppedPackage()
{

  if (sliderAmount >= 80)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[8]);
  }
  else if (sliderAmount >= 70)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[7]);
  }
  else if (sliderAmount >= 60)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[6]);
  }
  else if (sliderAmount >= 50)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[5]);
  }
  else if (sliderAmount >= 40)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[4]);
  }
  else if (sliderAmount >= 30)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[3]);
  }
  else if (sliderAmount >= 20)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[2]);
  }
  else if (sliderAmount >= 10)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[1]);
  }
  else if (sliderAmount >= 0)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[0]);
  }
  let packageCostPerHour = 12;
  if (startCounter === 0)
  {
    xpTotal = (552550 - xpValueForEnd);
    packageCostPerHour = 1450 / (552550 / xpPerHour);

  }
  else if (startCounter === 1)
  {
    xpTotal = (314550 - xpValueForEnd);
    packageCostPerHour = 800 / (314550 / xpPerHour);
  }

  if (xpTotal >= xpPerDay)
  {
    estimatedTime.innerHTML = `${Math.round(xpTotal / xpPerDay)} days`;
    priceAmount = ((xpTotal / xpPerHour) * packageCostPerHour).toFixed(2);
  }
  else if (xpTotal >= xpPerHour)
  {
    estimatedTime.innerHTML = `${Math.round(xpTotal / xpPerHour)} hours`;
    priceAmount = ((xpTotal / xpPerHour) * packageCostPerHour).toFixed(2);
  }
  else
  {
    estimatedTime.innerHTML = `${Math.round(xpTotal / xpPerMin)} minutes`;
    priceAmount = ((xpTotal / xpPerMin) * (packageCostPerHour/60)).toFixed(2);
  }


  // startingPrice.innerHTML = `€${priceAmount}`;
  convertPrice(priceAmount);
  //
  // let discountDecimal = (currentDiscount * 0.01);
  //
  // let discountedTotal = (priceAmount - (priceAmount * discountDecimal)).toFixed(2);

  // totalPrice.innerHTML =`€${priceAmount}`;
  convertTotalPrice(priceAmount);

}

function calculateWhenStopped() {

  if (parseInt(sliderStartingAmount) >= parseInt(sliderAmount))
  {
    sliderAmount = parseInt(sliderStartingAmount) + 1;
    slider.value = sliderAmount;
    sliderDisplay.innerHTML = sliderAmount;
  }


  if (sliderStartingAmount >= 90)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[9]);
  }
  else if (sliderStartingAmount >= 80)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[8]);
  }
  else if (sliderStartingAmount >= 70)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[7]);
  }
  else if (sliderStartingAmount >= 60)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[6]);
  }
  else if (sliderStartingAmount >= 50)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[5]);
  }
  else if (sliderStartingAmount >= 40)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[4]);
  }
  else if (sliderStartingAmount >= 30)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[3]);
  }
  else if (sliderStartingAmount >= 20)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[2]);
  }
  else if (sliderStartingAmount >= 10)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[1]);
  }
  else if (sliderStartingAmount >= 0)
  {
    xpValueForStart = calculateLevelXP(sliderStartingAmount, xpArray[0]);
  }

  if (sliderAmount >= 90)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[9]);
  }
  else if (sliderAmount >= 80)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[8]);
  }
  else if (sliderAmount >= 70)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[7]);
  }
  else if (sliderAmount >= 60)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[6]);
  }
  else if (sliderAmount >= 50)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[5]);
  }
  else if (sliderAmount >= 40)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[4]);
  }
  else if (sliderAmount >= 30)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[3]);
  }
  else if (sliderAmount >= 20)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[2]);
  }
  else if (sliderAmount >= 10)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[1]);
  }
  else if (sliderAmount >= 0)
  {
    xpValueForEnd = calculateLevelXP(sliderAmount, xpArray[0]);
  }


  // console.log(xpValueForStart);
  // console.log(xpValueForEnd);

  // xpValueForEnd - xpValueForStart * costPerXp

  xpTotal = (xpValueForEnd - xpValueForStart);

  if (xpTotal >= xpPerDay)
  {
    estimatedTime.innerHTML = `${Math.round(xpTotal / xpPerDay)} days`;
    priceAmount = ((xpTotal / xpPerHour) * costPerHour).toFixed(2);
  }
  else if (xpTotal >= xpPerHour)
  {
    estimatedTime.innerHTML = `${Math.round(xpTotal / xpPerHour)} hours`;
    priceAmount = ((xpTotal / xpPerHour) * costPerHour).toFixed(2);
  }
  else
  {
    estimatedTime.innerHTML = `${Math.round(xpTotal / xpPerMin)} minutes`;
    priceAmount = ((xpTotal / xpPerMin) * costPerMin).toFixed(2);
  }

  // startingPrice.innerHTML = `€${priceAmount}`;
  convertPrice(priceAmount);
  //
  // let discountDecimal = (currentDiscount * 0.01);
  //
  // let discountedTotal = (priceAmount - (priceAmount * discountDecimal)).toFixed(2);

  // totalPrice.innerHTML =`€${priceAmount}`;
  convertTotalPrice(priceAmount);





}

slider.oninput = winsFunction;



selfPlaySwitch.addEventListener("input", () => {
  if (startCounter === 1 && currentSelection === 0) {
  if (selfPlaySwitch.checked) {
    extrasIncrease += selfPlayValue;
    additionalCost.innerHTML = `+${extrasIncrease}%`;

    if ((extrasIncrease - currentDiscount) > 0) {
        let discountDecimal = ((extrasIncrease - currentDiscount) * 0.01);
        let confirmSlider = slider.value;
        let confirmSliderPrice = (confirmSlider * winsCostEuro);
        let discountedPrice = confirmSliderPrice * discountDecimal;
        let discountedTotal = (confirmSliderPrice + discountedPrice).toFixed(2);

        // totalPrice.innerHTML = `€${discountedTotal}`;
        convertTotalPrice(discountedTotal);
    }
    else if ((extrasIncrease - currentDiscount) === 0) {
      let confirmSlider = slider.value;
        let confirmSliderPrice = (confirmSlider * winsCostEuro).toFixed(2);
        // totalPrice.innerHTML = `€${confirmSliderPrice}`;
        convertTotalPrice(confirmSliderPrice);
    }
    else {
      let discountDecimal = ((currentDiscount - extrasIncrease) * 0.01);
      let confirmSlider = slider.value;
      let confirmSliderPrice = (confirmSlider * winsCostEuro);
      let discountedPrice = confirmSliderPrice * discountDecimal;
      let discountedTotal = (confirmSliderPrice - discountedPrice).toFixed(2);
      // totalPrice.innerHTML = `€${discountedTotal}`;
      convertTotalPrice(discountedTotal);
    }
    // else
    // {
    //   let discountDecimal = ((extrasIncrease - currentDiscount) * 0.01);
    //   let sliderAmount = slider.value
    //   let discountedPrice = sliderAmount * discountDecimal;
    //   let discountedTotal = sliderAmount + discountedPrice;
    // }

  }
  else {
    extrasIncrease -= selfPlayValue;
    if ((extrasIncrease - currentDiscount) > 0) {
        let discountDecimal = ((extrasIncrease - currentDiscount) * 0.01);
        let confirmSlider = slider.value;
        let confirmSliderPrice = (confirmSlider * winsCostEuro);
        let discountedPrice = confirmSliderPrice * discountDecimal;
        let discountedTotal = (confirmSliderPrice + discountedPrice).toFixed(2);

        // totalPrice.innerHTML = `€${discountedTotal}`;
        convertTotalPrice(discountedTotal);
    }
    else if ((extrasIncrease - currentDiscount) === 0) {
      let confirmSlider = slider.value;
      let confirmSliderPrice = (confirmSlider * winsCostEuro).toFixed(2);
      // totalPrice.innerHTML = `€${confirmSliderPrice}`;
      convertTotalPrice(confirmSliderPrice);
    }
    else {
      let discountDecimal = ((currentDiscount - extrasIncrease) * 0.01);
      let confirmSlider = slider.value;
      let confirmSliderPrice = (confirmSlider * winsCostEuro);
      let discountedPrice = confirmSliderPrice * discountDecimal;
      let discountedTotal = (confirmSliderPrice - discountedPrice).toFixed(2);
      // totalPrice.innerHTML = `€${discountedTotal}`;
      convertTotalPrice(discountedTotal);
    }

    additionalCost.innerHTML = `+${extrasIncrease}%`;
  }
}
})

function description(ServiceType) {
  return `${slider.value} ServiceType`;
}


paypalButton.addEventListener("click", () => {

  let serviceType = "";
  let initialPrice = totalPrice.innerHTML;
  let calculatedPrice;
  let confirmCurrency;
  if (currentSelection === 0)
  {
    winsFunction.call(slider);
    if (startCounter === 0)
    {
    serviceType = `${slider.value} Solo Wins `;
    }
    if (startCounter === 1)
    {
      if (selfPlaySwitch.checked){
    serviceType = `${slider.value} Self Play Duo Wins `;
    }
    else {
      serviceType = `${slider.value} Duo Wins `;
    }
    }
  }
  else if (currentSelection === 1)
  {
    KDAFunction.call(slider);
    if (startCounter === 0)
    {
    serviceType = `${slider.value} Solo Kills `;
    }
    if (startCounter === 1)
    {
    serviceType = `${slider.value} Duo Kills `;
    }
  }
  else if (currentSelection === 2)
  {
    calculateWhenStopped.call(slider);
    serviceType = `Level ${sliderStartingRange.value} to ${slider.value}`;
  }
  else if (currentSelection === 3)
  {
    calculateWhenStoppedPackage.call(slider);
    if (startCounter === 0) {
    serviceType = `Level ${slider.value} to 80 OmegaPackage`;
    }
    else if (startCounter === 1) {
      serviceType = `Level ${slider.value} to 65 CarbidePackage`;
    }
  }
  else if (currentSelection === 4)
  {
    challengeFunction.call(slider);
    if (startCounter === 0)
    {
      serviceType = `${slider.value} Challenges`;
    }
    if (startCounter === 1)
    {
      serviceType = `${slider.value} Dailies`;
    }
  }
  else if (currentSelection === 5) {
    coachingFunction.call(slider);
    if (startCounter === 0)
    {
    serviceType = `${slider.value} Hours with Tom`;
    }
    if (startCounter === 1)
    {
      serviceType = `${slider.value} Hours with Maz`;
    }
  }

  let confirmationPrice = totalPrice.innerHTML;

  if (initialPrice === confirmationPrice)
  {
    if(convertIcon === confirmationPrice.charAt(0)) {
      let currencyType = "GBP";
      if(convertIcon === GDPIcon)
      {
        currencyType = "GBP";
      }
      else if (convertIcon === USDIcon)
      {
        currencyType = "USD";
      }
      else if (convertIcon === EUROIcon)
      {
        currencyType = "EUR";
      }

    // console.log(serviceType);
    // console.log(confirmationPrice.substring(1));
    // console.log(confirmationPrice.charAt(0));
    // console.log(currencyType);


    modalBody.innerHTML = `<p>Service: <span class="boldFont">${serviceType}</span></p><p>Cost: <span class="boldFont">${confirmationPrice}</span></p>
      <p><i>Enter your Epic Games Username and Password into the paypal note field</i></p>`

    let paypalLink = document.getElementById("paypalLink");
    // let someFunkyButton = document.createElement("BUTTON");
//     someFunkyButton.innerHTML = `<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
// <input type="hidden" name="cmd" value="_xclick">
// <input type="hidden" name="business" value="8JLGL6ZN8ABR4">
// <input type="hidden" name="lc" value="GB">
// <input type="hidden" name="item_name" value="${serviceType}">
// <input type="hidden" name="amount" value="${confirmationPrice.substring(1)}">
// <input type="hidden" name="currency_code" value="GBP">
// <input type="hidden" name="button_subtype" value="services">
// <input type="hidden" name="no_note" value="0">
// <input type="hidden" name="cn" value="Add username and password here">
// <input type="hidden" name="no_shipping" value="1">
// <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">
// <input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!">
// <img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
// </form>`
paypalLink.innerHTML = `<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="8JLGL6ZN8ABR4">
<input type="hidden" name="lc" value="GB">
<input type="hidden" name="item_name" value="${serviceType}">
<input type="hidden" name="amount" value="${confirmationPrice.substring(1)}">
<input type="hidden" name="currency_code" value="${currencyType}">
<input type="hidden" name="button_subtype" value="services">
<input type="hidden" name="no_note" value="0">
<input type="hidden" name="cn" value="Add username and password here">
<input type="hidden" name="no_shipping" value="1">
<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">
<input type="image" src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
</form>`

  }

  }


})


pricesSelection.addEventListener("click", (event) => {

  if (event.target.tagName === "BUTTON") {
    document.getElementById("buttonSelected").removeAttribute("id");
    event.target.setAttribute("id", "buttonSelected");
    let buttons = document.getElementsByClassName("selection");
    for (let i = 0; i < buttons.length; i++){
      if (buttons[i].getAttribute("id"))
      {
        queueType.firstElementChild.firstElementChild.innerHTML = field1Values[i];
        valueType.firstElementChild.firstElementChild.innerHTML = field2Values[i];
        title.innerHTML = `<span>01</span> ${titleValues[i]}`
        currentSelection = i;
        startCounter = 0;
        // Hiding previous Details and Showing the currently selected one
        let ulInformation = information.children;

        for (let ulNum = 0; ulNum < ulInformation.length; ulNum++)
        {
          if (!(ulInformation[ulNum].hasAttribute("class")))
          {
            ulInformation[ulNum].setAttribute("class", "displayNone");
          }

        }

        sliderStartingRange.onchange = ""
        slider.onchange = "";

        startingPrice.innerHTML = `--`;
        discountValue.innerHTML = `${baseDiscount}%`;
        totalPrice.innerHTML = `--`;
        estimatedTime.innerHTML = `--`;
        additionalCost.innerHTML = '0%';

        selfPlaySwitch.disabled = true;
        selfPlaySwitch.checked = false;



        ulInformation[i].removeAttribute("class");
        //


        if (i === 2) {
          slider.oninput = levelingFunctionEnd;
          sliderStartingRange.oninput = levelingFunctionStart;
          sliderStartingRange.onchange = calculateWhenStopped;
          slider.onchange = calculateWhenStopped;

          sliderStarting.disabled = false;
          sliderStarting.style.display = "block";
          imageStarting.style.display = "none";
          queueTypeText.innerHTML = "";
          sliderStartingRange.value = 1;
          sliderStartingDisplay.innerHTML = sliderStartingRange.value;
          slider.setAttribute("min", "2");
          slider.setAttribute("max", sliderAttribute[2]);
          slider.value = 50;
          sliderAmount = 50;
          sliderStartingAmount = 1;
          sliderDisplay.innerHTML = slider.value;

          calculateWhenStopped.call(slider);
        }
        else {
          sliderStarting.disabled = true;
          sliderStarting.style.display = "none";
          imageStarting.style.display = "flex";
          slider.setAttribute("min", "1");
          slider.setAttribute("max", sliderAttribute[i]);
          slider.value = 1;
          sliderAmount = 1;
          sliderDisplay.innerHTML = slider.value;
          queueTypeText.innerHTML = pictureOptions[currentSelection][0];
          if (currentSelection === 0 || currentSelection === 1) {
          queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][0]}.svg`);
          }
          else
          {
           queueTypeImage.setAttribute("src", `Icons/${pictureOptions[currentSelection][0]}.png`);
          }
        }
        if (i === 0) {
          slider.oninput = winsFunction;
          winsFunction.call(slider);

        }
        else if (i === 1)
        {
          slider.oninput = KDAFunction;
          KDAFunction.call(slider);
        }
        else if (i === 3)
        {
          slider.oninput = levelingFunctionEnd;
          slider.onchange = calculateWhenStoppedPackage;
          calculateWhenStoppedPackage.call(slider);
        }
        else if (i === 4)
        {
          slider.oninput = challengeFunction;
          challengeFunction.call(slider);
        }

        if (i === 5) {
          slider.oninput = coachingFunction;
          coachingFunction.call(slider);
        }

      }
    }
  }
})
