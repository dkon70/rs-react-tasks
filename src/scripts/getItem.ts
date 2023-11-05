const getItem = async (id: number) => {
  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );
  const data = await response.json();
  return data;
};

export default getItem;
