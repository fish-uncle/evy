# Cascader

## 基础API
| 参数 | 含义 | 类型 | 默认值 | 备注 |
| --------- | --------- | --------- | --------- | --------- |
|label|菜单标题|string|''||
|title|字段名|string|''||
|placeholder|提示词|string|''||
|type|FormItem组件类型|string|'input'||
|style|style样式|object|{}||
|className|自定义class|string|''||
|disabled|是否可编辑|boolean|false||
|defaultValue|默认值|string,object,number,boolean,array|null||
|required|是否为必填值|boolean|true||
|maxLength|最长长度|number|0|0为不做限制|
|pattern|正则匹配值的有效性|regex|''||

## 该类型特殊API
| 参数 | 含义 | 类型 | 默认值 | 备注 |
| --------- | --------- | --------- | --------- | --------- |
|options|级联可选值配置|array|[]||

## e.g.
```   
const cityList = [{
  "label": "内蒙古",
  "value": "内蒙古自治区",
  "children": [{
    "label": "呼和浩特",
    "value": "呼和浩特市",
    "children": [{"label": "赛罕区", "value": "赛罕区",}, {
      "label": "玉泉区",
      "value": "玉泉区",
    }, {"label": "武川县", "value": "武川县",}, {
      "label": "托克托县",
      "value": "托克托县",
    }, {"label": "土默特左旗", "value": "土默特左旗",}, {
      "label": "新城区",
      "value": "新城区",
    }, {"label": "回民区", "value": "回民区",}, {
      "label": "和林格尔县",
      "value": "和林格尔县",
    }, {"label": "清水河县", "value": "清水河县",}]
  }]
}]    
<FormItem label="级联示例" title='field_cascader' type='cascader' options={cityList}/>
```
