

const reportsUrl = 'api/reports';


const reportList = document.querySelector(".reports");
let output = '';

const renderReports = (reports) => {
}

fetch(reportsUrl)
  .then(response => response.json())
  .then(data => {  
    data.data.forEach( report => {
        
        output += `
        <div class="report">
            <div class="reportDetails">
              
                <a href="/report/${report.id}">${report.name}</a>
                <a href="/report/${report.id}">${report.animal}</a>
                <a href="/report/${report.id}" class="petDescription" >${report.description}</a>
            </div>
            <div class="edit">
                <a href="/report/${report.id}" class="btn">Edit</a>
            </div>
        </div>
        `;
    });
    reportList.innerHTML = output;
})
  
