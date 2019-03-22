import React, {Component} from 'react';
import {Input, Select, Form, DatePicker, Switch} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {connect} from "dva";
import {SheetActions} from "../models";
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const {RangePicker} = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
@connect((sheet) => ({...sheet}), {...SheetActions})
export default class _Modal extends Component {
  constructor(props) {
    super(props);
    let {type = 'input', title, sheet, defaultValue = null} = props;
    const {detailData} = sheet;
    let value, editorState;

    if (type === 'switch') {
      value = detailData[title];
    } else if (type === 'date') {
      value = moment(detailData[title])
    } else if (type === 'editor') {
      const contentBlock = htmlToDraft(detailData[title]);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        editorState = EditorState.createWithContent(contentState);
        value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      }
    } else {
      value = detailData[title] || defaultValue
    }
    this.state = {
      value,
      editorState: editorState,
    };
  }

  normalizeHandle = (value) => {
    this.setState({value});
    return value
  };

  onEditorStateChange = (editorState) => {
    const editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    this.setState({
      editorState,
      value: editorContent
    });
  };

  render() {
    const {value} = this.state;
    let {type = 'input', title, label = '', sheet, required = true, maxLength = 0, pattern = '', select = {}, disabled = false, className, style} = this.props;
    const {getFieldDecorator} = sheet.form;
    let html = <Input disabled={disabled}/>,
      rules = {required: required, message: `请${type === 'select' ? '选择' : '输入'}` + label};
    maxLength ? rules = Object.assign({}, rules, {len: maxLength}) : void 0;
    pattern !== '' ? rules = Object.assign({}, rules, {pattern}) : void 0;
    type = type.toLowerCase();
    type === 'date' ? html = <DatePicker disabled={disabled}/> : void 0;
    type === 'rangedate' ? html = <RangePicker disabled={disabled}/> : void 0;
    type === 'textarea' ? html = <TextArea disabled={disabled}/> : void 0;
    type === 'switch' ? html = <Switch disabled={disabled}/> : void 0;

    let selectHtml = [];
    for (let item in select) {
      selectHtml.push(<Option key={item} value={select[item]}>{item}</Option>)
    }
    type === 'multiple' ? html = <Select disabled={disabled} mode="multiple">{selectHtml}</Select> : void 0;
    type === 'select' ? html = <Select disabled={disabled}>{selectHtml}</Select> : void 0;
    let options = {
      initialValue: value,
      rules: [rules],
      normalize: this.normalizeHandle
    };
    type === 'switch' ? options = Object.assign({}, options, {
      valuePropName: 'checked'
    }) : void 0;
    return (
      <FormItem label={label} className={className} style={style}>
        <div className={type === 'hidden' || type === 'editor' ? 'fn-hide' : ''}>
          {
            getFieldDecorator(title, options)(html)
          }
        </div>
        {
          type === 'editor' ? <Editor
            editorState={this.state.editorState}
            wrapperClassName="editor-wrapper"
            editorClassName="editor"
            onEditorStateChange={this.onEditorStateChange}
          /> : null
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
