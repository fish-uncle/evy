const rule_list = {
  pageNum: {
    type: 'number',
  },
  pageSize: {
    type: 'number',
  },
  cn_title: {
    required: false,
    type: 'string',
  },
  en_title: {
    required: false,
    type: 'string',
  },
  description: {
    required: false,
    type: 'string',
  },
  timing: {
    required: false,
    type: 'number',
  },
  put: {
    required: false,
    type: 'number',
  }
};


module.exports = {rule_list};