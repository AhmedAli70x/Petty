

const reportUrl = 'api/report';

const reportForm = document.querySelector(".reportForm");
const nameValue = document.getElementById("name");
const animalValue = document.getElementById("animal");
const descriptionValue = document.getElementById("description");
const locationValue = document.getElementById("location");

let output = '';

reportForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    var data = {
        name: nameValue.value,
        animal: animalValue.value,
        description: descriptionValue.value,
        location: locationValue.value
    }
    let dataJson = JSON.stringify(data)
    console.log('form submitted')
    console.log(dataJson)

    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.response)
        
    }
  };

    xhttp.open("POST", reportUrl, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataJson);
    document.getElementById('success').innerHTML = "Report added sucessfully"
})