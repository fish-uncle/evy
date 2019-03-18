'use strict';
import React, {Fragment} from 'react';
import {Table, Row, Col, Button,Divider} from 'antd';
import {connect} from "dva";
import {SheetActions} from "../models";
import './Sheet.less';

@connect((sheet) => ({...sheet}), {...SheetActions})
export default class Sheet extends React.Component {

  componentDidMount() {
    const {sheet} = this.props;
    const {page, url} = sheet;
    this.props.sheet_load({page, url});
  }

  render() {
    const {sheet, rowKey} = this.props;
    const {dataSource, loading, page, buttonEvent, columns} = sheet;
    return (
      <Fragment>
        <div>
          <Row>
            <Col span={8}><Button type="primary" block>新增</Button></Col>
            <Col span={8} style={{padding: '0 10px'}}><Button type="primary" block>搜索</Button></Col>
            <Col span={8}><Button type="primary" block>回收站</Button></Col>
          </Row>
        </div>
        <Divider dashed={true}/>
        {/*<Search reload={this.reload}/>*/}
        {/*<SheetButton rowKey={rowKey} reload={this.reload}
                     update={this.update}/>*/}
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