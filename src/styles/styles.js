export const getColor = ({ color = 'primaryColor', theme }) => {
  const colorOptions = Object.keys(theme);
  const themeColorKey = colorOptions.find(
    (colorOption) => colorOption === color,
  );
  return themeColorKey ? theme[themeColorKey] : color;
};

export const getFontWeight = ({ weight }) => weight || 700;

export const buildFontSize = ({ size }) => size && `font-size: ${size}`;

export const buildBackgroundImage = ({ image }) =>
  image && `background-image: url(${image})`;
