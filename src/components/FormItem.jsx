import React, {Component} from 'react';
import {Input, Select, Form, DatePicker} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {connect} from "dva";
import {DrawerActions} from "../models";

const Option = Select.Option;
const FormItem = Form.Item;
@connect((drawer) => ({...drawer}), {...DrawerActions})
export default class _Modal extends Component {

  render() {
    const {type = 'input', title, label = '', drawer, required = true, maxLength = 0, pattern = '', select = {}, disabled = false, defaultValue = null} = this.props;
    const {data, getFieldDecorator} = drawer;
    let html = <Input disabled={disabled}/>,
      rules = {required: required, message: `请${type === 'select' ? '选择' : '输入'}` + label};
    maxLength ? Object.assign({}, rules, {len: maxLength}) : void 0;
    pattern !== '' ? Object.assign({}, rules, {pattern}) : void 0;
    type === 'date' ? html = <DatePicker disabled={disabled}/> : void 0;
    let selectHtml = [];
    for (let item in select) {
      selectHtml.push(<Option key={item} value={select[item]}>{item}</Option>)
    }
    type === 'select' ? html = <Select disabled={disabled}>{selectHtml}</Select> : void 0;
    return (
      <FormItem label={label} className={type === 'hidden' ? 'fn-hide' : ''}>
        {
          getFieldDecorator(title, {
            initialValue: type === 'date' ? moment(data[title]) : data[title] || defaultValue,
            rules: [rules],
          })(html)
        }
      </FormItem>
    )
  }
}

_Modal.propTypes = {
  label: PropTypes.string,
  key: PropTypes.string,
  maxLength: PropTypes.number,
};
