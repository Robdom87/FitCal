// const helpers = require('../../../utils/helpers');
let quick = 0;

//validation
let textInputVal = $('.text');
//check for all text input is either text, backspace or space
textInputVal.onkeydown = function (e) {
    if (!((e.keyCode > 64 && e.keyCode < 91)
        || e.keyCode == 8 || e.keyCode == 32 || e.keyCode == 46)) {
        return false;
    }
}

//function to show new workout modal
$(".newWorkoutBtn").click(function () {
    $('.createWorkout').show();
    $(".searchExercisesContainer").show();
    $('.searchResultContainer').hide();
    $(".setupSection").removeClass('is-flex');
    $(".setupSection").addClass('is-hidden');
    $('.finishBtn').hide();
});

$(".chooseProgBtn").click(function () {
    $('.chooseProgContainer').show();
    showProgOptions();
});

$(".selectProgBtn").click(function () {
    console.log('pressed');
    displaySetupWorkout();
});

//button used to submit criteria to API
$(".searchBtn").click(function () {
    exerciseSearch();
    $('.searchResultContainer').show();
});

//toggle saved exercise on and off
$('.savedExercisesBtn').click(function () {
    $(".savedExercisesContainer").toggle();
    displayWorkout();
})

//button to show more info on exercises
$(".exercise-selection-body").on('click', '.moreBtn', function () {
    $(this).next().toggle();
});

//button to open up setup section
$(".setupBtn").click(function () {
    let cWorkouts = localStorage.getItem("workouts");
    if (cWorkouts) {
        $('.savedExercisesContainer').hide();
        $('.searchResultContainer').hide();
        $(".searchExercisesContainer").hide();
        $(".setupSection").removeClass('is-hidden');
        $(".setupSection").addClass('is-flex');
        $('.finishBtn').show();
        startSetup();
    } else {
        alert('Must have workouts saved to proceed to setup.');
    }
})

//Quick Search button function
$('.searchToggle').click(function () {
    $(".quick").toggle();
    $("#threeCriterias").toggle();
    if (quick === 0) {
        quick = 1;
    } else {
        quick = 0;
    }
})

//button to save program into local storage
$(".finishBtn").submit((event) => {
    $('.sessionForm').show();
    finishSetup();
    event.preventDefault();
});

//button for remove button within saved exercises section
$(".remove-button").click(function () {
    localStorage.setItem("workouts", '');
    $('.saved-exercise-body').empty();
    $(".setupSection").hide();
});

//button to close out buttons in exercise modals
$('.delete, .cancel-button').click(function () {
    $(".modal").hide();
    $('.finishBtn').hide();
    $(".setupSection").removeClass('is-flex');
    $(".setupSection").addClass('is-hidden');
});

//button to save all inputted info from session to database
$(".save_db").submit(async (e) => {
    saveToDB();
    e.preventDefault();
});

//called functionalities
//searches and displays searches to page
async function exerciseSearch() {
    $('.exercise-selection-body').empty();
    $('.modal').show();
    let requestUrl = '';
    if (quick === 0) {
        //check the user inputs fo intensity, type, and muscle
        let intensityValue = $("#intensityOptions").val();
        let typeValue = $("#typeOptions").val();
        let muscleValue = $("#muscleOptions").val();

        //variables used to hold & if needed
        let intensityAnd = '';
        let typeAnd = '';
        //add section to URL depending on user input
        if (muscleValue.length) {
            requestUrl = 'muscle=' + muscleValue;
            intensityAnd = '&';
            typeAnd = '&';
        }
        if (intensityValue.length) {
            requestUrl = requestUrl + intensityAnd + 'difficulty=' + intensityValue;
            typeAnd = '&';
        }
        if (typeValue.length) {
            requestUrl = requestUrl + typeAnd + 'type=' + typeValue;
        }

    } else {
        let nameValue = $('.search-bar').val();
        requestUrl = `name=${nameValue}`;
    }

    //send API request using the user input 
    let data = await helpers.getData(`/api/exercise/${requestUrl}`);

    //if data returned is empty error message is displayed
    if (data.length === 0) {
        $('.exercise-selection-body').text("No Results Found")
        return
    }
    //add data returned as input selectors within the modal
    for (let i = 0; i < data.length; i++) {
        //create object for each workout returned
        let name = data[i].name
        let equipment = data[i].equipment
        let instructions = data[i].instructions

        //add workout to 
        let results = $(`<input type="radio" name="result" 
                data-name="${name}" data-equipment="${equipment}" data-instructions="${instructions}"/>
                <span>${name}</span>
                    <button class="moreBtn">
                      More
                  </button>
                  <div class='moreInfo'>  
                      <p><u><b><span>Equipment:</span></b></u>&nbsp;${equipment}</p>
                      <p><u><b><span>Instructions:</span></b></u></p>
                      <p>${instructions}</p>
                      </div>`);

        //listens to change in any of the seledtable workout and executes if so
        results.on("change", saveworkout)
        $('.exercise-selection-body').append(results)
    }
}

async function showProgOptions() {
    try {
        let url = '/api/program/';
        let response = await helpers.getData(url);
        $('.progOptionsSelect').empty();
        let options = '';
        for (let i = 0; i < response.length; i++) {
            options += `<option value="${response[i].id}">${response[i].program_name}</option>`;
        }
        $('.progOptionsSelect').append(options);
    }
    catch {
        console.log('failure');
    }
}

//function used to save selected workouts into local storage
function saveworkout() {
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }

    //because this function is called as its listening on an object, it can call the dataset information
    //for this specific select, and put it in an object
    let workout = {
        name: this.dataset.name,
        equipment: this.dataset.equipment,
        instructions: this.dataset.instructions,
    }
    workouts.push(workout);
    //however it is only saved if the save button is clicked
    $(".exerciseSaveBtn").on("click", function () {
        localStorage.setItem("workouts", JSON.stringify(workouts));
        $('.saved-exercise-body').show();
        $('.savedExercisesContainer').show();
        displayWorkout();
    })
}

//workouts pulled from local storage and displayed in saved exercise section
function displayWorkout() {
    $('.saved-exercise-body').empty();
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    for (let i = 0; i < workouts.length; i++) {
        let name = workouts[i].name
        let results = $(`<div><h5>${name}</h5></div>`);
        $('.saved-exercise-body').append(results);
    }
}

//function to display dynamic input request for workout setup information
function startSetup() {
    $('.setupSection').empty();
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    let programName = `<input id="workoutName" type="text" placeholder="Workout Name" required>`;
    $('.setupSection').append(programName);
    for (let i = 0; i < workouts.length; i++) {
        let name = workouts[i].name;
        
        let results = $(`<div class='setupInputs'><h5 class='exerciseName'>${name}</h5></div>
        <span>
        <label for="${i}Set">Set Amount</label>
        <input id="${i}Set" type="number" min="0" placeholder="4" required>
        </span>
        <span>
        
        <label for="${i}Reps">Goal Reps&nbsp;</label>
        <input id="${i}Reps" type="number" min="0" placeholder="12" required>
        </span>
        <span>
        <label for="${i}Weight">Weight Goal</label>
        <input placeholder="lbs" id="${i}Weight" type="number" min="0" required>
        </span>
        <span>
        <label for="${i}Type">Weight Type</label>
        <select id="${i}Type" name="typeOSU" required>
                <option value="Barbell">Barbell</option>
                <option value="Dumbbell">Dumbbell</option>
                <option value="Machine">Machine</option>
                <option value="Cable">Cable</option>
                <option value="Body Weight">Body Weight</option>
        </select>
        </span>
        </br>`);
        $('.setupSection').append(results);
    }
}

//function to save new workout to local stroage and display
async function finishSetup() {

    let exerciseInfo = JSON.parse(localStorage.getItem("workouts"));
    let programName = $('#workoutName').val();
    let programObject = {
        program_name: programName
    };
    //fetch request to set program name and get id
    let postUrl = `/api/program/`;
    let response = await helpers.postData(postUrl, programObject);
    let programId = response.id;
    let programWkts = [];

    //save all user inputs into an array of objects
    for (let i = 0; i < exerciseInfo.length; i++) {
        let programWktsObject = {
            program_id: programId,
            exercise_name: exerciseInfo[i].name,
            set_amount: $(`#${i}Set`).val(),
            rep_amount: $(`#${i}Reps`).val(),
            weight: $(`#${i}Weight`).val(),
            weight_type: $(`#${i}Type`).val(),
            user_id: ""
        }
        programWkts.push(programWktsObject);
    }
    //save array of objects into database with fetch request
    let programUrl = `/api/program/wkts/`;
    let wktResponse = await helpers.postData(programUrl, programWkts);
    console.log(wktResponse);
    $('.modal').hide();
}

//display new program created to main exercise section
async function displaySetupWorkout() {
    console.log('inFunction');
    $('.exerciseName').empty();
    $('.fExerciseLog').empty();
    $('.exerciseTable').empty();
    $('.sessionForm').show();
    let logBody = $('.exerciseLog');
    logBody.empty();

    let programId = $('.progOptionsSelect').val();
    console.log(programId);
    let url = `/api/program/id/${programId}`;
    let response = await helpers.getData(url);
    console.log(response);

    logBody.append($(`<div><h3 class='program'>${response.program_name}</h3></div>`));
    //i starts at 1, remember that when pulling information
    for (let i = 0; i < response.programWorkouts.length; i++) {
        logBody.append($(`<br><h4 class='exerciseName' id="workout${i}">${response.programWorkouts[i].exercise_name}</h4>`));
        let workoutTable = $('<table class="exerciseTable">');
        let tableHeader = $(`<tr>
        <th>Set</th>
        <th>Reps</th>
        <th>Weight</th>
        <th>Type</th>
        <th>Comments</th>
    </tr>`);
        workoutTable.append(tableHeader);
        for (let e = 0; e < response.programWorkouts[i].set_amount; e++) {
            //how to make it be selected
            let tableRow = $(`<tr>
            <td class='set${i} set${i}${e}' id='set${i}${e}'>${e + 1}</td>
            <td><input id='reps${i}${e}' type="number" min="0" size="6" placeholder="${response.programWorkouts[i].rep_amount}" required></td>
            <td><input id='weight${i}${e}' type="number" min="0" size="6" placeholder="${response.programWorkouts[i].weight}" required></td>
            <td>
                <select id='type${i}${e}' class='text' name="typeOSU" required>
                    <option value="${response.programWorkouts[i].weight_type}">${response.programWorkouts[i].weight_type}</option>
                    <option value="Barbell">Barbell</option>
                    <option value="Dumbbell">Dumbbell</option>
                    <option value="Machine">Machine</option>
                    <option value="Cable">Cable</option>
                    <option value="Body Weight">Body Weight</option>
                </select>
            </td>
            <td><input id='comments${i}${e}' class='text' size="10" type="text"></td>
        </tr>`)
            //<td><button class="removeBtn delete">X</button></td>
            workoutTable.append(tableRow);
        }
        logBody.append(workoutTable);
    }

}

//function to save all inputted information to database
async function saveToDB() {
    try {
        //push session date to DB
        let chosenDate = $(".date").val();
        let sessionObject = {
            date: chosenDate
        }
        let postUrl = `/api/session/`;
        let response = await helpers.postData(postUrl, sessionObject);
        let id = response.id;
        let sessionWktArray = [];


        //pull all inputted information from the workout to an array of objects
        //per workout/table
        for (let i = 0; i < $(".exerciseTable").length + 1; i++) {
            //e needs to change for each i
            //per table rows
            for (let e = 0; e < $(`.set${i}`).length; e++) {
                let exercise_name = document.getElementById(`workout${i}`);
                let set_number = document.getElementById(`set${i}${e}`);
                let rep_amount = $(`#reps${i}${e}`).val();
                let weight = $(`#weight${i}${e}`).val();
                let weight_type = $(`#type${i}${e}`).val();
                let comments = $(`#comments${i}${e}`).val();

                let sessionWkt = {
                    session_id: id,
                    exercise_name: exercise_name.textContent,
                    set_number: set_number.textContent,
                    rep_amount: rep_amount,
                    weight: weight,
                    weight_type: weight_type,
                    comments: comments,
                    user_id: ""
                }
                sessionWktArray.push(sessionWkt);
            }
        }
        console.log(sessionWktArray);
        //push all workouts to data base
        let workoutUrl = `/api/session/wkts/`;
        let another = await helpers.postData(workoutUrl, sessionWktArray);
        // need to call for some reason for api to work
        if (another) {
            alert("Workout Saved Succesfully");
        }

    }
    catch (err) {
        console.log(err);
    }
}

//init function
function init() {
    let programCheck = JSON.parse(localStorage.getItem("setupWorkout"));
    if (programCheck) {
        $('.sessionForm').show();
        // displaySetupWorkout();
    }
}

init();

