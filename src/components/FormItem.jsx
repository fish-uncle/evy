import React, {Component} from 'react';
import {Input, Select, Form, DatePicker, Switch, Upload, Button, Cascader} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {connect} from "dva";
import {SheetActions} from "../models";
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {ChromePicker} from 'react-color';

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
      if (detailData[title]) {
        const contentBlock = htmlToDraft(detailData[title]);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        editorState = EditorState.createWithContent(contentState);
        value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      } else {
        const contentState = ContentState.createFromText('');
        editorState = EditorState.createWithContent(contentState);
        value = '';
      }
    } else {
      value = detailData[title] || defaultValue
    }
    this.state = {
      value,
      editorState: editorState,
      displayColorPicker: false,
    };
  }

  handleClickColorPicker = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker})
  };

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

  cascaderChange = value => {
    this.setState({
      value
    });
  };

  colorChangeHandel = (color) => {
    const value = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    this.setState({value})
  };

  uploadHandle = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }

    // todo 上传后修改数据 需要与后端联调
    // this.setState({
    //   value: ''
    // })

  };

  render() {
    const {value, displayColorPicker} = this.state;
    let {
      type = 'input',
      title,
      label = '',
      sheet,
      required = true,
      maxLength = 0,
      pattern = '',
      options = {},  // type = cascader 专有
      select = {},  // type = select 专有
      disabled = false,
      className,
      placeholder = '',
      style,
      size = '200*200', // type = img,file 专有
      action = '/', // type = img,file 专有
      name = 'file', // type = img,file 专有
      accept = ".jpg,.png" // type = img,file 专有
    } = this.props;
    const {getFieldDecorator} = sheet.form;
    let html = <Input disabled={disabled} placeholder={placeholder}/>,
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
    type === 'select' ? html = <Select placeholder={placeholder} disabled={disabled}>{selectHtml}</Select> : void 0;
    let _options = {
      initialValue: value,
      rules: [rules],
      normalize: this.normalizeHandle
    };
    type === 'switch' ? _options = Object.assign({}, _options, {
      valuePropName: 'checked'
    }) : void 0;
    return (
      type === 'img' || type === 'file' ? <div className='upload-container'>
          <FormItem label={label} className={className} style={style}>
            <img src={value} alt=""/>
            <p>建议 {size}</p>
            <Upload accept={accept}
                    name={name}
                    action={action}
                    showUploadList={false}
                    withCredentials={true}
                    onChange={this.uploadHandle}>
              <Button
                type='primary'>更换</Button></Upload>
            <div className='fn-hide'>
              {
                getFieldDecorator(title, _options)(html)
              }
            </div>
          </FormItem></div> :
        type === 'color' ?
          <FormItem label={label} className={className} style={style}>
            <div className={`color-picker-container pos-r ${displayColorPicker ? 'active' : ''}`}>
              <div className="color-picker-current" style={{background: value || '#000'}}
                   onClick={this.handleClickColorPicker}/>
              <div className="color-picker pos-a z-index-9">
                {displayColorPicker ? <ChromePicker color={value || '#000'} onChange={this.colorChangeHandel}/> : null}
              </div>
            </div>

            <div className='fn-hide'>
              {
                getFieldDecorator(title, _options)(html)
              }
            </div>
          </FormItem>
          : type === 'cascader' ?
          <FormItem label={label} className={className} style={style}>
            <Cascader options={options} placeholder={placeholder} onChange={this.cascaderChange} value={value}/>
            <div className='fn-hide'>
              {
                getFieldDecorator(title, _options)(html)
              }
            </div>
          </FormItem>
          : <FormItem label={label} className={className} style={style}>
            <div className={type === 'hidden' || type === 'editor' ? 'fn-hide' : ''}>
              {
                getFieldDecorator(title, _options)(html)
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
