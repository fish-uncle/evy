const rule_list = {
  pageNum: {
    type: 'number',
  },
  pageSize: {
    type: 'number',
  },
  title: {
    required: false,
    type: 'string',
  },
  admin: {
    required: false,
    type: 'number',
  }
};


module.exports = {rule_list};