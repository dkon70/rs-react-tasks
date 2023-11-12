const searchData = async (name: string, limit = 5, skip = 0) => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${name}&limit=${limit}&skip=${skip}`
  );
  const data = await response.json();
  return data;
};

export default searchData;
