function refreshData(e) {
  const movieName = e.target.value;
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=7f9a3b82`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //if input field is empty
      if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg"></h3>`;
      }
      //if movie exist in database
      else if (data.Response == "True") {
        result.innerHTML = `
          <div class="info">
            <div class="div1">
              <img src="${data.Poster}" class="poster" />
            </div>
            <div class="div2">
              <h2>${data.Title}</h2>
              <div class="rating">
                <img class="star" src="star-icon.png">
                <h4>${data.imdbRating}/10</h4>
              </div>
              <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
              </div>
              <div class="genre">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
              </div>
              <div class="stream">
                <a href="https://api.123movie.cc/imdb.php?imdb=${
                  data.imdbID
                }&server=vcu" target="_blank">Stream Now</a>
              </div>
            </div>
          </div>
          <div class="div3">
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
          </div>
        `;
      }
      //if movie doesn't exist in database
      else {
        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
      }
    })
    //if error occurs
    .catch(() => {
      result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
    });
}

const input = document.getElementById("input");

input.addEventListener("change", refreshData);
