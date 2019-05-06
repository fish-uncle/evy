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
  version: {
    required: false,
    type: 'string',
  },
  update: {
    required: false,
    type: 'number',
  }
};


module.exports = {rule_list};