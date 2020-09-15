const baseURL = 'http://localhost:3000/cartoons'

const $createForm = document.querySelector('#create-cartoon-form')
$createForm.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newName = formData.get('name')
    const newImage = formData.get('image_url')

    const newCartoon = {
        name: newName,
        image_url: newImage
    }
    createCard(newCartoon)
    fetch( baseURL , {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCartoon), 
    }
    )
}


fetch(baseURL)
.then(response => response.json())
.then(populateCartoons)

function createCard(cartoon) {
    const $cartoonsContainer = document.querySelector('#cartoons-container')

    const $cartoonCard = document.createElement('div')
    const $cartoonTitle = document.createElement('h2')
    const $cartoonImage = document.createElement('img')
 
    $cartoonCard.classList.add('card')
    $cartoonCard.id = cartoon.id
    
    $cartoonTitle.textContent = cartoon.name
    
    $cartoonImage.src = cartoon.image_url
    
    $cartoonCard.append($cartoonTitle, $cartoonImage)
    $cartoonsContainer.append($cartoonCard)
}

function populateCartoons(cartoons) {
    cartoons.forEach(cartoon => {
        createCard(cartoon)
    })
}


