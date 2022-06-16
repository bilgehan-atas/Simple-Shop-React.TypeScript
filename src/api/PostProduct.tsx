async function PostProduct(product: object):Promise<any>  {
  try {
    const response = await fetch(
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products",
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
    if (response.ok) {
      return response;
    }

    throw new Error();
  } catch (Error) {
    return { error : Error };
  }
}

export default PostProduct;
