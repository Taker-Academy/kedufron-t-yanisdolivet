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

const getClicked = async ()  => {
    const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            const ItemContainer = document.getElementsByClassName('contenu_panier')[0];
            data.forEach(data => {
                let index = data._id - 1;
                Click_times[index - 1] = 1;
                document.getElementsByClassName('buy')[index].onclick = function () {
                    
                    if (Click_times[index - 1] == 1) {
                        //create elements
                        var apercu_shop_name = document.createElement('p');
                        var apercu_shop_price = document.createElement('p');
                        var apercu_shop_times = document.createElement('p');
                        var apercu_shop_image = document.createElement('img');

                        //Assign data
                        if (data.price % 1 == 0)
                        data.price -= 0.01;
    
                        apercu_shop_name.textContent = data.name;
                        apercu_shop_price.textContent = data.price.toFixed(2) + '€';
                        apercu_shop_times.textContent = 'x' + Click_times[index - 1];
                        apercu_shop_image.src = url + 'picture/' + data._id;
    
                        //Set class name
                        apercu_shop_name.classList.add('apercu_shop_name');
                        apercu_shop_price.classList.add('apercu_shop_price');
                        apercu_shop_times.classList.add('apercu_shop_times');
    
                        //Append all element
                        ItemContainer.appendChild(apercu_shop_name);
                        ItemContainer.appendChild(apercu_shop_price);
                        ItemContainer.appendChild(apercu_shop_times);
                        ItemContainer.appendChild(apercu_shop_image);
                    } else if (Click_times[index - 1] > 1) {
                        var para = document.getElementsByClassName("apercu_shop_times")[0];
                        para.innerHTML = 'x' + Click_times[index - 1];
                    }
                    Click_times[index - 1] += 1;
            }
        });
    }
};
