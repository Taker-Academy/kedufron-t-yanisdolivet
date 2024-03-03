const Click_times = new Array();
const PriceTotal = new Array();
const count = new Array();

localStorage.removeItem("cart");

if (!localStorage.getItem("cart")) {
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}

let cart = JSON.parse(localStorage.getItem("cart"));

function IsAlreadyExist(id) {
    return cart.some(function(dict) {
        return dict.id === id;
    });
}

const AddToShop = async (index)  => {
    const ContenuPanier = document.getElementsByClassName('contenu_panier')[0];
    const apercu_shop = document.getElementsByClassName('total_apercu_shop')[0];
    cart.forEach(data => {
        if ((index + 1) === data.id) {
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
    
            apercu_shop_image.src = url + 'picture/' + data.id;
            apercu_shop_image.classList.add('image_item');
            ItemContainer.appendChild(apercu_shop_image);
    
            TextContainer.classList.add('text_apercu_shop');
            ItemContainer.appendChild(TextContainer);
            //Assign data
            if (data.price % 1 == 0) {
                data.price -= 0.01;
            }
            apercu_shop_name.textContent = data.name;
            apercu_shop_price.textContent = data.price.toFixed(2) + '€';
            apercu_shop_times.textContent = 'x' + data.times;
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
        }
    });
};

const FillPanier = async ()  => {
    const response = await axios.get(url);
    if (response.status === 200) {
        const data = response.data;
        data.forEach(data => {
            let index = data._id - 1;
            count[index] = 1;
            document.getElementsByClassName('buy')[index].onclick = function () {
                dict = {
                    id: data._id,
                    price: data.price,
                    name: data.name,
                    times: count[index],
                };
                cart[index] = dict;
                document.getElementsByClassName('valider_panier')[0].style.visibility = 'visible';
                console.log(cart[index].times);
                if (cart[index].times === 1) {
                    localStorage.setItem("cart", JSON.stringify(cart));
                    AddToShop(index);
                } else if (cart[index].times > 1) {
                    document.getElementsByClassName(`apercu_shop_time_${index}`)[0].textContent = 'x' + cart[index].times;
                }
                count[index] += 1;
            }
        });
    }
}
