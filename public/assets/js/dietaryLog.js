//global variable
let displayedUnit = "";
let fetchURL = "";

//Food Input Validation
//item validation
let itemInputVal = document.getElementById('itemInput');
//check for all text input is either text, backspace or space
itemInputVal.onkeydown = function (e) {
    if (!((e.keyCode > 64 && e.keyCode < 91)
        || e.keyCode == 8 || e.keyCode == 32 || e.keyCode == 46)) {
        return false;
    }
}

// // amount validation and macro validation
//domSection.onkeydown = function (e) {
//         //prevent negative numbers from being typed in Amount, html min="0" covers the up/down arrows
//         if (!((e.keyCode > 95 && e.keyCode < 106)
//             || (e.keyCode > 47 && e.keyCode < 58)
//             || e.keyCode == 8)) {
//             return false;
//         }
//     }
// }

//Buttons
//functionality to display nutrition page
$("#nutriBtn").click(function () {
    $('.exercise').hide();
    $(".bmiSection").hide();
    $('.nutrition').show();
});

//toggle open box to input new foods
$("#addItemBtn").click(function () {
    $('.setMacros').hide();
    $('.addItem').toggle();
});

//submit button functionality 
$('#submitBtn').on('click', function () {
    inputData();
})

//toggle open box to set Macros
$("#setMacrosBtn").click(function () {
    $('.addItem').hide();
    $('.setMacros').toggle();
});

//function to submit inputted macros
$('.macroSubmit').click(function () {
    $('.setMacros').hide();
    setMacros();
})

$('.macroTable').click(function(){
    localStorage.removeItem("macroRow");
    setMacros();
})

//delete all button functionality to clear local storage for nutrition
$(".deleteAllBtn").click(function () {
    localStorage.removeItem("nutritionRow");
    $('.logRow').remove();
});

//remove button both removes the row from the display and local storage
$("#foodValues").on('click', '.removeBtn', function () {
    let removedName = $(this).parent().siblings('.nameInfo').text();
    let removedCal = $(this).parent().siblings('.calInfo').text();
    $(this).closest('tr').remove();
    sumTotal();
    updateRow(removedName, removedCal);
})

//close button for notification
$('.delBtn').click(function () {
    $(".notification").hide();
})

//function to pull info from inputs into API
function inputData() {
    //hide notification
    $(".notification").hide();

    let amount = '';
    let unit = "";
    let food = "";
   
    let amountInput = $('#amountInput');
    let unitInput = $('#unitInput');
    let itemInput = $('#itemInput');

    food = itemInput.val();
    food.trim().toLowerCase();
    food.split("");

    //remove any spaces within the item and replace with %20
    for (let i = 0; i < food.length; i++) {
        if (food[i] = " ") {
            food[i] = "%20";
        }
    }
    food.toString();

    unit = unitInput.val();

    //if unit input is used, use fetch request with only food item name
    if (unit === "item") {
        itemNotif();
        let itemUrl = 'https://api.api-ninjas.com/v1/nutrition?query=' + food;
        displayedUnit = "item";
        getData(food);
        return;
    }

    //assign user input to API queries and clean up extra spaces
    amount = amountInput.val().trim();
    displayedUnit = amount + unit;

    if (amount === "") {
        errorMessage();
        return;
    }

    parseInt(amount, 10);
    //exit request if amount is negative
    if (amount < 0) {
        return;
    }

    //round as only whole numbers are taken
    amount = Math.round(amount).toString();

    // call API with user input
    let requestNutriUrl = amount + '%20' + unit + '%20' + food;
    getData(requestNutriUrl);
}

//function to fetch API info
async function getData(url) {
    let response = await fetch(`/api/nutrition/${url}`);
    let data = await response.json();
    //check output if blank or name nan
    if (data.length === 0 || data[0].name === 'nan') {
        errorMessage();
        return;
    }
    addToArray(data);
    printSavedNutrition(); 
}

//function used to add API returned data to an array
function addToArray(data) {
    let newSaved = [];

    if (localStorage.getItem('nutritionRow') !== null) {
        newSaved = JSON.parse(localStorage.getItem('nutritionRow'));
    }

    newSaved.push(data[0].name + " (" + displayedUnit + ")");
    newSaved.push(data[0].calories);
    newSaved.push(data[0].protein_g);
    newSaved.push(data[0].carbohydrates_total_g);
    newSaved.push(data[0].fat_total_g);
    newSaved.push(data[0].sodium_mg);
    newSaved.push(data[0].cholesterol_mg);

    //save row into local storage
    localStorage.setItem('nutritionRow', JSON.stringify(newSaved));
}

//function to print all food info already saved in local storage
function printSavedNutrition() {
    $('.logRow').remove();
    let table = $('.nutritionTable');
    let savedNArray = JSON.parse(localStorage.getItem('nutritionRow'));
    for (let i = 0; i < (savedNArray.length / 7); i++) {
        let base = 7;
        base = base * i;

        let newRow = $('<tr>');
        newRow.addClass('logRow');

        let itemInfo = $('<td>');
        itemInfo.text(savedNArray[base]).addClass('nameInfo');
        newRow.append(itemInfo);

        let calInfo = $('<td>');
        calInfo.text(savedNArray[base + 1]).addClass('calInfo');
        newRow.append(calInfo);

        let protInfo = $('<td>');
        protInfo.text(savedNArray[base + 2]).addClass('protInfo');
        newRow.append(protInfo);

        let carInfo = $('<td>');
        carInfo.text(savedNArray[base + 3]).addClass('carInfo');
        newRow.append(carInfo);

        let fatInfo = $('<td>');
        fatInfo.text(savedNArray[base + 4]).addClass('fatInfo');
        newRow.append(fatInfo);

        let sodInfo = $('<td>');
        sodInfo.text(savedNArray[base + 5]).addClass('sodInfo is-hidden-mobile');
        newRow.append(sodInfo);

        let cholInfo = $('<td>');
        cholInfo.text(savedNArray[base + 6]).addClass('cholInfo is-hidden-mobile');
        newRow.append(cholInfo);

        let remove = $('<td>');
        let removeBtn = $('<button>')
        removeBtn.addClass('removeBtn delete').text('X');
        remove.append(removeBtn);
        newRow.append(remove);

        table.append(newRow);
        sumTotal();
    }
}

//aggregate all the amounts from the page displayed in the total row
function sumTotal() {
    let calInfoTot = 0;
    let protInfoTot = 0;
    let carInfoTot = 0;
    let fatInfoTot = 0;
    let sodInfoTot = 0;
    let cholInfoTot = 0;

    $(".calInfo").each(function () {
        let totalcal = this.textContent;
        calInfoTot = calInfoTot + parseInt(totalcal);
    })
    $(".protInfo").each(function () {
        let totalprot = this.textContent;
        protInfoTot = protInfoTot + parseInt(totalprot);
    })
    $(".carInfo").each(function () {
        let totalcar = this.textContent;
        carInfoTot = carInfoTot + parseInt(totalcar);
    })
    $(".fatInfo").each(function () {
        let totalfat = this.textContent;
        fatInfoTot = fatInfoTot + parseInt(totalfat);
    })
    $(".sodInfo").each(function () {
        let totalsod = this.textContent;
        sodInfoTot = sodInfoTot + parseInt(totalsod);
    })
    $(".cholInfo").each(function () {
        let totalchol = this.textContent;
        cholInfoTot = cholInfoTot + parseInt(totalchol);
    })

    $("#caloriesTot").text(calInfoTot + " kcal");
    $("#proteinTot").text(protInfoTot + " g");
    $("#carbsTot").text(carInfoTot + " g");
    $("#fatTot").text(fatInfoTot + " g");
    $("#sodiumTot").text(sodInfoTot + " mg");
    $("#cholesterolTot").text(cholInfoTot + " mg");
}

//add validation
function setMacros() {
    let proteinMacros = $('#protein').val();
    let carbsMacros = $('#carbs').val();
    let fatMacros = $('#fat').val();
    let calMacros = $('#cals').val();
    let saveMacros = [];

    $("#calMacros").text(calMacros + " kcal");
    $("#proteinMacros").text(proteinMacros + " g");
    $("#carbMacros").text(carbsMacros + " g");
    $("#fatMacros").text(fatMacros + " g");

    saveMacros.push(calMacros);
    saveMacros.push(proteinMacros);
    saveMacros.push(carbsMacros);
    saveMacros.push(fatMacros);
    localStorage.setItem('macroRow', JSON.stringify(saveMacros));
}

//print macros saved onto row
function printMacros() {
    let macrosSaved = JSON.parse(localStorage.getItem('macroRow'));
    $("#calMacros").text(macrosSaved[0] + " kcal");
    $("#proteinMacros").text(macrosSaved[1] + " g");
    $("#carbMacros").text(macrosSaved[2] + " g");
    $("#fatMacros").text(macrosSaved[3] + " g");
}

//update local storage after removing row
function updateRow(removedName, removedCal) {
    let oldSaved = JSON.parse(localStorage.getItem('nutritionRow'));
    for (let i = 0; i < oldSaved.length; i++) {
        if (oldSaved[i] === removedName && oldSaved[i + 1] == removedCal) {
            oldSaved.splice(i, 7);
            localStorage.setItem('nutritionRow', JSON.stringify(oldSaved));
            return;
        }
    }
}

//message displayd if API request pulls bad info
function errorMessage() {
    $(".notifText").text("Please submit valid entry.");
    $(".notification").show();
}

//function to display notification if item unit is used
function itemNotif() {
    $(".notifText").text("Item unit only displays the nutritional info for one serving size.");
    $(".notification").show();
}

//init functions
//display information if any exists in local storage
if (localStorage.getItem('nutritionRow') !== null) {
    printSavedNutrition();
}
printMacros();



