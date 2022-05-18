
  function setError(element, message){
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

function validatasearch() {

    const searchValue = searchNanme.value.trim();
    console.log(searchValue)
    if(searchValue === ''){
        setError(searchNanme, 'Field required!')
        nameCheck =  false;
    } else{
        setSuccess(searchNanme) 
        nameCheck = true  
    }

}

 function validataInputs() {
 
    const nameValue = petName.value.trim();
    const animalValue = animal.value.trim();
    const descriptionValue = description.value.trim();
    const locationValue = petLocation.value.trim();

    nameCheck = false;
    animalCheck = false;
    descriptionCheck = false;
    locationCheck = false;

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

