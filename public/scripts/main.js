
const reportsUrl = 'api/reports';
const reportUrl = 'api/report';


const reportList = document.querySelector(".reports");
const reportForm = document.querySelector(".reportForm");


let output = '';

const renderReports = (reports) => {
}

fetch(reportsUrl)
  .then(response => response.json())
  .then(data => {  
    data.data.forEach( report => {
        
        output += `
        <div class="report">
            <div class="pet-image">
                <img src="images/dog.png" alt="pet-img">
            </div>
            <div class="reportDetails">
                
                <a href="/api/report/${report.id}">${report.name}</a>
                <a href="/api/report/${report.id}">${report.animal}</a>
                <a href="/api/report/${report.id}" class="petDescription" >${report.description}</a>
            </div>
        </div>
        `;
    });
    reportList.innerHTML = output;
})
  

reportForm.addEventListener('submit', (e)=>)