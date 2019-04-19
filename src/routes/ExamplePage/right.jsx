import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Form, Button, notification} from 'antd';
import {label, nation} from '../../utils/select';
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../../utils/request';
import cityList from "../../utils/cityList";

@connect((sheet) => ({...sheet}), {...SheetActions})
class Right extends Component {

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
  }

  setHandle = (detailData) => {
    try {
      POST('/api/example/setting', detailData);
      this.props.sheet_load();
      this.props.drawer_close();
      notification.success({message: '提示', description: '设置成功'});
    } catch (e) {
      notification.success({message: '提示', description: '设置失败'});
    }
  };

  render() {
    const {sheet} = this.props;
    const {drawerType, search, detailData} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'insert' || drawerType === 'detail' ? <Fragment>
            <FormItem label="图片示例" title='field_img' type='img' action='/' size='200*200' name='img'/>
            <FormItem label="内容示例1" title='field_text'/>
            <FormItem label="内容示例2" title='field_content' type='textarea'/>
            <FormItem label="选择示例" title='field_select' type='select' select={nation}
                      defaultValue='汉族'/>
            <FormItem label="标签示例" title='field_multiple' type='multiple' select={label}
                      defaultValue={'精品'}/>
            <FormItem label="日期示例" title='field_date' type='date'/>
            <FormItem label="颜色示例" title='field_color' type='color'/>
            <FormItem label="富文本示例" title='field_editor' type='editor'/>
            <FormItem label="级联示例" title='field_cascader' type='cascader' options={cityList}/>
            <FormItem label="范围日期示例" title='field_rangeDate' type='rangedate'/>
            <FormItem label="开关示例" title='field_switch' type='switch'/>
            <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
            <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
            <FormItem title='id' type='hidden' required={false}/>
            <Button block onClick={() => this.setHandle(detailData)}>设置</Button>
          </Fragment> : null
        }
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="内容示例1" title='field_text' required={false} defaultValue={search.field_text}/>
            <FormItem label="选择示例" title='field_select' type='select' select={nation}
                      defaultValue={search.field_select}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Right);
export default FormApp;