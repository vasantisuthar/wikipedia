const button = document.querySelector('.searchBtn');
const alert = document.querySelector('.warning');
const input = document.querySelector('.searchArea');
const divContainer = document.querySelector('.result');

button.addEventListener('click', function(e){
    e.preventDefault();

    // check fields
    if(input.value === ''){
        alert.classList.add('show','alert', 'alert-danger');
        alert.innerHTML = "Please enter value to search";
        setTimeout(function(){
            alert.innerHTML = "";
            alert.classList.remove('show','alert','alert-danger');
        }, 2000);
    } else {
        divContainer.innerText = "";
        const ajax = new XMLHttpRequest();
         var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${input.value}&origin=*&format=json`;    

        ajax.open('GET', url, true);

        ajax.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            let data = JSON.parse(this.response);
            console.log(data);
            showResults(data);
            if(data.query.search.length == 0){
                window.alert("There are no results for your search");
            }
        }
    }
     ajax.send();
    }  
});

function showResults(data){
    
    for(var i in data.query.search){
        
        // create div
        const div = document.createElement('div');
        div.innerHTML = `  <div class = "container">
        <a href="https://en.wikipedia.org/wiki/${data.query.search[i].title}">
        <h1 class = "title"> ${data.query.search[i].title}</h1> 
        </a> 
            <p class ="content"> ${data.query.search[i].snippet}...</p>
            <a href="https://en.wikipedia.org/wiki/${data.query.search[i].title}">read more</a>
        </div>`
         divContainer.appendChild(div);
    }
}




