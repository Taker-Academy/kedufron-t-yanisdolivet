var url = 'https://api.kedufront.juniortaker.com/item/';
const protocol = window.location.href;

const SetDescription = async () => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            const title_img= document.getElementsByClassName('title_img')[0];
            const info_peluche = document.getElementsByClassName('info_peluche')[0];
            const PriceDiv = document.getElementsByClassName('price')[0];
            data.forEach(data => {
                if (data._id == (protocol.charAt(protocol.length - 1))) {
                    //create element
                    const peluche_title = document.createElement('h2');
                    const imgElement = document.createElement('img');
                    const oldprice = document.createElement('p');
                    const price = document.createElement('p');
                    const desc = document.createElement('p');
                    const creation = document.createElement('p');

                    //assign data to element
                    peluche_title.textContent = data.name;
                    imgElement.src = url + 'picture/' + data._id;
                    if (data.price % 1 == 0) {
                        data.price -= 0.01;
                    }
                    var OLDprice = data.price * 1.3;
                    if (oldprice % 1 == 0) {
                        oldprice -= 0.01;
                    }
                    price.textContent = data.price.toFixed(2) + '€';
                    oldprice.textContent = OLDprice.toFixed(2) + '€';
                    desc.textContent = "Description: " + data.description;
                    creation.textContent = "Crée le: " + data.createdIn;

                    //name a class name
                    peluche_title.classList.add('peluche_title');
                    oldprice.classList.add('oldprice');

                    //append element
                    title_img.appendChild(peluche_title);
                    title_img.appendChild(imgElement);
                    PriceDiv.appendChild(oldprice);
                    PriceDiv.appendChild(price);
                    info_peluche.appendChild(desc);
                    info_peluche.appendChild(creation);
                }
            });
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Axios error:', error);
        return null;
    }
}
