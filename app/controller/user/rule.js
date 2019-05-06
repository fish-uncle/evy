const rule_list = {
  pageNum: {
    type: 'number',
  },
  pageSize: {
    type: 'number',
  },
  real_name: {
    required: false,
    type: 'string',
  },
  employee_id: {
    required: false,
    type: 'string',
  },
  phone: {
    required: false,
    type: 'number',
  },
  sex: {
    required: false,
    type: 'number',
  }
};

module.exports = {rule_list};