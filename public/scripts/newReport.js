
const reportUrl = '/api/report';
const reportForm = document.querySelector(".reportForm");
const petName = document.getElementById("name");
const animal = document.getElementById("animal");
const description = document.getElementById("description");
const petLocation = document.getElementById("location");

function setError (element, message){
    const col75 = element.parentElement;
    const errorDisplay = col75.querySelector('.error')
    errorDisplay.innerText = message;
    col75.classList.add('error')
    col75.classList.remove('success')
}

function setSuccess(element) {
    const col75 = element.parentElement;
    
    const errorDisplay = col75.querySelector('.error')
    errorDisplay.innerText = '';
    col75.classList.add('success')
    col75.classList.remove('error')
}

function validataInputs () {

    const nameValue = petName.value.trim();
    const animalValue = animal.value.trim();
    const descriptionValue = description.value.trim();
    const locationValue = petLocation.value.trim();

    let nameCheck = false;
    let animalCheck = false;
    let descriptionCheck = false;
    let locationCheck = false;

    if(nameValue === ''){
        setError(petName, 'Name is required')
        nameCheck =  false;
    } else{
        setSuccess(petName) 
        nameCheck = true  
    }
    if(animalValue === ''){
        setError(animal, 'Animal is required')
        animalCheck = false;
    } else{
        setSuccess(animal) 
        animalCheck = true     
    }

    if(descriptionValue.length < 8){
        setError(description, 'Min characters is 8')
        descriptionCheck =  false;
    } else{
        setSuccess(description)
        descriptionCheck = true
        
    }
    if(locationValue .length < 5){
        setError(petLocation, 'Min characters is 5')
        locationCheck =  false;
    } else{
        setSuccess(petLocation)
        locationCheck = true
    }

    if (nameCheck === true && animalCheck === true && descriptionCheck === true && locationCheck === true){
        console.log("true")
        return true
    }else{
        console.log("false")

        return false
    }

}


let output = '';
reportForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let checkForm  = validataInputs();
    if(checkForm){
        var data = {
            name: petName.value,
            animal: animal.value,
            description: description.value,
            location: petLocation.value
        }
        let dataJson = JSON.stringify(data)
    
        console.log(dataJson)
    
        var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Form submitted')
            console.log(xhttp.response)
            document.getElementById('success').innerHTML = "Report added sucessfully"
        }else{
            document.getElementById('success').innerHTML = xhttp.response.innerText
        }
      };
        xhttp.open("POST", reportUrl, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataJson);
         
    }
   
})