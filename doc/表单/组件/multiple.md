# Multiple

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
|select|可选值配置|object|{}||

## e.g.
```     
import {FormItem} from '../../components';

const sex={'上新':1,'爆款':2,'精品':3,'置顶':4};    

<FormItem label="选择示例" title='field_select' type='multiple' select={sex} defaultValue={[1,2]}/>
```
