export const formatNPWP = (value) => {
  const cleanedValue = value.replace(/\D/g, "");

  let formattedValue = cleanedValue;
  if (cleanedValue.length > 2) {
    formattedValue = `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2)}`;
  }
  if (cleanedValue.length > 5) {
    formattedValue = `${formattedValue.slice(0, 6)}.${formattedValue.slice(6)}`;
  }
  if (cleanedValue.length > 8) {
    formattedValue = `${formattedValue.slice(0, 10)}.${formattedValue.slice(
      10
    )}`;
  }
  if (cleanedValue.length > 9) {
    formattedValue = `${formattedValue.slice(0, 12)}-${formattedValue.slice(
      12
    )}`;
  }
  if (cleanedValue.length > 12) {
    formattedValue = `${formattedValue.slice(0, 16)}.${formattedValue.slice(
      16
    )}`;
  }

  // Batasi panjang maksimal input (20 karakter dengan format yang sesuai)
  return formattedValue.substring(0, 20);
};
