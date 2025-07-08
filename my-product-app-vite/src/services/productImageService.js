export const fetchRandomProductImage = async () => {
  try {
    const randomProductId = Math.floor(Math.random() * 30) + 1;
    const response = await fetch(
      `https://dummyjson.com/products/${randomProductId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product data, status: ${response.status}`);
    }

    const productData = await response.json();

    if (Array.isArray(productData.images) && productData.images.length > 0) {
      const randomIndex = Math.floor(Math.random() * productData.images.length);
      let randomImage = productData.images[randomIndex];

      if (typeof randomImage === "string") {
        let cleanedUrl = randomImage;
        if (cleanedUrl.startsWith('["') && cleanedUrl.endsWith('"]')) {
          try {
            const parsed = JSON.parse(cleanedUrl);
            if (Array.isArray(parsed) && parsed.length > 0) {
              cleanedUrl = parsed[0];
            }
          } catch (e) {}
        }
        if (cleanedUrl.startsWith("http")) {
          return cleanedUrl;
        }
      }
    }
  } catch (fetchError) {
    console.error("Could not fetch random product image, will proceed without it.", fetchError);
  }

  return "";
};
