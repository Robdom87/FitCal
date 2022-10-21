// import Chart from 'chart.js';
let setLabel = [];
let setData = [];
let freqData = [];
let analLabels = [];
let avgLineData = [];
let changingLineData = [];
let radioChoice;
let changingLineName = '';
let avgLineName = '';
let yTitleAnal = '';
let bgColorArr = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];
let bColorArr = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

$('.setButton').click(function () {
    $('.setContainer').show();
    $('.workoutFrequency').hide();
    $('.analysisContainer').hide();
    displayExercisesSet();
})

async function displayExercisesSet() {
    let url = `/api/chart/exercises`;
    let data = await helpers.getData(url);
    let checkboxes = $('.setCheckboxes');
    checkboxes.empty();
    for (let i = 0; i < data.length; i++) {
        let checkbox = `<input type="checkbox" class='exerciseCheckBox' id="${data[i].exercise_name}" name="exercises" value="${data[i].exercise_name}" />
                        <label for="${data[i].exercise_name}">${data[i].exercise_name}</label>`;
        checkboxes.append(checkbox);
    }
    listenCheckboxes();
    return;
};

async function listenCheckboxes() {
    let allCheckboxes = document.querySelectorAll('.exerciseCheckBox');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', async function () {
            if (this.checked) {
                try {
                    let exerciseName = $(this).val();
                    setLabel.push(exerciseName);
                    //find data for exercise
                    let url = `/api/chart/exercise?name=${exerciseName}`;
                    let data = await helpers.getData(url);
                    //add to displayed data
                    setData.push(data.set_count);
                    printSetChart();
                }
                catch {
                    console.log(err.message);
                }
            } else {
                //remove exercise from data in chart
                let exerciseName = $(this).val();
                let index = setLabel.indexOf(exerciseName);
                setLabel.splice(index, 1);
                setData.splice(index, 1);
                printSetChart();
            }
        })
    })
}

function printSetChart() {
    let setChartCont = $('.setChartContainer');
    setChartCont.empty();
    let setChartHtml = `<canvas id="setChart"></canvas>`;
    setChartCont.append(setChartHtml);
    const setElement = document.getElementById('setChart').getContext('2d');
    const SetChart = new Chart(setElement, {
        type: 'bar',
        data: {
            labels: setLabel,
            datasets: [{
                label: '# of Sets',
                data: setData,
                backgroundColor: bgColorArr,
                borderColor: bColorArr,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

$('.setDates').submit(async function (e) {
    e.preventDefault();
    freqData = [];
    let start = $('.startDate').val();
    let end = $('.endDate').val();
    //fetch request to get the count of times that the user has worked out in that time frame
    let url = `/api/chart/dates?start=${start}&end=${end}`;
    let data = await helpers.getData(url);
    let daysWorked = data.workout_count;
    freqData.push(daysWorked);
    let startDate = new Date(start);
    let endDate = new Date(end);
    let timePeriod = Math.round(((endDate - startDate) / (1000 * 60 * 60 * 24)), 0);
    let daysOff = timePeriod - daysWorked;
    freqData.push(daysOff);
    printFreqChart();
})

function printFreqChart() {
    let freqChartCont = $('.freqChartContainer');
    freqChartCont.empty();
    let freqChartHtml = `<canvas id="freqChart"></canvas>`;
    freqChartCont.append(freqChartHtml);
    const freqElement = document.getElementById('freqChart').getContext('2d');
    const freqChart = new Chart(freqElement, {
        type: 'doughnut',
        data: {
            labels: [
                'Working Out Days',
                'Off'
            ],
            datasets: [{
                label: 'Workout Frequency',
                data: freqData,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

};

$('.analysisBtn').click(function () {
    $('.setContainer').hide();
    $('.workoutFrequency').hide();
    $('.analysisContainer').show();
    displayExercisesAnal();
})

async function displayExercisesAnal() {
    let url = `/api/chart/exercises`;
    let data = await helpers.getData(url);
    let radioboxes = $('.analysisCheckboxes');
    radioboxes.empty();
    for (let i = 0; i < data.length; i++) {
        let radiobox = `<input type="radio" class='exerciseRadio' id="${data[i].exercise_name}" name="exercises" value="${data[i].exercise_name}" />
                        <label for="${data[i].exercise_name}">${data[i].exercise_name}</label>`;
        radioboxes.append(radiobox);
    }
    listenRadioBoxes();
    return;
};

async function listenRadioBoxes() {
    let allRadioBoxes = document.querySelectorAll('.exerciseRadio');
    allRadioBoxes.forEach(radiobox => {
        radiobox.addEventListener('click', async function () {
            if (this.checked) {
                radioChoice = $(this).val();
            }
        })
    })
}

$('.analysisForm').submit(async function (e) {
    e.preventDefault();
    analLabels = [];
    avgLineData = [];
    changingLineData = [];
    let start = $('.startDateA').val();
    let end = $('.endDateA').val();
    let type = $('#typeAnalysis').val();
    //fetch request to get the count of times that the user has worked out in that time frame
    if (type === 'max') {
        changingLineName = 'Max Weight Per Set';
        avgLineName = 'Average Weight';
        yTitleAnal = 'Weight(lbs)';
        let url = `/api/chart/weight?start=${start}&end=${end}&name=${radioChoice}`;
        weigtAnalysis(url);
    } else {
        changingLineName = 'Total Volume Per Set';
        avgLineName = 'Average Volume';
        yTitleAnal = 'Weight(lbs)xReps';
        let url = `/api/chart/volume?start=${start}&end=${end}&name=${radioChoice}`;
        volumeAnalysis(url);
    }
})

async function weigtAnalysis(url) {
    let data = await helpers.getData(url);
    let setAmount = data.length;
    let totalWeight = 0;
    let dateArr = [];
    for (let i = 0; i < setAmount; i++) {
        if (!dateArr.includes(data[i].date)) {
            dateArr.push(data[i].date);
        }
        totalWeight += data[i].weight;
    }
    analLabels = dateArr;
    let avgWeight = totalWeight / setAmount;
    for (let e = 0; e < dateArr.length; e++) {
        avgLineData.push(avgWeight);
        let maxWeight = 0;
        for (let y = 0; y < setAmount; y++) {
            if (dateArr[e] === data[y].date) {
                if (data[y].weight > maxWeight) {
                    maxWeight = data[y].weight;
                }
            }
        }
        changingLineData.push(maxWeight);
    }
    printAnalChart();
}

async function volumeAnalysis(url) {
    let data = await helpers.getData(url);
    let setAmount = data.length;
    let totalVolume = 0;
    let dateArr = [];
    for (let i = 0; i < setAmount; i++) {
        let concatDate = `${data[i].date} Set-${data[i].set_number}`;
        dateArr.push(concatDate);
        totalVolume += data[i].volume;
        changingLineData.push(data[i].volume)
    }
    analLabels = dateArr;
    let avgVolume = totalVolume / setAmount;
    for (let e = 0; e < setAmount; e++) {
        avgLineData.push(avgVolume);
    }
    printAnalChart();
}

function printAnalChart() {
    let analChartCont = $('.analysisChartContainer');
    analChartCont.empty();
    let analChartHtml = `<canvas id="analysisChart"></canvas>`;
    analChartCont.append(analChartHtml);
    const analElement = document.getElementById('analysisChart').getContext('2d');
    const analChart = new Chart(analElement, {
        type: 'scatter',
        data: {
            labels: analLabels,
            datasets: [{
                type: 'line',
                label: changingLineName,
                data: changingLineData,
                fill: false,
                borderColor: 'rgb(255, 99, 132)'
            }, {
                type: 'line',
                label: avgLineName,
                data: avgLineData,
                fill: false,
                borderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: yTitleAnal
                    }
                }
            }
        }
    });
}

$('.frequencyBtn').click(function () {
    $('.setContainer').hide();
    $('.workoutFrequency').show();
    $('.analysisContainer').hide();
})

let bgColorArrSample = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)'
];
let bColorArrSample = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)'
];

const setElementSample = document.getElementById('setChartSample').getContext('2d');
const SetChartSample = new Chart(setElementSample, {
    type: 'bar',
    data: {
        labels: ["Squat", "Bench Press"],
        datasets: [{
            label: '# of Sets',
            data: [20, 30],
            backgroundColor: bgColorArrSample,
            borderColor: bColorArrSample,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


const analElementSample = document.getElementById('analysisChartSample').getContext('2d');
const analChartSample = new Chart(analElementSample, {
    type: 'scatter',
    data: {
        labels: ['07/13/2022', '07/14/2022', '07/15/2022', '07/16/2022', '07/17/2022'],
        datasets: [{
            type: 'line',
            label: 'Total Volume',
            data: ['5400', '6000', '5000', '5200', '5000'],
            fill: false,
            borderColor: 'rgb(255, 99, 132)'
        }, {
            type: 'line',
            label: 'Avg Volume',
            data: ['5320', '5320', '5320', '5320', '5320'],
            fill: false,
            borderColor: 'rgb(54, 162, 235)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Bench Press'
                }
            }
        }
    }
});


function init(){
    displayExercisesAnal();
}

init();









