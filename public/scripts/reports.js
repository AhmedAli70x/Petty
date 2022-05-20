
function update_reports(){
    const reportsUrl = 'api/reports';
    const reportList = document.querySelector(".reports");
    let output = '';
    
    fetch(reportsUrl)
      .then(response => response.json())
      .then(data => {  
        data.data.forEach( report => {
            
            output += `
            <div class="report">
                <div class="reportDetails">
                    <a href="/report/${report.id}" class="pet-type"> ${report.animal}</a>
                    <a href="/report/${report.id}" class="pet-description" >${report.description}</a>
                    <a href="/report/${report.id}" class="per-road" >${report.road}</a>
             
                </div>
                <div class="report-edit">
                     <a href="/report/${report.id}" class="edit" >About</a>
                    <button id ="${report.id}" onclick="delFunction(${report.id});" class="delete"> Delete</button>
                </div>
    
            </div>
            `;
        });
        reportList.innerHTML = output;
    })
}
update_reports()

const reportUrl = '/api/report';
const reportForm = document.querySelector(".reportForm");
const petName = document.getElementById("name");
const animal = document.getElementById("animal");
const description = document.getElementById("description");
const road = document.getElementById("road");
const area = document.getElementById("area");
const city = document.getElementById("city");
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
            update_reports()
            
        }else{
            document.getElementById('success').innerHTML = xhttp.response.innerText
        }
      };
        xhttp.open("POST", reportUrl);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataJson);
         
    }
   
})




function delFunction(id){
    const deleteURl = `/api/report/${id}`;
    // console.log(deleteURl)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.response)
          document.getElementById('success').textContent = "Report Deleted sucessfully."

      }
    };
    xhttp.open("DELETE", deleteURl, false);
    xhttp.send();
    
      
    update_reports()
}

