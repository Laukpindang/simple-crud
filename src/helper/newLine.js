export const newLineText = (text = '') => {
  const newText = text
    .split('\n')
    .map((str, index) => <p key={index}>{str}</p>);
  return newText;
};
