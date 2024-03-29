
const reportUrl = '/api/report';

const reportForm = document.querySelector(".reportForm");
const petName = document.getElementById("name");
const animal = document.getElementById("animal");
const description = document.getElementById("description");
const road = document.getElementById("road");
const area = document.getElementById("area");
const city = document.getElementById("city");



let output = '';
reportForm.addEventListener('submit', (e)=>{

    e.preventDefault();

    let checkForm  = validataInputs();
    if(checkForm){
        var data = {
            name: petName.value,
            animal: animal.value,
            description: description.value,
            road: road.value,
            area: area.value,
            city: city.value
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
        xhttp.open("POST", reportUrl);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataJson);
         
    }
   
})