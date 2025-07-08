import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Generates a unique product code (SKU) by checking against the Firestore database.
 * It adds a prefix 'PD' to an 8-digit random number.
 * @returns {Promise<string>} A promise that resolves to a unique product code.
 */
export const generateUniqueProductCode = async () => {
  let isUnique = false;
  let uniqueCode = "";
  let attempts = 0;
  const maxAttempts = 10; // Prevent infinite loops

  while (!isUnique && attempts < maxAttempts) {
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
    const potentialCode = `PD${randomDigits}`;
    const q = query(
      collection(db, "products"),
      where("code", "==", potentialCode)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      isUnique = true;
      uniqueCode = potentialCode;
    }
    attempts++;
  }

  if (!isUnique) {
    throw new Error("Could not generate a unique product code after several attempts.");
  }

  return uniqueCode;
};

