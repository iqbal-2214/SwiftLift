// /src/utils/formatters.js

// This function takes a raw string and formats it into the Indian number plate style.
// e.g., "jh01ab1234" becomes "JH 01 AB 1234"
export const formatNumberPlate = (value) => {
  // Convert to uppercase and remove all non-alphanumeric characters
  const cleanValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');

  // Apply the formatting logic
  const match = cleanValue.match(/^([A-Z]{2})?(\d{1,2})?([A-Z]{1,2})?(\d{1,4})?$/);

  if (!match) return cleanValue; // Return cleaned value if it doesn't match the pattern start

  const [, p1, p2, p3, p4] = match;

  // Build the formatted string part by part, adding spaces where appropriate
  let formatted = '';
  if (p1) formatted += p1;
  if (p2) formatted += ` ${p2}`;
  if (p3) formatted += ` ${p3}`;
  if (p4) formatted += ` ${p4}`;

  return formatted.trim();
};