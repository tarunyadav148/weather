function getUrl(city){
    let url = `https://spott.p.rapidapi.com/places/autocomplete?type=CITY&q=${city}&limit=5`;
    return url
}

var spotSearchBox = null;
var list = document.createElement("ul");
list.style.listStyleType = "none";
list.style.backgroundColor = "white";
list.style.color = "black";

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function listRender(List){

    removeAllChildNodes(list);


    for(let item of List){
        let text = item['name'] + "," + item['country']['name'];
        let listitem = document.createElement("li");

        listitem.style.border = "1px solid #ccc";
        listitem.style.fontSize = "20px"
        
        listitem.addEventListener("mouseover",(e)=>{
            e.preventDefault();
            listitem.style.cursor = "pointer";
        })

        listitem.addEventListener("click",()=>{
            spotSearchBox.value = listitem.textContent;
            searchEvent(spotSearchBox.id)
            removeAllChildNodes(list);
            spotSearchBox.value = "";
        });


        let node = document.createTextNode(text)
        listitem.appendChild(node);
        list.appendChild(listitem);
    }
}

function autocomplete(idSearch,idspotSearchBox){

    const searchDiv =  document.getElementById(idSearch);
    spotSearchBox = document.getElementById(idspotSearchBox);

    searchDiv.appendChild(list);
    list.style.padding = "0";
    list.style.margin = "0";

    list.style.width =  searchDiv.style.width;


    spotSearchBox.addEventListener("keydown",()=>{
        if(spotSearchBox.value.length == 1)
            removeAllChildNodes(list);
    })

    spotSearchBox.addEventListener("input",()=>{
            removeAllChildNodes(list);
    })
    

    spotSearchBox.addEventListener("keypress",(e)=>{
        if(spotSearchBox.value.length == 1)
            return

        fetch(getUrl(spotSearchBox.value), {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spott.p.rapidapi.com",
                "x-rapidapi-key": SPOTT_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => listRender(data))
        .catch(err => {
            console.error(err);
        });
    })
    
}

