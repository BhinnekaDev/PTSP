import DOMPurify from "dompurify";

export const formatNoIdentitas = (value) => {
  const sanitizedValue = DOMPurify.sanitize(value);
  const cleanedValue = sanitizedValue.replace(/\D/g, "");
  return cleanedValue.substring(0, 16);
};
