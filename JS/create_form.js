var url_form = 'https://api.kedufront.juniortaker.com/order';

if (!localStorage.getItem("cart")) {
    console.log("cart not found!");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}

let cart = JSON.parse(localStorage.getItem("cart"));
let send_cart = []

function getCart()
{
    cart.forEach(element => {
        if (element != null) {
            dict_send = [
                {
                    id: element.id,
                    amount: element.times,
                }
            ];
            send_cart.push(dict_send);
        }
    });
    console.log(send_cart);
    return send_cart;
}

const sendForm = async () => {
    var name = document.getElementById('lname').value;
    var fname = document.getElementById('fname').value;
    var email = document.getElementById('email').value;
    var adress = document.getElementById('adress').value;


    if (!name  && !fname && !email && !adress) {
        throw new Error("Enter a value!\n");
    }
    const body = JSON.stringify({
        email: email,
        name: fname + " " + name,
        address: adress,
        cart: getCart(),
    });
    const options = {
        method: "POST /order/",
        headers: {
          "Content-Type": "application/json",
        },
        body,
    };
    await fetch("https://api.kedufront.juniortaker.com/order", options)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            if (response.status === 400) {
                throw new Error('Data not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Network response was not ok');
            }
        }
    })
    .then((data) => {
        console.log("ca fonctionne !", data);
    })
    .catch((error) => {
        console.error("Fock :", error);
    });
}