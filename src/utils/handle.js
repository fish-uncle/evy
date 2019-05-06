import {POST} from "./request";
import {notification} from "antd";

const validate = (props, values, callback) => {
  const {sheet} = props;
  const {validate} = sheet;
  let v = true;
  for (let i in validate) {
    let item = validate[i];
    let title = item.title;
    if (item.maxLength !== 0) {
      if ((values[title] + '').length >= item.maxLength) {
        notification.error({message: '提示', description: '请填写正确长度的' + item.label});
        v = false;
        break;
      }
    }
    if (item.pattern !== '') {
      if (item.pattern.test(values[title])) {
        notification.error({message: '提示', description: '请填写格式的' + item.label});
        v = false;
        break;
      }
    }
    if (item.required) {
      if (typeof values[title] !== 'boolean' && typeof values[title] !== 'number') {
        if (!values[title]) {
          notification.error({message: '提示', description: '请填写' + item.label});
          v = false;
          break;
        }
      }
    }
  }
  if (v) {
    callback()
  }
};
const insert = (props) => {
  const {sheet} = props;
  const {formatter, insertCallBack} = sheet;
  sheet.form.validateFields((err, values) => {
    const ajax = () => {
      try {
        values = formatter(values);
        POST(sheet.insertUrl, values).then(() => {
          props.drawer_close();
          props.sheet_load();
          notification.success({message: '提示', description: '添加成功'});
          insertCallBack();
        });
      } catch (e) {
        notification.error({message: '提示', description: '添加失败'});
      }
    };
    validate(props, values, ajax);
  })
};

const update = (props) => {
  const {sheet} = props;
  const {formatter, updateCallBack} = sheet;
  sheet.form.validateFields((err, values) => {
    const ajax = () => {
      try {
        values = formatter(values);
        POST(sheet.updateUrl, values).then(() => {
          props.drawer_close();
          props.sheet_load();
          notification.success({message: '提示', description: '更新成功'});
          updateCallBack();
        });
      } catch (e) {
        notification.error({message: '提示', description: '更新失败'});
      }
    };
    validate(props, values, ajax);
  })
};

const search = (props) => {
  const {sheet} = props;
  sheet.form.validateFields((err, values) => {
    try {
      let {page} = sheet;
      page.current = 1;
      props.sheet_search({values});
      props.drawer_close();
      props.sheet_page({page});
      notification.success({message: '提示', description: '搜索成功'});
    } catch (e) {
      notification.error({message: '提示', description: '搜索失败'});
    }
  })
};

const clear = (props) => {
  const {sheet} = props;
  let {page} = sheet;
  page.current = 1;
  props.sheet_search({values: {}});
  props.drawer_close();
  props.sheet_page({page});
  notification.success({message: '提示', description: '清空成功'});
};
export {insert, update, search, clear};