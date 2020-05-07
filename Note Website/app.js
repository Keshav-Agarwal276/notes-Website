console.log("Notes app")
showNotes();

// If a user clicks on add note update the localstorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html += `    
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index+1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                    </div>
                </div>`;

    });

    let notesElm= document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML  =html;
    }else{
        notesElm.innerHTML = `Nothin to show! Add a note`
    }
}

function deleteNote(index){
    // console.log("deleting the note")
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})



