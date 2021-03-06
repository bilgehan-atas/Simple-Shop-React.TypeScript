async function GetProduct(ItemId:string): Promise<any> {
  try {
    const response = await fetch(
      `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${ItemId}`
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    return result;
  } catch (error) {
    return error;
  }
}

export default GetProduct;
