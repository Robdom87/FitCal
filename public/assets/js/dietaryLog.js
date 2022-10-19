// const helpers = require('../../../utils/helpers');

//item validation
let itemInputVal = document.getElementById('itemInput');
//check for all text input is either text, backspace or space, dash and arrow keys, and numbers including numpad
itemInputVal.onkeydown = function (e) {
    if (!((e.keyCode > 64 && e.keyCode < 91)
        || e.keyCode == 8 || e.keyCode == 32 || e.keyCode == 46 || e.keyCode == 189
        || e.keyCode == 37 || e.keyCode == 39
        || (e.keyCode > 47 && e.keyCode < 66)
        || (e.keyCode > 95 && e.keyCode < 106))) {
        return false;
    }
}

//toggle open box to input new foods
$("#addItemBtn").click(function () {
    $('.setMacros').hide();
    $('.addItem').toggle();
});

//add item submit button functionality 
$('.addItem').submit(function (event) {
    inputData();
    event.preventDefault();
})

//toggle open box to set Macros
$("#setMacrosBtn").click(function () {
    $('.addItem').hide();
    $('.setMacros').toggle();
});

//function to submit inputted macros
$('.setMacros').submit(function (event) {
    $('.setMacros').hide();
    $('.macroRow').show();
    saveMacros();
    event.preventDefault();
})

//fuunction to clear macros row
$('.macroTable').click(function () {
    localStorage.removeItem("macroRow");
    $('.macroRow').hide();
    saveMacros();
})

//delete all button functionality to clear local storage for nutrition
$(".deleteAllBtn").click(function () {
    localStorage.removeItem("nutritionRow");
    $('.logRow').remove();
    sumTotal();
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
async function inputData() {
    //hide notification
    $(".notification").hide();
    //clean up food input
    let food = $('#itemInput').val();
    $('#itemInput').val("");
    food.trim().toLowerCase();
    food.split("");
    //remove any spaces within the item and replace with %20
    for (let i = 0; i < food.length; i++) {
        if (food[i] = " ") {
            food[i] = "%20";
        }
    }
    food.toString();
    let url = `/api/nutrition/${food}`;
    let data = await helpers.getData(url);
    if (data.length === 0 || data[0].name === 'nan') {
        errorMessage();
        return;
    }
    saveRow(data);
    printSavedNutrition();
}

//function used to add API returned data to an array
function saveRow(data) {
    let newSaved = [];
    if (localStorage.getItem('nutritionRow') !== null) {
        newSaved = JSON.parse(localStorage.getItem('nutritionRow'));
    }
    //round all numbers up and pull into an object
    let servingSize = Math.round(parseInt(data[0].serving_size_g));
    let newRow = {
        name: data[0].name + " (" + servingSize + "g)",
        calories: Math.round(parseInt(data[0].calories)),
        protein: Math.round(parseInt(data[0].protein_g)),
        carbs: Math.round(parseInt(data[0].carbohydrates_total_g)),
        fat: Math.round(parseInt(data[0].fat_total_g)),
        sodium: Math.round(parseInt(data[0].sodium_mg)),
        cholesterol: Math.round(parseInt(data[0].cholesterol_mg))
    }
    newSaved.push(newRow);
    //save row into local storage
    localStorage.setItem('nutritionRow', JSON.stringify(newSaved));
}

//function to print all food info already saved in local storage
function printSavedNutrition() {
    $('.logRow').remove();
    let table = $('.nutritionTable');
    let savedNArray = JSON.parse(localStorage.getItem('nutritionRow'));
    for (let i = 0; i < savedNArray.length; i++) {
        let newRow = `<tr class="logRow">
        <td class="nameInfo">${savedNArray[i].name}</td>
        <td class="calInfo">${savedNArray[i].calories} kcal</td>
        <td class="protInfo">${savedNArray[i].protein} g</td>
        <td class="carInfo">${savedNArray[i].carbs} g</td>
        <td class="fatInfo">${savedNArray[i].fat} g</td>
        <td class="sodInfo is-hidden-mobile">${savedNArray[i].sodium} mg</td>
        <td class="cholInfo is-hidden-mobile">${savedNArray[i].cholesterol} mg</td>
        <td><button class="removeBtn delete">X</button></td></tr>`;
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

    //if no cals, print all empty
    if (calInfoTot === 0){
        $("#caloriesTot").text("kcal");
        $("#proteinTot").text("g");
        $("#carbsTot").text("g");
        $("#fatTot").text("g");
        $("#sodiumTot").text("mg");
        $("#cholesterolTot").text("mg");  
        return;
    }

    $("#caloriesTot").text(calInfoTot + " kcal");
    $("#proteinTot").text(protInfoTot + " g");
    $("#carbsTot").text(carInfoTot + " g");
    $("#fatTot").text(fatInfoTot + " g");
    $("#sodiumTot").text(sodInfoTot + " mg");
    $("#cholesterolTot").text(cholInfoTot + " mg");
}

//add validation
function saveMacros() {
    let macroObj = {
        protein: $('#protein').val(),
        carbs: $('#carbs').val(),
        fat: $('#fat').val(),
        calories: $('#cals').val()
    }
    localStorage.setItem('macroRow', JSON.stringify(macroObj));
    printMacros();
}

//print macros saved onto row
function printMacros() {
    let macrosSaved = JSON.parse(localStorage.getItem('macroRow'));
    console.log(macrosSaved);
    $("#calMacros").text(macrosSaved.calories + " kcal");
    $("#proteinMacros").text(macrosSaved.protein + " g");
    $("#carbMacros").text(macrosSaved.carbs + " g");
    $("#fatMacros").text(macrosSaved.fat + " g");
}

//update local storage after removing row
function updateRow(removedName, removedCal) {
    let oldSaved = JSON.parse(localStorage.getItem('nutritionRow'));
    for (let i = 0; i < oldSaved.length; i++) {
        if (oldSaved[i].name === removedName && oldSaved[i].calories == removedCal) {
            oldSaved.splice(i, 1);
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

//init functions
//display information if any exists in local storage
function init() {
    if (localStorage.getItem('nutritionRow') !== null) {
        $('.sampleNutri').empty();
        printSavedNutrition();
    }
    let savedMacro = JSON.parse(localStorage.getItem('macroRow'));
    if ( savedMacro.protein !== "") {
        printMacros();
        $('.macroRow').show();
    }
}

init();




