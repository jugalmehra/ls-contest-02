
let cafes = [],
  places = [],
  cafePlaces = [];



GetCafes = () => {
  const result = fetch(
    "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
  )
    .then(res => res.json())
    .then(data => {
      cafes = data.cafes;
      GetPlaces();
    })
    .catch(err => console.log(err));
};


GetPlaces = () => {
  const result = fetch(
    "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json"
  )
    .then(res => res.json())
    .then(data => {
      places = data.places;
      CafeInPlaces();
      SetContent(cafePlaces);
    })
    .catch(err => console.log(err));
};


CafeInPlaces = () => {
  let finalResults = [];
  let results = cafes;
  results.forEach(cafe => {
    var place = places.find(item => item.id === cafe.location_id);
    var cafePlace = JSON.parse(JSON.stringify(place));
    cafePlace.name = cafe.name;
    finalResults.push(cafePlace);
  });
  finalResults.forEach(item => {
    delete item.id;
  });
  cafePlaces = finalResults;
};


findCafes = string => {
  let results = cafePlaces.filter(item =>
    item.name.toLowerCase().includes(string.toLowerCase())
  );
  return results;
};

const searcharea = document.querySelector("input");
const tablebody = document.querySelector("tbody");



SetContent = results => {
  results.forEach((item, i) => {
    setElement = document.createElement("tr");
    setElement.innerHTML = 
        `<td class="column1">${i + 1}</td>
        <td class="column2">${item.name}</td>
        <td class="column3">${item.street_no} ${item.locality}</td>
        <td class="column4">${item.postal_code}</td>
        <td class="column5">${item.lat}</td>
        <td class="column6">${item.long}</td>`;
    tablebody.appendChild(setElement);
  });
};


updateContent = e => {
  tablebody.innerHTML = "";
  const results = findCafes(e.target.value);
  SetContent(results);
};

GetCafes();
searcharea.addEventListener("input", updateContent);