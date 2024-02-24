var url = 'https://api.kedufront.juniortaker.com/item/'
const Click_times = new Array();

const getAllNamesAndImage = async () => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            const itemsContainer = document.getElementsByClassName('achat_peluche')[0];
            data.forEach(data => {
                const divPeluche = document.createElement('div');
                divPeluche.classList.add('peluche');
                itemsContainer.appendChild(divPeluche);

                //create element
                const h4Element = document.createElement('h4');
                const imgElement = document.createElement('img');

                //assign data to element
                h4Element.textContent = data.name;
                imgElement.src = url + 'picture/' + data._id;

                //name a class name
                h4Element.classList.add('peluche_title');

                //append element
                divPeluche.appendChild(h4Element);
                divPeluche.appendChild(imgElement);
                return data;
            });
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Axios error:', error);
        return null;
    }
};

const getPrice = async () => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            data.forEach(data => {
                const itemsContainer = document.getElementsByClassName('peluche')[data._id - 1];

                //create div
                const divFooter = document.createElement('div');
                divFooter.classList.add('peluche_footer');
                itemsContainer.appendChild(divFooter);

                const divPrice = document.createElement('div');
                divPrice.classList.add('price');
                divFooter.appendChild(divPrice);

                //create element
                const priceElement = document.createElement('p');
                const oldPriceElement = document.createElement('p');
                const buyElement = document.createElement('button');

                //assign data to element
                if (data.price % 1 == 0)
                    data.price -= 0.01;
                var oldprice = data.price * 1.3;
                if (oldprice % 1 == 0)
                    oldprice -= 0.01;
                priceElement.textContent = data.price.toFixed(2) + '€';
                oldPriceElement.textContent = oldprice.toFixed(2) + '€';
                buyElement.textContent = 'Ajouter au panier';

                //name a class name
                oldPriceElement.classList.add('old_price');
                priceElement.classList.add('current_prce');
                buyElement.classList.add('buy');

                //append element
                divPrice.appendChild(oldPriceElement);
                divPrice.appendChild(priceElement);
                divFooter.appendChild(buyElement);
                return data;
            });
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Axios error:', error);
        return null;
    }
};

function ManageElementApercuShop(TextContainer, data, apercu_shop_name,
    apercu_shop_price, apercu_shop_times, index, delete_image_apercu,
    apercu_shop, total)
{
    //Assign data
    if (data.price % 1 == 0) {
        data.price -= 0.01;
    }
    total += Number(data.price.toFixed(2));
    apercu_shop_name.textContent = data.name;
    apercu_shop_price.textContent = data.price.toFixed(2) + '€';
    apercu_shop_times.textContent = 'x' + Click_times[index];
    delete_image_apercu.src = './ressources/images/poubelle-de-recyclage.png';

    //Set class name
    apercu_shop_name.classList.add('apercu_shop_name');
    apercu_shop_price.classList.add(`apercu_shop_price_${index}`);
    apercu_shop_times.classList.add(`apercu_shop_time_${index}`);

    //Append all element
    TextContainer.appendChild(apercu_shop_name);
    TextContainer.appendChild(apercu_shop_price);
    TextContainer.appendChild(apercu_shop_times);
    TextContainer.appendChild(delete_image_apercu);
    apercu_shop.innerHTML = 'Total: ' + total.toFixed(2) + '€';
}

const getClicked = async ()  => {
    const response = await axios.get(url);
    var total = 0;
        if (response.status === 200) {
            const data = response.data;
            const ContenuPanier = document.getElementsByClassName('contenu_panier')[0];
            const apercu_shop = document.getElementsByClassName('total_apercu_shop')[0];
            data.forEach(data => {
                let index = data._id - 1;
                Click_times[index] = 1;

                //Button "Ajouter au panier" pressed
                document.getElementsByClassName('buy')[index].onclick = function () {
                if (Click_times[index] == 1) {
                    //Display the "Valider mon panier" button
                    document.getElementsByClassName('valider_panier')[0].style.visibility = 'visible';

                    //create elements

                    //HTML code
                    //<div class="items_apercu_shop">
                    //  <div class="text_apercu_shop">
                    //      <p class="apercu_shop_name">Nom de la peluche</p>
                    //      <p class="apercu_shop_price">Prix de la peluche</p>
                    //      <p class="apercu_shop_times">Nombre de fois que la peluche a été ajouter</p>
                    //      <img src="image-poubelle">
                    //  </div>
                    //  <img src="photo-de-la-peluche">
                    //</div>

                    var ItemContainer = document.createElement('div');
                    var TextContainer = document.createElement('div');
                    var apercu_shop_name = document.createElement('p');
                    var apercu_shop_price = document.createElement('p');
                    var apercu_shop_times = document.createElement('p');
                    var delete_image_apercu = document.createElement('img');
                    var apercu_shop_image = document.createElement('img');

                    ItemContainer.classList.add('items_apercu_shop');
                    ContenuPanier.appendChild(ItemContainer);

                    apercu_shop_image.src = url + 'picture/' + data._id;
                    apercu_shop_image.classList.add('image_item');
                    ItemContainer.appendChild(apercu_shop_image);

                    TextContainer.classList.add('text_apercu_shop');
                    ItemContainer.appendChild(TextContainer);

                    ManageElementApercuShop(TextContainer, data, apercu_shop_name,
                        apercu_shop_price, apercu_shop_times, index, delete_image_apercu,
                        apercu_shop, total);
    
                } else if (Click_times[index] > 1) {
                    var BuyItemTimes = document.getElementsByClassName(`apercu_shop_time_${index}`)[0];
                    var PriceItemTimes = document.getElementsByClassName(`apercu_shop_price_${index}`)[0];
                    var price = (data.price.toFixed(2) * Click_times[index])
                    if (price % 1 == 0) {
                        price -= 0.01;
                    }
                    BuyItemTimes.innerHTML = 'x' + Click_times[index];
                    PriceItemTimes.innerHTML = price.toFixed(2) + '€';
                    total += Number(price.toFixed(2));
                    apercu_shop.innerHTML = 'Total: ' + total.toFixed(2) + '€';
                }
                Click_times[index] += 1;
            }
        });
    }
};

function openPanier() {
    var panier = document.getElementsByClassName('apercu_shop');

    panier = panier.length ? panier : [panier];
    for (var index = 0; index < panier.length; index++) {
      panier[index].style.display = 'block';
    }
}

function closePanier() {
    var panier = document.getElementsByClassName('apercu_shop');

    panier = panier.length ? panier : [panier];
    for (var index = 0; index < panier.length; index++) {
      panier[index].style.display = 'none';
    }
}