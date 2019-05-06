# File

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
|action|上传后响应地址|string|'/'||
|size|文本提醒大小|string|''||
|name|form 表单中的图片的 name 值|string|'file'||
|accept|接受文件类型|string|'.jpg,.png'||
|formData|额外需要添加的 form 表单值|object|{}||
|uploadCallBack|自定义上传事件|function|function(info){<br/>}|info.file.status分为<br/>done,uploading,error<br/>可用于判断状态|

## e.g.
```    
import {FormItem} from '../../components';
     
<FormItem label="文件示例" title='field_file' size='1M' type='file' action='/' name='file'/>
```
