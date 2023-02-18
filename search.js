// Set this to the width of one star.
var starWidth = 40;

$.fn.stars = function () {
  return $(this).each(function () {
    $(this).html(
      $("<span />").width(
        Math.max(0, Math.min(5, parseFloat($(this).html()))) * starWidth
      )
    );
  });
};

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
        //Calculate the rating score
        const ratingScore = (data.imdbRating / 10) * 5;
        //Update the HTML with the calculated rating score
        result.innerHTML = `
          <div class="info">
            <div class="div1">
              <img src="${data.Poster}" class="poster" />
            </div>
            <div class="div2">
              <h2>${data.Title}</h2>
              <div class="rating">
                <p><span class="stars">${ratingScore}</span></p>
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
        //Call the stars function to display the rating stars
        $(".stars").stars();
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
