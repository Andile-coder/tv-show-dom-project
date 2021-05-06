//You can edit ALL of the code here
let allEpisodes = getAllEpisodes();
let allShows = getAllShows();
const selectOption = document.querySelector("#epiSelection");
const showSelection = document.querySelector("#showSelection");
const season1Elem = document.getElementById("season1");
let inputElem = document.getElementById("filterSearch");
let originalLength;
document
  .getElementById("homeBtn")
  .addEventListener("click", () => location.reload());
//searching
inputElem.addEventListener("change", () => {
  if (inputElem.value == "") {
    addMovies();
  } else {
    const filterSearch = allEpisodes.filter((elem) => {
      let elemName = elem.name.toLowerCase();
      let input = inputElem.value.toLowerCase();
      let elemSum = elem.summary.toLowerCase();
      if (elemName.includes(input) || elemSum.includes(input)) {
        return elem;
      }
    });
    clear();
    length(filterSearch);
    loopList(filterSearch);
  }
});
// popup modal
let valueOfDrp = document.getElementById("epiSelection");
valueOfDrp.addEventListener("change", function () {
  let array;
  allEpisodes.forEach((element) => {
    if (element.name === valueOfDrp.value) {
      array = element;
    }
  });
  document.querySelector("#header h3").textContent = valueOfDrp.value;
  document.querySelector(".picture img").src = array.image.medium;
  document.querySelector("#episodePopup").style.display = "block";
});
// remove popup
document.querySelector(".close-btn").addEventListener("click", function () {
  document.querySelector("#episodePopup").style.display = "none";
});
// choosing show
function addSelection(array) {
  for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${array[i].name}`);
    option.innerHTML = `${array[i].name}`;
    selectOption.appendChild(option);
  }
}
let showValue = document.getElementById("showSelection");

showValue.addEventListener("change", function () {
  if (document.getElementById("showListing").style.display != "none") {
    document.getElementById("showPop").style.display = "block";
    //create modal on home page for shows
    showValue.addEventListener("change", function () {
      let array;
      allShows.forEach((element) => {
        if (element.id == showValue.value) {
          array = element;
        }
      });
      document.querySelector("#showPop-img img").src = array.image.medium;
      document.querySelector("#showPop-sum p").innerHTML = array.summary;
      document.querySelector(
        "#showPop-rating p:first-child"
      ).innerHTML = `<b>Ratings</b>: ${array.rating}`;
      document.querySelector(
        "#showPop-rating p:nth-child(2)"
      ).innerHTML = `<b>Genres</b>: ${array.genres}`;
      document.querySelector(
        "#showPop-rating p:nth-child(3)"
      ).innerHTML = `<b>Runtime</b>: ${array.runtime}`;
    });
    document.querySelector("#close").addEventListener("click", function () {
      document.querySelector("#showPop").style.display = "none";
    });
  } else {
    // show episodes of show when not on homepAGE
    allShows.forEach((elem) => {
      if (elem.id == showValue.value) {
        fetch(`https://api.tvmaze.com/shows/${elem.id}/episodes`)
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              return response.json();
            } else {
              throw new Error(
                `encountered something unexpected: ${response.status} ${response.statusText}`
              );
            }
          })
          .then((response) => {
            clear();
            erase();
            allEpisodes = response;
            loopList(response);
          })
          .catch((error) => console.log(error));
      }
    });
  }
});

function addSeriesSelection(array) {
  for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", array[i].id);
    option.innerHTML = `${array[i].name}`;
    showSelection.appendChild(option);
  }
}
function length(array) {
  let plength = document.querySelector("#length p");
  plength.innerHTML = `Display ${array.length}/i am a bug`;
}
function erase() {
  while (selectOption.firstChild) {
    selectOption.removeChild(selectOption.firstChild);
  }
}
function clear() {
  while (season1Elem.firstChild) {
    season1Elem.removeChild(season1Elem.firstChild);
  }
}

function fetchEpisodes(id) {
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(
          `encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((response) => {
      loopList(response);
    })
    .catch((error) => console.log(error));
}
function addMovies() {
  addSeriesSelection(allShows);
  displayAllShows();
}

function loopList(array) {
  for (let i = 0; i < array.length; i++) {
    let articleElem = document.createElement("article");
    articleElem.className = "seasonEpisode";
    let divElem = document.createElement("div");
    divElem.id = `${array[i].name}`;
    divElem.className = "episode";
    let headerElem = document.createElement("header");
    let h3Elem = document.createElement("h3");
    h3Elem.textContent = `${array[i].name} -S0${array[i].season}E${array[i].number}`;
    let figureElem = document.createElement("figure");
    let figcaptionElem = document.createElement("figcaption");
    let spanElem = document.createElement("span");
    spanElem.innerHTML = array[i].summary;
    let imgElem = document.createElement("img");
    imgElem.src = array[i].image.medium;
    imgElem.className = "image";
    season1Elem
      .appendChild(articleElem)
      .appendChild(divElem)
      .appendChild(headerElem)
      .appendChild(h3Elem);
    divElem.appendChild(figureElem).appendChild(imgElem);
    divElem.appendChild(figcaptionElem).appendChild(spanElem);
  }
  originalLength = array.length;
  length(array);
  addSelection(array);
}
function displayAllShows() {
  for (let i = 0; i < allShows.length; i++) {
    if (allShows[i].image == null) {
    } else {
      let articleElem = document.createElement("article");
      let divMain = document.createElement("div");
      divMain.id = allShows[i].id;
      divMain.className = "show";
      let divImg = document.createElement("div");
      let img = document.createElement("img");
      img.src = allShows[i].image.medium;
      divImg.appendChild(img);
      let divSumarry = document.createElement("div");
      let pElem = document.createElement("p");
      divSumarry.className = "showSum";
      pElem.innerHTML = allShows[i].summary;
      divSumarry.appendChild(pElem);
      let divRatings = document.createElement("div");
      let prate = document.createElement("p");
      prate.innerHTML = `<b>Ratings</b>: ${allShows[i].rating.average}`;
      let pGenres = document.createElement("p");
      pGenres.innerHTML = `<b>Generes</b>: ${allShows[i].genres}`;
      let pStatus = document.createElement("p");
      pStatus.innerHTML = `<b>Status</b>: ${allShows[i].status}`;
      let pRunTime = document.createElement("p");
      pRunTime.innerHTML = `<b>Runtime</b>: ${allShows[i].runtime}`;
      divRatings.appendChild(prate);
      divRatings.appendChild(pGenres);
      divRatings.appendChild(pStatus);
      divRatings.appendChild(pRunTime);
      articleElem.appendChild(divMain);
      divMain.appendChild(divImg);
      divMain.appendChild(divSumarry);
      divMain.appendChild(divRatings);
      document.getElementById("showListing").appendChild(divMain);
      divMain.addEventListener("click", () => {
        document.getElementById("showListing").style.display = "none";
        fetchEpisodes(allShows[i].id);
      });
    }
  }
}
window.onload = addMovies;
