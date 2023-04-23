
fetch("https://jsonplaceholder.typicode.com/photos")
        .then((response) => response.json())
        .then((msg) => computeList(msg));

      function computeList(movies){
        let carddomList = ""; // initialize the variable to an empty string
        movies.forEach((movie) => {
          carddomList += `
            <div class="card m-2">
              <div class="card-header">
                ${movie.title}
              </div>
              <div class="card-body">
                <img src="${movie.thumbnailUrl}" alt="poster"/>
              </div>
            </div>
          `;
        });
        document.getElementById("list-section").innerHTML = carddomList;
      }