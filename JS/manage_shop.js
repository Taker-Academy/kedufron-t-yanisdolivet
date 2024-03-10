const count = new Array();
let total_price = 0;

if (!localStorage.getItem("cart")) {
    console.log("cart not found!");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}

let cart = JSON.parse(localStorage.getItem("cart"));

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem("cart")) {
        ActualizeShop();
    }
});

function ActualizeShop()
{
    total_price = 0;
    cart.forEach(data => {
        if (data && data.times != 0) {
            DisplayShop(data.id - 1);
            document.getElementsByClassName('valider_panier')[0].style.visibility = 'visible';
            total_price += (data.price * data.times);
        }
    });
    const apercu_shop = document.getElementsByClassName('total_apercu_shop')[0];
    apercu_shop.textContent = 'Total: ' + Math.round(total_price * 100) / 100 + '€';
    if (total_price === 0) {
        apercu_shop.textContent = 'Votre panier est vide';
        document.getElementsByClassName('valider_panier')[0].style.visibility = 'hidden';
    }
}

function DisplayShop(index)
{
    var ContenuPanier = document.getElementsByClassName('contenu_panier')[0];
    //create elements
    var ItemContainer = document.createElement('div');
    var TextContainer = document.createElement('div');
    var ChangeTimes = document.createElement('div');
    var apercu_shop_name = document.createElement('p');
    var apercu_shop_price = document.createElement('p');
    var apercu_shop_times = document.createElement('p');
    var delete_image_apercu = document.createElement('img');
    var add_image_apercu = document.createElement('img');
    var apercu_shop_image = document.createElement('img');

    ItemContainer.classList.add('items_apercu_shop');
    ContenuPanier.appendChild(ItemContainer);

    apercu_shop_image.src = url + 'picture/' + cart[index].id;
    apercu_shop_image.classList.add('image_item');
    ItemContainer.appendChild(apercu_shop_image);

    TextContainer.classList.add('text_apercu_shop');
    ItemContainer.appendChild(TextContainer);

    ChangeTimes.classList.add('change_times');
    //Assign data
    if (cart[index].price % 1 == 0) {
        cart[index].price -= 0.01;
    }
    apercu_shop_name.textContent = cart[index].name;
    apercu_shop_price.textContent = cart[index].price.toFixed(2) + '€';
    apercu_shop_times.textContent = 'x' + cart[index].times;
    delete_image_apercu.src = '../ressources/images/moins.png';
    add_image_apercu.src = '../ressources/images/plus.png';

    //Set class name
    apercu_shop_name.classList.add('apercu_shop_name');
    apercu_shop_price.classList.add(`apercu_shop_price_${index}`);
    apercu_shop_times.classList.add(`apercu_shop_time_${index}`);
    delete_image_apercu.classList.add(`remove_peluche_${index}`);
    add_image_apercu.classList.add(`add_peluche_${index}`);

    //Append all element
    TextContainer.appendChild(apercu_shop_name);
    TextContainer.appendChild(apercu_shop_price);
    TextContainer.appendChild(ChangeTimes);
    ChangeTimes.appendChild(delete_image_apercu);
    ChangeTimes.appendChild(apercu_shop_times);
    ChangeTimes.appendChild(add_image_apercu);
};

function SetTotal(index)
{
    total_price += cart[index].price;
    const apercu_shop = document.getElementsByClassName('total_apercu_shop')[0];
    apercu_shop.textContent = 'Total: ' + (Math.round(total_price * 100) / 100).toFixed(2) + '€';
    return total_price;
}


function AddPeluche(index)
{
    document.getElementsByClassName(`add_peluche_${index}`)[0].onclick = function () {
        cart[index].times += 1;
        document.getElementsByClassName(`apercu_shop_time_${index}`)[0].textContent = 'x' + cart[index].times;
        total_price = SetTotal(index);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart[index];
}

function RemovePeluche(index, total_price)
{
    document.getElementsByClassName(`remove_peluche_${index}`)[0].onclick = function () {
        cart[index].times -= 1;
        if (cart[index].times != 0) {
            document.getElementsByClassName(`apercu_shop_time_${index}`)[0].textContent = 'x' + cart[index].times;
        } else if (cart[index].times === 0) {
            const delete_div = document.getElementsByClassName('items_apercu_shop')[0];
            delete_div.remove();
        }
        total_price -= cart[index].price;
        document.getElementsByClassName('total_apercu_shop')[0].textContent = 'Total: ' + (Math.round(total_price * 100) / 100).toFixed(2) + '€';
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart[index];
}

function AddtoShop(data, index, count)
{
    dict = {
        id: data._id,
        price: data.price,
        name: data.name,
        times: count[index],
    };
    document.getElementsByClassName('valider_panier')[0].style.visibility = 'visible';
    if (count[index] === 1) {
        cart[index] = dict;
        DisplayShop(index);
    } else if (count[index] > 1) {
        document.getElementsByClassName(`apercu_shop_time_${index}`)[0].textContent = 'x' + cart[index].times;
    }
    count[index] += 1;
    return cart[index];
}

const ChangeQuantites = async () => {
    const response = await axios.get(url);
    if (response.status === 200) {
        const data = response.data;
        data.forEach(data => {
            let index = data._id - 1;
            if (document.getElementsByClassName(`add_peluche_${index}`)[0]) {
                document.getElementsByClassName(`add_peluche_${index}`)[0].onclick = function () {
                    AddPeluche(index);
                }
            }
            if (document.getElementsByClassName(`remove_peluche_${index}`)[0]) {
                RemovePeluche(index, total_price)
            }
        });
    }
}

const FillPanier = async ()  => {
    const response = await axios.get(url);
    if (response.status === 200) {
        const data = response.data;
        data.forEach(data => {
            let index = data._id - 1;
            if (count[index] === undefined) {
                count[index] = 1;
            }
            document.getElementsByClassName('buy')[index].onclick = function () {
                console.log("Times = " + count[index]);
                cart[index] = AddtoShop(data, index, count);
                total_price = SetTotal(index);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        });
    }
}
