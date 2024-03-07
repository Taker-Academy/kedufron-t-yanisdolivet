if (!localStorage.getItem("cart")) {
    console.log("cart not found!");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}

let cart = JSON.parse(localStorage.getItem("cart"));

function DisplayNbItems()
{
    var NbItems = document.getElementsByClassName('nb_of_product')[0];
    let len = 0;
    cart.forEach(items => {
        if (items && items.times != 0)
            len++;
    });
    if (len === 1)
        NbItems.textContent = '(' + len + 'produit)';
    else if (len > 1) {
        NbItems.textContent = '(' + len + 'produits)';
    }
}

function CreateElement(ElementContainer, data)
{
    let ItemsContainer = document.createElement('div');
    ItemsContainer.classList.add('items_containes');
    ElementContainer.appendChild(ItemsContainer);

    let ImageAndTitle = document.createElement('div');
    ImageAndTitle.classList.add('image_and_title');
    ItemsContainer.appendChild(ImageAndTitle);
    
    let PriceAndQuantity = document.createElement('div');
    PriceAndQuantity.classList.add('price_and_quantity');
    ItemsContainer.appendChild(PriceAndQuantity);
    
    let ItemsImage = document.createElement('img');
    let ItemsTitle = document.createElement('h3');
    let ItemsPrice = document.createElement('p');
    let ItemsQuantity = document.createElement('p');

    ImageAndTitle.appendChild(ItemsImage);
    ImageAndTitle.appendChild(ItemsTitle);
    PriceAndQuantity.appendChild(ItemsPrice);
    PriceAndQuantity.appendChild(ItemsQuantity);

    //Set Data
    ItemsImage.src = url + 'picture/' + data.id;
    ItemsTitle.textContent = data.name;
    ItemsPrice.textContent = data.price + '€';
    ItemsQuantity.textContent = 'x' + data.times;
}

function GetItemInCart()
{
    const ElementContainer = document.getElementsByClassName('resume_items')[0];
    cart.forEach(items => {
        if (items && items.times != 0) {
            CreateElement(ElementContainer, items);
        }
    });
}