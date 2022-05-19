
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
    const roadValue = road.value.trim();
    const areaValue = area.value.trim();
    const cityValue = city.value.trim();

    nameCheck = false;
    animalCheck = false;
    descriptionCheck = false;
    roadCheck = false;
    areaCheck = false;
    cityCheck = false;

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
    if(roadValue.length < 5){
        setError(road, 'Min characters is 5')
        roadCheck =  false;
    } else{
        setSuccess(road)
        roadCheck = true
    }

    if(areaValue.length == ''){
        setError(area, 'Area is required')
        areaCheck =  false;
    } else{
        setSuccess(area)
        areaCheck = true
    }

    if(cityValue.length < 5){
        setError(city, 'Min characters is 5')
        cityCheck =  false;
    } else{
        setSuccess(city)
        cityCheck = true
    }


    if (nameCheck === true && animalCheck === true && descriptionCheck === true && 
        roadCheck === true  && areaCheck === true  && cityCheck === true){
        console.log("true")
        return true
    }else{
        console.log("false")

        return false
    }

}

