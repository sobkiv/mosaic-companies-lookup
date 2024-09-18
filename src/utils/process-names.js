export const processNames = (property) => {
  const propertyName = property.replace(/_/g, ' ');
  return propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
};
