document.getElementById('search-button').addEventListener('click', searchPictures);

async function searchPictures() {
  const category = document.getElementById('category-input').value;
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${category}&per_page=9`, {
    headers: {
      Authorization: 'Client-ID YOUR_UNSPLASH_ACCESS_KEY' // Replace with your Unsplash access key
    }
  });
  const data = await response.json();
  displayPictures(data.results);
}

function displayPictures(pictures) {
  const gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';

  pictures.forEach(picture => {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';

    const image = document.createElement('img');
    image.className = 'image';
    image.src = picture.urls.small;

    const author = document.createElement('p');
    author.className = 'author';
    author.textContent = `By ${picture.user.name}`;

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = picture.description || 'No description available';

    const link = document.createElement('a');
    link.href = picture.links.html;
    link.textContent = 'View on Unsplash';
    link.target = '_blank';

    gridItem.appendChild(image);
    gridItem.appendChild(author);
    gridItem.appendChild(description);
    gridItem.appendChild(link);

    gridContainer.appendChild(gridItem);
  });
}
