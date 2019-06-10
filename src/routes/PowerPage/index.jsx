import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body} from '../../components';
import {FormItem} from '../../components';
import {Form, Button, notification, Tree, Tabs, Transfer} from 'antd';
import request from "../../utils/request";
import './index.less';

const {TreeNode} = Tree;
const TabPane = Tabs.TabPane;

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
class PowerPage extends Component {

  state = {
    menuData: [],
    roleList: {},
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
    role: null,
    authData: [],
    targetKeys: [],
  };

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
    request.get('/api/role/all').then(data => {
      let roleList = {};
      data.list.map(item => {
        roleList[item.title] = item['role_id']
      });
      this.setState({roleList})
    });
    request.get('/api/power/all').then(data => {
      const list = this.ruleHandle(data.list);
      this.setState({
        menuData: list
      })
    });
    request.get('/api/auth/all').then(data => {
      let list = [];
      data.list.map(item => {
        list.push({key: item.auth_id, title: item.title})
      });
      this.setState({
        authData: list
      })
    });
  }

  ruleHandle = list => {
    let menu = {}, result = [];
    for (let i = 0; i < list.length; i++) {
      if (!list[i]['nexus']) {
        for (let j = 0; j < list.length; j++) {
          let obj = menu[list[i]['menu_id']] ? menu[list[i]['menu_id']] || list[i] : list[i];
          if (list[j]['nexus'] === list[i]['menu_id']) {
            if (obj.children) {
              obj.children.push(list[j]);
            } else {
              obj.children = [list[j]];
            }
          }
          j === list.length - 1 ? result.push(obj) : void 0;
          menu[list[i]['menu_id']] = obj;
        }
      }
    }
    return result;
  };

  selectHandle = () => {
    const {sheet} = this.props;
    sheet.form.validateFields((err, values) => {
      if (!err) {
        try {
          this.setState({
            role: values.role
          });
          request.post('/api/power/select/menu', values).then(data => {
            let checkedKeys = [];
            data.list.map(item => checkedKeys.push(item.menu_id || item.menu));
            this.setState({
              checkedKeys
            })
          });
          request.post('/api/power/select/auth', values).then(data => {
            let targetKeys = [];
            data.list.map(item => targetKeys.push(item.auth_id || item.auth));
            this.setState({
              targetKeys
            })
          });
        } catch (e) {
          notification.success({message: '提示', description: '选择失败'});
        }
      } else {
        for (let item in err) {
          notification.error({message: '提示', description: err[item].errors[0].message});
        }
      }
    })
  };

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.menu_id} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.title} key={item.menu_id}/>;
  });

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = (checkedKeys) => {
    this.setState({checkedKeys});
  };

  onSelect = (selectedKeys) => {
    this.setState({selectedKeys});
  };

  updateMenuHandle = () => {
    const {checkedKeys, role} = this.state;
    if (!role) {
      notification.error({message: '提示', description: '请先选择角色'});
      return false
    }
    request.post('/api/power/update/menu', {list: checkedKeys, role}).then(() => {
      notification.success({message: '提示', description: '更新成功'});
    });
  };

  updateAuthHandle = () => {
    const {role, targetKeys} = this.state;
    if (!role) {
      notification.error({message: '提示', description: '请先选择角色'});
      return false
    }
    request.post('/api/power/update/auth', {list: targetKeys, role}).then(() => {
      notification.success({message: '提示', description: '更新成功'});
    });
  };

  handleChange = (targetKeys) => {
    this.setState({targetKeys});
  };

  render() {
    const {roleList, menuData, authData, targetKeys} = this.state;
    return (
      <Body>
      <div className="fn-clear power-role-select">
        <FormItem className='fn-fl' label='选择角色' type='select' select={roleList} title='role' placeholder='请选择'/>
        <Button className='fn-fl' type='primary' onClick={this.selectHandle}>选择</Button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab='左侧栏权限设置'>
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(menuData)}
          </Tree>
          <Button type='primary' className='update-btn' onClick={this.updateMenuHandle}>更新</Button>
        </TabPane>
        <TabPane key="2" tab='页面内部权限设置'>
          <Transfer
            dataSource={authData}
            targetKeys={targetKeys}
            onChange={this.handleChange}
            render={item => <span>{item.title}</span>}
          />
          <Button type='primary' className='update-btn' onClick={this.updateAuthHandle}>更新</Button>
        </TabPane>
      </Tabs>
      </Body>
    );
  }
}

const FormApp = Form.create()(PowerPage);
export default FormApp;