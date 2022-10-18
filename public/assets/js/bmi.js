function calculate(){
    
    let bmi;
    let result = document.getElementById("result");
    let height = parseInt(document.getElementById("height").value);
    let weight = parseInt(document.getElementById("weight").value);

 
    document.getElementById("weight-val").textContent = weight + " lb";
    document.getElementById("height-val").textContent = (Math.round((height * 0.08) * 100) / 100)+ " ft";

    bmi = (weight / (height * height) * 703).toFixed(1);
  
    result.textContent = bmi;



  
    if(bmi < 18.5){
        category = "Underweight 😒";
        result.style.color = "#ffc44d";
    }

  
    else if( bmi >= 18.5 && bmi <= 24.9 ){
        category = "Normal Weight 😍";
        result.style.color = "#0be881";
    }

  
    else if( bmi >= 25 && bmi <= 29.9 ){
        category = "Overweight 😮";
        result.style.color = "#ff884d";
    }

else{
  category = "Obese 😱";
  result.style.color = "#ff5e57";
}



document.getElementById("category").textContent = category;
}