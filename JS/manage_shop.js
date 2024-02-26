const Click_times = new Array();
const PriceTotal = new Array();

function ManageElementApercuShop(TextContainer, data, apercu_shop_name,
    apercu_shop_price, apercu_shop_times, index, delete_image_apercu,
    apercu_shop, sum)
{
    //Assign data
    if (data.price % 1 == 0) {
        data.price -= 0.01;
    }
    PriceTotal[index] += Number(data.price).toFixed(2);
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
    for (let i = 0; i < PriceTotal.length; i++) {
        sum += Number(PriceTotal[i]);
    }
    apercu_shop.innerHTML = 'Total: ' + sum.toFixed(2) + '€';
    sum = 0;
}

function appendToChildDiv(ItemContainer, ContenuPanier, data, apercu_shop_image,
    TextContainer)
{
    ItemContainer.classList.add('items_apercu_shop');
    ContenuPanier.appendChild(ItemContainer);

    apercu_shop_image.src = url + 'picture/' + data._id;
    apercu_shop_image.classList.add('image_item');
    ItemContainer.appendChild(apercu_shop_image);

    TextContainer.classList.add('text_apercu_shop');
    ItemContainer.appendChild(TextContainer);
}

const getClicked = async ()  => {
    const response = await axios.get(url);
    var sum = 0;
        if (response.status === 200) {
            const data = response.data;
            const ContenuPanier = document.getElementsByClassName('contenu_panier')[0];
            const apercu_shop = document.getElementsByClassName('total_apercu_shop')[0];
            data.forEach(data => {
                let index = data._id - 1;
                Click_times[index] = 1;
                PriceTotal[index] = 0;

                //Button "Ajouter au panier" pressed
                document.getElementsByClassName('buy')[index].onclick = function () {
                if (Click_times[index] == 1) {
                    //Display the "Valider mon panier" button
                    document.getElementsByClassName('valider_panier')[0].style.visibility = 'visible';

                    //create elements
                    var ItemContainer = document.createElement('div');
                    var TextContainer = document.createElement('div');
                    var apercu_shop_name = document.createElement('p');
                    var apercu_shop_price = document.createElement('p');
                    var apercu_shop_times = document.createElement('p');
                    var delete_image_apercu = document.createElement('img');
                    var apercu_shop_image = document.createElement('img');

                    appendToChildDiv(ItemContainer, ContenuPanier, data, apercu_shop_image,
                        TextContainer);

                    ManageElementApercuShop(TextContainer, data, apercu_shop_name,
                        apercu_shop_price, apercu_shop_times, index, delete_image_apercu,
                        apercu_shop, sum);
    
                } else if (Click_times[index] > 1) {
                    var BuyItemTimes = document.getElementsByClassName(`apercu_shop_time_${index}`)[0];
                    var PriceItemTimes = document.getElementsByClassName(`apercu_shop_price_${index}`)[0];
                    var price = (data.price.toFixed(2) * Click_times[index])
                    if (price % 1 == 0) {
                        price -= 0.01;
                    }
                    BuyItemTimes.innerHTML = 'x' + Click_times[index];
                    PriceItemTimes.innerHTML = price.toFixed(2) + '€';
                    PriceTotal[index] = Number(price).toFixed(2);
                    for (let i = 0; i < PriceTotal.length; i++) {
                        sum += Number(PriceTotal[i]);
                    }
                    apercu_shop.innerHTML = 'Total: ' + sum.toFixed(2) + '€';
                    sum = 0;
                }
                Click_times[index] += 1;
            }
        });
    }
};