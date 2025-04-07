import DOMPurify from "dompurify";

export const formatNoTeleponPerusahaan = (value) => {
  const sanitizedValue = DOMPurify.sanitize(value);
  const cleanedValue = sanitizedValue.replace(/\D/g, "");

  if (cleanedValue.length === 0) return "";

  if (!cleanedValue.startsWith("0") && !cleanedValue.startsWith("62")) {
    return "";
  }

  if (/^08\d{8,11}$/.test(cleanedValue)) {
    return `${cleanedValue.slice(0, 4)}-${cleanedValue.slice(
      4,
      8
    )}-${cleanedValue.slice(8)}`;
  }

  if (cleanedValue.length >= 10 && cleanedValue.length <= 12) {
    return `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(
      3,
      7
    )}-${cleanedValue.slice(7)}`;
  }

  if (cleanedValue.startsWith("0800") || cleanedValue.startsWith("0809")) {
    return `${cleanedValue.slice(0, 4)}-${cleanedValue.slice(
      4,
      7
    )}-${cleanedValue.slice(7)}`;
  }

  return cleanedValue.substring(0, 16); // Maksimal 16 digit
};
