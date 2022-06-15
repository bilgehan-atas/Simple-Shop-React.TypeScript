async function GetListing():Promise<any> {
  try {
    const response = await fetch(
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products"
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error();
    }

    return data;
  } catch (error) {
    return error;
  }
}

export default GetListing;