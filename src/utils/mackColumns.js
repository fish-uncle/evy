const mackColumns = (arr) => {
  arr.map(item => {
    !item.render ? item.render = (value) => value[item.key] : void 0
  });
  return arr;
};
export default mackColumns;