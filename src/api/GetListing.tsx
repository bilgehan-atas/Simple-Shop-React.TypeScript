async function GetListing():Promise<any> {
  try {
    const response = await fetch(
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products"
    );
    const result = await response.json();
    if (response.ok) {
      return result;
    }

    throw new Error();
  } catch (Error) {
    return {error: Error};
  }
}

export default GetListing;