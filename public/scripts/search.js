
const reportList = document.querySelector(".reports");
const searchForm = document.querySelector(".search-form")
var searchNanme = document.getElementById("search-name")




function searchFunction(){

    searchNanme = document.getElementById("search-name")

    let output = '';

    searchVal = validatasearch()
    
    nameValue = searchNanme.value
    const searchUrl = `api/search/${nameValue}`;
    // console.log(searchUrl)

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

        }
        else{
            reportList.innerHTML = "<h2 style='color:black'> No Report Found</h2>"
        }

    })
    
  
}

function delFunction(id){

    const deleteURl = `/api/report/${id}`;
    // console.log(deleteURl)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.response)

      }
    };
    xhttp.open("DELETE", deleteURl, false);
    xhttp.send();
    
    searchFunction()

}


