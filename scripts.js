const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
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
      card.setAttribute('class', 'card');

      // Create an h1 and set the text content to the film's title
      const h1 = document.createElement('h1');

      let disasterTitle = query.fields.name.substring(0, query.fields.name.indexOf('-'));
      h1.textContent = disasterTitle;

      // Create a p and set the text content to the film's description
      const p = document.createElement('p');

      let disasterDescrip = "";

      var nestedRequest = new XMLHttpRequest();
      nestedRequest.open('GET', `${query.href}`, true);
      nestedRequest.onload = function() {
        // Begin accessing JSON data here
        var nestedData = JSON.parse(this.response);


        if (request.status >= 200 && request.status < 400) {
          nestedData.data.forEach( query2 => {

            disasterDescrip = query2.fields.description.substring(0, 300);

            const cardDescrip = `Date: ${disasterDate} ` +
                `Countries Affected: ${countriesAffected} ` + `${disasterDescrip}`

            p.textContent = `Date: ${disasterDate} ` +
            `Countries Affected: ${countriesAffected} ` + `${disasterDescrip}`;
          })
        } else {
          console.log('error')
        }

      };

      let disasterDate = query.fields.name.substring(query.fields.name.indexOf('-') + 2);
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


      }

      console.log(`${disasterDescrip}`);


      // Append the cards to the container element
      container.appendChild(card);

      // Each card will contain an h1 OR a p
      card.appendChild(h1);
      card.appendChild(p);

      nestedRequest.send();
    })
  } else {
    console.log('error')
  }
};

request.send();