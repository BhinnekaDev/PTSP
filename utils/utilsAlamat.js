import DOMPurify from "dompurify";

export const formatAlamat = (value) => {
  const sanitizedValue = DOMPurify.sanitize(value);
  const formattedValue = sanitizedValue.trimStart();

  const allowedCharacters = formattedValue.replace(/[^a-zA-Z0-9\s,.\-\/]/g, "");

  return allowedCharacters;
};
