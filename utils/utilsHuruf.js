import DOMPurify from "dompurify";

export const formatHuruf = (value) => {
  const sanitizedValue = DOMPurify.sanitize(value);
  return sanitizedValue.replace(/[^a-zA-Z\s]/g, "");
};
