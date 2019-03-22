'use strict';
import React, {Fragment} from 'react';
import {Table, Row, Col, Button, Divider} from 'antd';
import {connect} from "dva";
import {LeftActions, RouterActions, SheetActions} from "../models";
import './Sheet.less';

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
        this.props.drawer_show({drawerType: 'search'});
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
    const {exportUrl} = sheet;
    location.href = exportUrl;
  };

  recoveryHandle = () => {
    const {sheet, left} = this.props;
    const {recoveryUrl} = sheet;
    const {breadcrumb} = left;
    this.props.push(recoveryUrl);
    this.props.left_choose({title: `${breadcrumb}-回收站`});
  };

  componentDidMount() {
    const {sheet} = this.props;
    const {page, listUrl} = sheet;
    this.props.sheet_load({page, listUrl});
  }

  render() {
    const {sheet, button = 'show'} = this.props;
    const {dataSource, loading, page, buttonEvent, columns, rowKey, exportUrl, recoveryUrl} = sheet;
    return (
      <Fragment>
        <Row className='fun-container'>
          <Col span={6} style={{paddingRight: '5px', height: '44px'}}>
            <Button icon="edit" type="primary" block onClick={this.insertHandle}
                    disabled={button === 'show' ? false : true}>新增</Button>
          </Col>
          <Col span={6} style={{padding: '0 5px'}}>
            <Button icon="search" type="primary" block
                    // disabled={button === 'show' ? false : true}
                    disabled={true}
                    onClick={this.searchHandle}>搜索</Button>
          </Col>
          <Col span={6} style={{padding: '0 5px'}}>
            <Button icon="bar-chart" type="primary" block
                    disabled={button === 'show' ? exportUrl ? false : true : true}
                    onClick={this.exportHandle}>导出</Button>
          </Col>
          <Col span={6} style={{paddingLeft: '5px'}}>
            <Button icon="delete" type="primary" block disabled={button === 'show' ? recoveryUrl ? false : true : true}
                    onClick={this.recoveryHandle}>回收站</Button>
          </Col>
        </Row>
        <Divider dashed={true}/>
        <Table rowKey={rowKey}
               loading={loading}
               pagination={{total: page.total, current: page.current}}
               onRow={(record) => {
                 return {
                   onClick: (event) => {
                     buttonEvent.detail(record, event)
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