
const input = document.querySelector('.searchInput');
const submitBtn = document.querySelector('.subitBtn');
const listAuthors = document.querySelector('.authors__list');


function getUserInput(){
 var input = this.value;
 var isValid = validateQuery(input);
 if(isValid){
   fetchData(input);
  }
};

function fetchData(query){
  fetch(`https://api.journa.be/search/authors/${query}?limit=15`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      renderHtml(data);
    })
    .catch(error => console.log(error))
}

function renderHtml(data){
  let html;

  if(data.authors.length > 0){
    html = data.authors.map(author => {
      return `<li class='author__listitem'>${author.fullName} <a href="#" class="article-count">${author.articleCount}</a></li>`;
    }).join('');
  } else if (data && data.authors.length === 0){
    html = '<p class="no-authors"> Sorry, no authors found...</p>';
  };

  listAuthors.innerHTML = html;
};

function validateQuery(query){
  let message;
  const maxLength = 20;
  if (query.length > maxLength){
    message = `Your search request has a maximum of ${maxLength} characters, please try again`;
    listAuthors.innerHTML = `<p class="validation">${message}</p>`;
    return false;
  } else {
    return true
  };
}

function clearInput(){
  input.value = '';
};

input.addEventListener('change', getUserInput);
input.addEventListener('keyup', getUserInput);
submitBtn.addEventListener('click', getUserInput);
