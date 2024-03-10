if (!localStorage.getItem("cart")) {
    console.log("cart not found!");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}

function DisplayNbItems()
{
    var NbItems = document.getElementsByClassName('nb_of_product')[0];
    var NbItems1 = document.getElementsByClassName('nb_of_product')[1];
    let len = 0;

    cart.forEach(items => {
        if (items && items.times != 0)
            len++;
    });
    if (len === 1) {
        NbItems.textContent = '(' + len + ' produit)';
        NbItems1.textContent = '(' + len + ' produit)';
    } else if (len > 1) {
        NbItems.textContent = '(' + len + ' produits)';
        // NbItems1.textContent = '(' + len + ' produits)';
    }
}

function DisplayTotal()
{
    var total = document.getElementsByClassName('prix_total')[0];
    var total1 = document.getElementsByClassName('prix_total')[1];
    var price = 0;

    cart.forEach(items => {
        if (items && items.times != 0) {
            price += (items.times * items.price);
        }
    });
    total.textContent = price.toFixed(2) + '€';
    // total1.textContent = price.toFixed(2) + '€';
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

function show_final_paiement()
{
    var div_recap = document.getElementsByClassName('content_recap')[0]
    var div_final_paiement = document.getElementsByClassName('paiement_final')[0];
    var line1 = document.getElementsByClassName('line1')[0];
    var line2 = document.getElementsByClassName('line2')[0];

    div_recap.style.display = "none";
    div_final_paiement.style.display = "flex";
    line1.style.backgroundColor = "black";
    line2.style.backgroundColor = "#e28b3c";
}