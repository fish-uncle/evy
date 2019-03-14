'use strict';
import React, {Fragment} from 'react';
import {Table} from 'antd';
import moment from 'moment';
import SheetButton from './button.jsx';
import Search from './search.jsx';
import {connect} from "dva";
import {SheetActions} from "../../models";
import './index.less';
@connect((sheet) => ({...sheet}), {...SheetActions})
export default class Sheet extends React.Component {

  state = {
    page: {current: 1},
    total: 0,
    selected: [],
    loading: false,
    search: {},
    // button: this.props.button || [],
    button_0: null,
    sync: false
  };

  // componentWillReceiveProps = nextProps => {
  //   // this.setState({
  //   //   button: nextProps.button
  //   // }, this.load);
  // };

  componentDidMount() {
    const {sheet} = this.props;
    const {page, url} = sheet;
    this.props.sheet_load({page, url});
  }

  load = (options) => {
    let current;
    const {button_0, search} = this.state;
    const {sheet} = this.props;
    const {page, button} = sheet;
    if (options) {
      this.props.sheet_page(options);
      current = options.current;
    } else {
      current = page.current;
    }
    let parameter = {page: current};
    parameter = Object.assign({}, parameter, search);
    if (button_0) {
      // fetch.post(button_0['button_url'], parameter, ({data, success, total}) => {
      //   this.props.sheet_page({total});
      //   this.setState({
      //     dataSource: data,
      //     loading: false,
      //     selected: [], // 重新加载后，清除之前的选中项
      //   })
      // }, _ => {
      //   this.setState({
      //     loading: false,
      //   })
      // });
    } else {
      for (let i = 0; i < button.length; i++) {
        if (button[i]['button_type'] === 'read') {
          const button_0 = button[i];
          button.splice(i, 1);
          this.setState({
            loading: true,
            sync: true,
            button,
            button_0
          });
          // fetch.post(button_0['button_url'], parameter, ({data, success, total}) => {
          //   this.props.sheet_page({total});
          //   this.setState({
          //     dataSource: data,
          //     loading: false,
          //     selected: [], // 重新加载后，清除之前的选中项
          //   })
          // });
        }
      }
    }
  };

  componentWillMount() {
    const {columns = []} = this.props;
    columns.push({
      title: '更新时间',
      key: 'update_time',
      width: 160,
      render: text => (
        <span>{moment(text).format('YYYY-MM-DD hh:mm:ss')}</span>
      ),
    });
    columns.map(item => {
      if (item.searchType === 'select') {
        item['render'] = text => {
          return item['searchArray'].map(item => {
            return text == item[0] ? item[1] : void 0
          })
        }
      }
      item['dataIndex'] = item['key']
    });
  }

  onSelectChange = (selected) => {
    this.setState({selected});
  };

  reload = search => {
    this.setState({search}, _ => {
      this.load({current: 1});
    });
  };

  update = _ => {
    const {sheet} = this.props;
    const {page} = sheet;
    this.load(page.current);
  };

  render() {
    const {sheet, rowKey, columns} = this.props;
    const {dataSource, loading, page} = sheet;
    const {selected, button, sync} = this.state;
    const rowSelection = {
      selectedRowKeys: selected,
      type: 'radio',
      onChange: this.onSelectChange,
    };
    return (
      <Fragment>
        <Search columns={columns} reload={this.reload}/>
        <SheetButton button={button} selected={selected[0]} sync={sync} rowKey={rowKey} reload={this.reload}
                     update={this.update}/>
        <Table rowKey={rowKey}
               loading={loading}
               pagination={{total: page.total, current: page.current}}
          // onChange={this.load}
               rowSelection={rowSelection}
               columns={columns}
               dataSource={dataSource}/>
      </Fragment>
    )
  }
}