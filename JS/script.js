var url = 'https://api.kedufront.juniortaker.com/item/'

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
                document.getElementsByClassName('peluche')[data._id - 1].onclick = function () {
                    window.location.href = "info_peluche.html" + "?_id=" + String(data._id);
                }
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

function openPanier() {
    var panier = document.getElementsByClassName('apercu_shop')[0];

    panier = panier.length ? panier : [panier];
    for (var index = 0; index < panier.length; index++) {
      panier[index].style.display = 'block';
    }
}

function closePanier() {
    var panier = document.getElementsByClassName('apercu_shop')[0];

    panier = panier.length ? panier : [panier];
    for (var index = 0; index < panier.length; index++) {
      panier[index].style.display = 'none';
    }
}

function BackToMenu()
{
    var menu = document.getElementsByClassName('logo_header')[0];

    menu.onclick = function() {
        window.location.href = "index.html";
    }
}

function BackToMenuFooterSection()
{
    var menu = document.getElementsByClassName('logo_header')[0];

    menu.onclick = function() {
        window.location.href = "../index.html";
    }
}

function HideDivWhenSendAMessage()
{
    var div = document.getElementsByClassName('formulaire')[0];
    var Retour = document.getElementsByClassName('message_sent')[0];

    div.style.display = 'none';
    Retour.style.display = 'block';
}