console.log("hello");

const app = document.getElementById('root');


const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();

request.open('GET', 'https://api.reliefweb.int/v1/disasters?appname=rwint-user-0&limit=100&profile=list&preset=latest&query[value]=type.id%3A(4628%20OR%204624%20OR%204618%20OR%204687%20OR%204611%20OR%204719)', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  console.log(data);
  if (request.status >= 200 && request.status < 400) {
    data.data.forEach( query => {
      // Create a div with a card class
      const card = document.createElement('div');
      card.setAttribute('class', 'card text-center');

      // Create a div with a card-header class
      const cardHeader = document.createElement('div');
      card.setAttribute('class', 'card-header')

      // Create a small and set the text content to the date
      const cardHeaderText = document.createElement('small');
      let disasterDate = query.fields.name.substring(query.fields.name.indexOf('-') + 2);
      cardHeaderText.textContent = disasterDate;

      // Create a div with a card-body class
      const cardBody = document.createElement('div');
      card.setAttribute('class', 'card-body');

      // Create an h4 with a card-title class and set the text content to the title
      const cardTitle = document.createElement('h4');
      card.setAttribute('class', 'card-title');

      let disasterTitle = query.fields.name.substring(0, query.fields.name.indexOf('-'));
      cardTitle.textContent = disasterTitle;

      // Create a p  with a card-text class and set the text content to the description
      const cardText = document.createElement('p');
      card.setAttribute('class', 'card-text');

      let countriesAffected = "";
      if (query.fields.country.length > 1) {
        var i;
        for (i = 0; i < query.fields.country.length; i++) {
          if (i == 0) {
            countriesAffected += query.fields.country[i].name;
          } else {
            countriesAffected += ", " + query.fields.country[i].name;
          }
        }

      } else {

      }

      cardText.textContent = countriesAffected;

      // Append the cards to the container element
      container.appendChild(card);
      card.appendChild(cardHeader);
      cardHeader.appendChild(cardHeaderText);
      card.appendChild(cardBody);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);


    })
  } else {
    console.log('error')
  }
};

request.send();