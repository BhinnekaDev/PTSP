import DOMPurify from "dompurify";

export const formatEmail = (value) => {
  const sanitizedValue = DOMPurify.sanitize(value);
  const formattedValue = sanitizedValue.trim();

  const allowedCharacters = formattedValue.replace(/[^a-zA-Z0-9._%+-@]/g, "");

  return allowedCharacters;
};
