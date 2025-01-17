const randomUserList = [];

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  } 
  
  function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then(res => res.json())
      .catch(error => console.log('Looks like there was a problem', error))
  }
  
  Promise.all([
    fetchData('https://randomuser.me/api/?results=12'),
  ])
  .then(data => {
    data.forEach(apiResponse => {
        if (apiResponse.results) {
            randomUserList.push(...apiResponse.results);
        }
        generateCards(randomUserList);
    });
});

function generateCards(data) {
    const cardGrid = document.getElementById('cardGrid');
    const html = data.map(user => `
        <div class="card">
            <div class="avatar"><img src="${user.picture.large}"></div>
            <div class="container">
                <h2>${user.name.first} ${user.name.last}</h2>
                <p>${user.email}</p>
                <p>${user.location.city}</p>
            </div><!--/container-->
        </div><!--/card-->
    `).join('');
    cardGrid.innerHTML = html;
  }