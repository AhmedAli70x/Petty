




curURL = window.location.href
var id = curURL.substring(curURL.lastIndexOf('/') + 1);

const updateUrl = `/api/report/${id}`;

fetch(updateUrl)
  .then(response => response.json())
  .then(data => {  
        report = data.data[0];
        document.getElementById("name").value = report.name;
        document.getElementById("animal").value = report.animal;
        document.getElementById("description").value = report.description;
        document.getElementById("location").value = report.location;
   
})



const reportForm = document.querySelector(".updateForm");

reportForm.addEventListener('submit', (e)=>{
  console.log(updateUrl)
  const nameValue = document.getElementById("name");
  const animalValue = document.getElementById("animal");
  const descriptionValue = document.getElementById("description");
  const locationValue = document.getElementById("location");
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
        document.getElementById('success').textContent = "Report updated sucessfully. Redirecting to reports page"

        setTimeout(() => {  window.location = "/reports" }, 3000);
    }
  };
    xhttp.open("PUT", updateUrl, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataJson);
})


const deletBtn = document.querySelector(".deleteBtn");

deletBtn.addEventListener('click', (e)=>{
  console.log(updateUrl)

    e.preventDefault();


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.response)
          document.getElementById('success').textContent = "Report Deleted sucessfully. Redirecting to Home page"
          setTimeout(() => {  window.location = "/" }, 3000);
      }
    };
    xhttp.open("DELETE", updateUrl, true);
    // xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
})

