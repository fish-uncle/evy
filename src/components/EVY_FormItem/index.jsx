import React, {Component} from 'react';
import {
  Input,
  Select,
  Form,
  DatePicker,
  Switch,
  Upload,
  Button,
  Cascader,
  notification,
  Empty,
  InputNumber
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {connect} from "dva";
import {SheetActions} from "../../models";
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {ChromePicker} from 'react-color';
import './index.less';

const {RangePicker} = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TextArea = Input.TextArea;

@connect((sheet) => ({...sheet}), {...SheetActions})
export default class _FormItem extends Component {
  constructor(props) {
    super(props);
    let {type = 'input', title, sheet, defaultValue = null} = props;
    const {detailData} = sheet;
    let value, editorState, _version;
    if (type === 'switch') {
      value = detailData[title];
    } else if (type === 'date') {
      value = detailData[title] ? moment(detailData[title]) : null
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
    } else if (type === 'multiple') {
      !value ? value = [] : void 0;
    } else if (type === 'version') {
      value = detailData[title] || defaultValue;
      _version = value ? value.split('.') : [0, 0, 0]
    } else {
      value = typeof detailData[title] === 'number' || typeof detailData[title] === 'boolean' ? detailData[title] : detailData[title] || defaultValue
    }
    this.state = {
      value,
      _version: _version,
      _editorState: editorState,
      _displayColorPicker: false,
    };
  }

  handleClickColorPicker = () => {
    this.setState({_displayColorPicker: !this.state._displayColorPicker})
  };

  normalizeHandle = (value) => {
    this.setState({value});
    return value
  };

  onEditorStateChange = (_editorState) => {
    const editorContent = draftToHtml(convertToRaw(this.state._editorState.getCurrentContent()));
    this.setState({
      _editorState,
      value: editorContent
    });
  };

  cascaderChange = value => {
    this.setState({
      value
    });
  };

  versionChange = (data, index) => {
    const {_version} = this.state;
    _version[index] = data;
    const value = _version.join('.');
    this.setState({
      value
    })
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
      notification.success({message: '提示', description: '上传成功'});

      // todo 上传后修改数据
      // this.setState({
      //   value: ''
      // })
    } else if (info.file.status === 'error') {
      notification.error({message: '提示', description: '上传失败'});
    }
  };

  componentDidMount() {
    const {required = true, maxLength = 0, pattern = '', title, label} = this.props;
    let obj = {};
    obj[title] = {maxLength, required, title, pattern, label};
    this.props.set_validate({
      validate: obj
    })
  }

  render() {
    const {value, _displayColorPicker, _editorState, _version} = this.state;
    const {sheet} = this.props;
    const {getFieldDecorator} = sheet.form;
    let selectHtml = [];
    let {
      type = 'input',
      title,
      label = '',
      showTime = {format: 'HH:mm:ss'}, // type = date 专有
      options = [],  // type = cascader 专有
      select = {},  // type = select 专有
      disabled = false,
      className,
      placeholder = '',
      uploadCallBack = this.uploadHandle,
      style,
      formData = {}, // type = img,file 专有
      size = '', // type = img,file 专有
      action = '/', // type = img,file 专有
      name = 'file', // type = img,file 专有
      accept = ".jpg,.png" // type = img,file 专有
    } = this.props;
    let html = <Input disabled={disabled} placeholder={placeholder}/>;
    type = type.toLowerCase();
    for (let item in select) {
      selectHtml.push(<Option key={item} value={select[item]}>{item}</Option>)
    }
    let _options = {
      initialValue: value,
      rules: [{required: false}],
      normalize: this.normalizeHandle
    };
    switch (type) {
      case 'date':
        html = <DatePicker disabled={disabled} showTime={showTime}/>;
        break;
      case 'rangedate':
        html = <RangePicker disabled={disabled}/>;
        break;
      case 'textarea':
        html = <TextArea placeholder={placeholder} disabled={disabled}/>;
        break;
      case 'switch':
        html = <Switch disabled={disabled}/>;
        _options = Object.assign({}, _options, {
          valuePropName: 'checked'
        });
        break;
      case 'multiple':
        html = <Select disabled={disabled} mode="multiple">{selectHtml}</Select>;
        break;
      case 'select':
        html = <Select placeholder={placeholder} disabled={disabled}>{selectHtml}</Select>;
        break;
    }
    return (
      type === 'img' || type === 'file' ? <div className='upload-container'>
          <FormItem label={label} className={className} style={style}>
            <img src={value ? value : Empty.PRESENTED_IMAGE_DEFAULT} alt=""/>
            {size !== '' ? <p>建议 {size}</p> : null}
            <Upload accept={accept}
                    name={name}
                    data={formData}
                    action={action}
                    showUploadList={false}
                    withCredentials={true}
                    onChange={uploadCallBack}>
              <Button
                type='primary'>更换</Button></Upload>
            <div className='fn-hide'>
              {
                getFieldDecorator(title, _options)(html)
              }
            </div>
          </FormItem>
        </div> :
        type === 'color' ?
          <FormItem label={label} className={className} style={style}>
            <div className={`color-picker-container pos-r ${_displayColorPicker ? 'active' : ''}`}>
              <div className="color-picker-current" style={{background: value || '#000'}}
                   onClick={this.handleClickColorPicker}/>
              <div className="color-picker pos-a z-index-9">
                {_displayColorPicker ? <ChromePicker color={value || '#000'} onChange={this.colorChangeHandel}/> : null}
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
          : type === 'editor' ? <FormItem label={label} className={className} style={style}>
              <div className='fn-hide'>
                {
                  getFieldDecorator(title, _options)(html)
                }
              </div>
              <Editor
                editorState={_editorState}
                wrapperClassName="editor-wrapper"
                editorClassName="editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </FormItem>
            : type === 'version' ? <FormItem label={label} className={`version-form ${className}`} style={style}>
              <div className='fn-hide'>
                {
                  getFieldDecorator(title, _options)(html)
                }
              </div>
              <InputNumber defaultValue={_version[0]} onChange={value => this.versionChange(value, 0)}/>
              <div className='version-span'>.</div>
              <InputNumber defaultValue={_version[1]} onChange={value => this.versionChange(value, 1)}/>
              <div className='version-span'>.</div>
              <InputNumber defaultValue={_version[2]} onChange={value => this.versionChange(value, 2)}/>
            </FormItem> : <FormItem label={label} className={className} style={style}>
              <div className={type === 'hidden' ? 'fn-hide' : ''}>
                {
                  getFieldDecorator(title, _options)(html)
                }
              </div>
            </FormItem>

    )
  }
}

_FormItem
  .propTypes = {
  label: PropTypes.string,
  key: PropTypes.string,
  maxLength: PropTypes.number,
};
