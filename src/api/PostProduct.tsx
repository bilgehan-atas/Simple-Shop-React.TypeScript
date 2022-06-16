async function PostProduct(product: object) {
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
      if (!response.ok) {
        throw new Error();
      }
      return response}
      catch (error) {
        return error;
      }
    }

export default PostProduct;