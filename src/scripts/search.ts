const searchData = async (name: string) => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${name}`
  );
  const data = await response.json();
  return data;
};

export default searchData;
