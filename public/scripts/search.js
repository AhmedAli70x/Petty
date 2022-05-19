

const reportList = document.querySelector(".reports");
const searchForm = document.querySelector(".search-form")
const searchNanme = document.getElementById("search-name")




searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let output = '';
    nameValue = searchNanme.value
    const searchUrl = `api/search/${nameValue}`;
    searchVal = validatasearch()
 
    if(searchVal == true){}

    fetch(searchUrl)
    .then(response => 
        response.json()       
    )
    .then(data => {if(data.data.length > 0){
                data.data.forEach( report => {
                    
                    output += `
                    <div class="report">
                        <div class="reportDetails">
                        <a href="/report/${report.id}"  class="pet-name"> ${report.name}</a>
                        <a href="/report/${report.id}" class="pet-type"> ${report.animal}</a>
                        <a href="/report/${report.id}" class="pet-description" >${report.description}</a>
                        <a href="/report/${report.id}" class="pet-p" >${report.road}</a>
                        <a href="/report/${report.id}" class="pet-description" >${report.city}</a>
                        </div>
                       
                    </div>
                    `;
                });
            reportList.innerHTML = output;

        }
        else{
            reportList.innerHTML = "<h2 style='color:black'> No Report Found</h2>"
        }

    })
    
  
})
