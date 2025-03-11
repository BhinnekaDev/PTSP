import DOMPurify from "dompurify";

export const formatPendidikanTerakhir = (value) => {
  const sanitizedValue = DOMPurify.sanitize(value);

  const formattedValue = sanitizedValue.trim().toUpperCase();

  const regex = /^(S|S-|S-[123]?|D|D-|D-[1234]?|SD|SMP?|SMA?|SMK?)$/i;

  return regex.test(formattedValue)
    ? formattedValue
    : formattedValue.slice(0, -1);
};
