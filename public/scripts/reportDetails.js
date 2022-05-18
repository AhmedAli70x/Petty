

curURL = window.location.href
console.log(curURL)
var id = curURL.substring(curURL.lastIndexOf('/') + 1);
const updateUrl = `/api/report/${id}`;

const updateForm = document.querySelector(".updateForm");

const petName = document.getElementById("name");
const animal = document.getElementById("animal");
const description = document.getElementById("description");
const petLocation = document.getElementById("location");




fetch(updateUrl)
  .then(response => response.json())
  .then(data => {  
        report = data.data[0];
        document.getElementById("name").value = report.name;
        document.getElementById("animal").value = report.animal;
        document.getElementById("description").value = report.description;
        document.getElementById("location").value = report.location;
   
})


updateForm.addEventListener('submit', (e)=>{
  
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
      console.log('Form submitted')
      console.log(dataJson)

      var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.response)
          document.getElementById('success').textContent = "Report updated sucessfully. Redirecting to reports page"

          setTimeout(() => {  window.location = "/reports" }, 3000);
      }else{
        document.getElementById('success').innerHTML = xhttp.response.innerText

      }};
    
      xhttp.open("PUT", updateUrl, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(dataJson);
  }
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

