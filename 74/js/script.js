let addBtn = document.getElementById("addBtn");

let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");

let movies = [];

function saveMovies(){
    localStorage.setItem("movies", JSON.stringify(movies));
}
function loadMovies() {
    let data = localStorage.getItem("movies");
    if (data) {
        movies = JSON.parse(data);
        renderMovies();
    }
}

function renderMovies(){
    let listArea = document.getElementById("listArea");
    listArea.innerHTML = "";

    movies.forEach(function(movie, index){
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const titleP = document.createElement("p");
    titleP.textContent = "タイトル：" + movie.title;

    const dateP = document.createElement("p");
    dateP.textContent = "鑑賞日：" + movie.date;

    const hr = document.createElement("hr");

    const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {
            movies.splice(index, 1); 
            saveMovies();            
            renderMovies();          
        });
    card.appendChild(titleP);
    card.appendChild(dateP);
    card.appendChild(deleteBtn);
    card.appendChild(hr);
    
    listArea.appendChild(card);
  });
}

addBtn.addEventListener("click", function(){
    console.log("ボタンが押されました");

    let title = titleInput.value;
    let date = dateInput.value;

    if (title === "" || date === "") {
        alert("タイトルと日付を入力してください");
        return;
    }


    let movie = {
        title: title,
        date: date,
        createdAt: new Date().toLocaleString()
    };

    movies.push(movie);

    console.log("現在の映画データ:", movies);

    titleInput.value = "";
    dateInput.value = "";
    
    renderMovies();

    saveMovies();
});

loadMovies();

