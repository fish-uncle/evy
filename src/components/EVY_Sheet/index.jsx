'use strict';
import React, {Fragment} from 'react';
import {Table, Row, Col, Button, Divider, Upload, notification} from 'antd';
import {connect} from "dva";
import {LeftActions, RouterActions, SheetActions} from "../../models";
import './index.less';

@connect((sheet, left) => ({...sheet, ...left}), {...SheetActions, ...RouterActions, ...LeftActions})
export default class Sheet extends React.Component {

  componentWillMount() {
    this.props.sheet_button_event({
      type: 'detail', // 自定义按钮 detail 事件
      callback: (record) => {
        this.props.drawer_show({detailData: record});
      }
    });
    this.props.sheet_button_event({
      type: 'insert', // 自定义按钮 insert 事件
      callback: _ => {
        this.props.drawer_show({drawerType: 'insert'});
      }
    });
    this.props.sheet_button_event({
      type: 'search', // 自定义按钮 search 事件
      callback: _ => {
        this.props.drawer_show({drawerType: 'search', detailData: this.props.sheet.search});
      }
    });
  }

  insertHandle = () => {
    const {sheet} = this.props;
    const {buttonEvent} = sheet;
    buttonEvent.insert()
  };

  searchHandle = () => {
    const {sheet} = this.props;
    const {buttonEvent} = sheet;
    buttonEvent.search()
  };

  exportHandle = () => {
    const {sheet} = this.props;
    const {exportUrl, search} = sheet;

    function http_builder_url(url, data) {
      if (typeof (url) == 'undefined' || url == null || url == '') {
        return '';
      }
      if (typeof (data) == 'undefined' || data == null || typeof (data) != 'object') {
        return '';
      }
      url += (url.indexOf("?") != -1) ? "" : "?";
      for (let k in data) {
        url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
      }
      return url;
    }

    location.href = http_builder_url(exportUrl, search);
  };

  pageChangeHandle = (page, pageSize) => {
    this.props.sheet_page({page: {current: page, total: pageSize}});
  };

  recoveryHandle = () => {
    const {sheet, left} = this.props;
    const {recoveryUrl} = sheet;
    const {breadcrumb} = left;
    this.props.push(recoveryUrl);
    this.props.left_choose({title: `${breadcrumb}-回收站`});
  };

  importHandle = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      notification.success({message: '提示', description: '上传成功'});
      const {sheet} = this.props;
      let {page} = sheet;
      page.current = 1;
      this.props.sheet_page({page});
    } else if (info.file.status === 'error') {
      notification.error({message: '提示', description: '上传失败'});
    }
  };

  componentDidMount() {
    this.props.sheet_load();
  }

  render() {
    const {
      button = 'show',
      hasAddBtn = true,
      hasSearchBtn = true,
      hasExportBtn = true,
      hasRecoveryBtn = true,
      hasImportBtn = false,
      defaultPageSize = 10,
      click = true
    } = this.props;
    const {sheet} = this.props;
    const {dataSource, loading, page, buttonEvent, columns, rowKey, exportUrl, recoveryUrl, importUrl, insertUrl} = sheet;
    let span = 8, buttonLength = 0;
    hasAddBtn ? buttonLength++ : void 0;
    hasSearchBtn ? buttonLength++ : void 0;
    hasExportBtn ? buttonLength++ : void 0;
    hasImportBtn ? buttonLength++ : void 0;
    hasRecoveryBtn ? buttonLength++ : void 0;
    buttonLength === 1 ? span = 24 : void 0;
    buttonLength === 2 ? span = 12 : void 0;
    buttonLength === 4 ? span = 6 : void 0;
    buttonLength === 5 ? span = 4 : void 0;
    return (
      <Fragment>
        <Row className='fun-container'>

          {
            hasAddBtn && <Col span={span} style={{paddingRight: '5px', height: '44px'}}>
              <Button icon="edit" type="primary" block onClick={this.insertHandle}
                      disabled={insertUrl === 'show' ? false : true}>新增</Button>
            </Col>
          }
          {
            hasSearchBtn && <Col span={span} style={{padding: '0 5px'}}>
              <Button icon="search" type="primary" block
                      disabled={button === 'show' ? false : true}
                      onClick={this.searchHandle}>搜索</Button>
            </Col>
          }
          {
            hasExportBtn && <Col span={span} style={{padding: '0 5px'}}>
              <Button icon="bar-chart" type="primary" block
                      disabled={exportUrl ? false : true}
                      onClick={this.exportHandle}>导出</Button>
            </Col>
          }
          {
            hasRecoveryBtn && <Col span={span} style={{paddingLeft: '5px'}}>
              <Button icon="delete" type="primary" block
                      disabled={recoveryUrl ? false : true}
                      onClick={this.recoveryHandle}>回收站</Button>
            </Col>
          }
          {
            hasImportBtn && <Col span={span} style={{padding: '0 5px'}}>
              <Upload accept=".xlsx,.xls,.csv"
                      name='file'
                      data={{type: 'excel'}}
                      action=''
                      showUploadList={false}
                      withCredentials={true}
                      onChange={this.importHandle}>
                <Button icon="file-excel" type="primary" block
                        disabled={button === 'show' ? importUrl ? false : true : true}
                        onClick={this.importHandle}>导入</Button>
              </Upload>
            </Col>
          }
        </Row>
        <Divider dashed={true}/>
        <Table rowKey={rowKey}
               loading={loading}
               pagination={{total: page.total, current: page.current, defaultPageSize, onChange: this.pageChangeHandle}}
               onRow={(record) => {
                 return {
                   onClick: (event) => {
                     click ? buttonEvent.detail(record, event) : void 0
                   },
                   onDoubleClick: (event) => {
                   },
                   onContextMenu: (event) => {
                   },
                   onMouseEnter: (event) => {
                   },  // 鼠标移入行
                   onMouseLeave: (event) => {
                   }
                 };
               }}
               columns={columns}
               dataSource={dataSource}/>
      </Fragment>
    )
  }
}