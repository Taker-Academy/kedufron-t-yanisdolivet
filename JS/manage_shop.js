const Click_times = new Array();
const PriceTotal = new Array();
const count = new Array();
let total_price = 0;

// localStorage.removeItem("cart");

if (!localStorage.getItem("cart")) {
    console.log("cart not found!");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}

let cart = JSON.parse(localStorage.getItem("cart"));

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem("cart")) {
        display_shop();
    }
});

function display_shop() {
    cart.forEach(data => {
        if (data) {
            AddToShop(data.id - 1);
            document.getElementsByClassName('valider_panier')[0].style.visibility = 'visible';
            total_price += (data.price * data.times);
        }
    });
    const apercu_shop = document.getElementsByClassName('total_apercu_shop')[0];
    apercu_shop.textContent = 'Total: ' + Math.round(total_price * 100) / 100 + '€';
}

function AddToShop(index){
    var ContenuPanier = document.getElementsByClassName('contenu_panier')[0];
    //create elements
    var ItemContainer = document.createElement('div');
    var TextContainer = document.createElement('div');
    var apercu_shop_name = document.createElement('p');
    var apercu_shop_price = document.createElement('p');
    var apercu_shop_times = document.createElement('p');
    var delete_image_apercu = document.createElement('img');
    var apercu_shop_image = document.createElement('img');

    ItemContainer.classList.add('items_apercu_shop');
    ContenuPanier.appendChild(ItemContainer);

    apercu_shop_image.src = url + 'picture/' + cart[index].id;
    apercu_shop_image.classList.add('image_item');
    ItemContainer.appendChild(apercu_shop_image);

    TextContainer.classList.add('text_apercu_shop');
    ItemContainer.appendChild(TextContainer);
    //Assign data
    if (cart[index].price % 1 == 0) {
        cart[index].price -= 0.01;
    }
    apercu_shop_name.textContent = cart[index].name;
    apercu_shop_price.textContent = cart[index].price.toFixed(2) + '€';
    apercu_shop_times.textContent = 'x' + cart[index].times;
    delete_image_apercu.src = '../ressources/images/poubelle-de-recyclage.png';

    //Set class name
    apercu_shop_name.classList.add('apercu_shop_name');
    apercu_shop_price.classList.add(`apercu_shop_price_${index}`);
    apercu_shop_times.classList.add(`apercu_shop_time_${index}`);

    //Append all element
    TextContainer.appendChild(apercu_shop_name);
    TextContainer.appendChild(apercu_shop_price);
    TextContainer.appendChild(apercu_shop_times);
    TextContainer.appendChild(delete_image_apercu);
};

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
                dict = {
                    id: data._id,
                    price: data.price,
                    name: data.name,
                    times: count[index],
                };
                if (!cart[index]) {
                    cart[index] = dict;
                }
                document.getElementsByClassName('valider_panier')[0].style.visibility = 'visible';
                if (cart[index].times === 1) {
                    AddToShop(index);
                } else if (cart[index].times > 1) {
                    document.getElementsByClassName(`apercu_shop_time_${index}`)[0].textContent = 'x' + cart[index].times;
                }
                total_price += cart[index].price;
                const apercu_shop = document.getElementsByClassName('total_apercu_shop')[0];
                apercu_shop.textContent = 'Total: ' + Math.round(total_price * 100) / 100 + '€';
                localStorage.setItem("cart", JSON.stringify(cart));
                cart[index].times += 1;
            }
        });
    }
}
