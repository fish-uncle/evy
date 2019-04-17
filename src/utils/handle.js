import {POST} from "./request";
import {notification} from "antd";

const insert = (props) => {
  const {sheet} = props;
  sheet.form.validateFields((err, values) => {
    if (!err) {
      try {
        POST(sheet.insertUrl, values);
        props.drawer_close();
        props.sheet_load();
        notification.success({message: '提示', description: '添加成功'});
      } catch (e) {
        notification.success({message: '提示', description: '添加失败'});
      }
    } else {
      for (let item in err) {
        notification.error({message: '提示', description: err[item].errors[0].message});
      }
    }
  })
};

const update = (props) => {
  const {sheet} = props;
  sheet.form.validateFields((err, values) => {
    if (!err) {
      try {
        POST(sheet.updateUrl, values);
        props.drawer_close();
        props.sheet_load();
        notification.success({message: '提示', description: '更新成功'});
      } catch (e) {
        notification.success({message: '提示', description: '更新失败'});
      }
    } else {
      for (let item in err) {
        notification.error({message: '提示', description: err[item].errors[0].message});
      }
    }
  })
};

const search = (props) => {
  const {sheet} = props;
  sheet.form.validateFields((err, values) => {
    if (!err) {
      try {
        props.sheet_search({values});
        props.drawer_close();
        props.sheet_load();
        notification.success({message: '提示', description: '搜索成功'});
      } catch (e) {
        notification.success({message: '提示', description: '搜索失败'});
      }
    } else {
      for (let item in err) {
        notification.error({message: '提示', description: err[item].errors[0].message});
      }
    }
  })
};

const clear = (props) => {
  props.sheet_search({values: {}});
  props.drawer_close();
  props.sheet_load();
  notification.success({message: '提示', description: '清空成功'});
};
export {insert, update, search, clear};