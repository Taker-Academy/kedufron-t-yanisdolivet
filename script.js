var url = 'https://api.kedufront.juniortaker.com/item/';

const getAllItems = async () => {
    try {
      const response = await axios.get(url);
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
  
        const firstItemName = data[0].name;
        console.log(firstItemName);
  
        return data;
      } else {
        console.error('Request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Axios error:', error);
      return null;
    }
};
