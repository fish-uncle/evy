'use strict';
import React, {Fragment} from 'react';
import {Button, DatePicker, Input, Select} from 'antd';
import './search.less';
import {connect} from "dva";
import {SearchActions} from "../../models";

const {RangePicker} = DatePicker;
const Option = Select.Option;
@connect((search) => ({...search}), {...SearchActions})
export default class Search extends React.Component {

  componentWillMount() {
    let obj = {};
    const {columns} = this.props;
    columns.map(item => {
      if (item.searchType) {
        obj[item.key] = '';
      }
    });
    obj['update_time'] = [];
    this.setState({
      search: obj
    });
  }

  inputHandle = (e, key) => {
    const {search} = this.state;
    search[key] = e.target.value;
    this.setState({search});
  };

  selectHandle = (value, key) => {
    const {search} = this.state;
    search[key] = value;
    this.setState({search});
  };

  dateHandel = value => {
    let date = [];
    const {search} = this.state;
    if (value.length > 0) {
      date[0] = value[0].toString();
      date[1] = value[1].toString();
    }
    search['update_time'] = date;
    this.setState({search});
  };

  searchRender() {
    const {columns, search} = this.props;
    const {collapsed} = search;
    let result = [];
    columns.map((item, index) => {
      let html = null;
      switch (item.searchType) {
        case 'input':
          html = <Input placeholder={item.title} onChange={e => {
            this.inputHandle(e, item.key)
          }}/>;
          break;
        case 'select':
          html = <Select placeholder={item.title} onChange={value => {
            this.selectHandle(value, item.key)

          }}>
            <Option value={null}>全部</Option>
            {
              item.searchArray.map((item, index) => {
                return (
                  <Option value={item[0]} key={index}>{item[1]}</Option>
                )
              })
            }
          </Select>;
          break;
      }
      if (html) {
        result.push(<div className={`fn-fl sheet-search ${collapsed ? 'active' : ''}`} key={index}>{html}</div>)
      }
    });
    return result;
  }

  realSearch = _ => {
    const {reload} = this.props;
    const {search} = this.state;
    let s = {};
    for (let item in search) {
      if (typeof search[item] === 'string') {
        if (search[item] !== '') {
          s[item] = search[item]
        }
      }
      if (typeof search[item] === 'number') {
        s[item] = search[item]
      }
      if (search[item]) {
        if (search[item].constructor === Array) {
          if (search[item].length > 0) {
            s[item] = search[item]
          }
        }
      }
    }
    reload(s);
  };

  searchHandle = e => {
    const {search} = this.props;
    const {collapsed} = search;
    if (collapsed) {
      this.realSearch()
    } else {
      this.props.search_toggle();
    }
  };

  render() {
    const {search} = this.props;
    const {collapsed} = search;
    return (
      <Fragment>
        <div className='sheet-search-box fn-clear'>
          {this.searchRender()}
          <div className={`fn-fl sheet-search ${collapsed ? 'active' : ''}`}><RangePicker onChange={value => {
            this.dateHandel(value)
          }}/></div>
          <div className={`fn-fl sheet-search-btn ${collapsed ? '' : 'active'}`}>
            <Button type="primary" icon="search"
                    onClick={this.searchHandle}>搜索</Button>
          </div>
          <div className={`fn-fl sheet-search-close ${collapsed ? '' : 'fn-hide'}`} onClick={_ => {
            this.props.search_toggle();
          }}>收起
          </div>
        </div>
      </Fragment>
    )
  }

}