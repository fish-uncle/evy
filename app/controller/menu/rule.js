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
  url: {
    required: false,
    type: 'string',
  },
  type: {
    required: false,
    type: 'number',
  }
};


module.exports = {rule_list};