import Color from 'color';

const fadeColor = (color: string, alpha: number): string => {
  const colorObj = Color(color);
  const red = colorObj.red();
  const green = colorObj.green();
  const blue = colorObj.blue();

  return `rgba(${red},${green},${blue},${alpha})`;
};

export default fadeColor;
