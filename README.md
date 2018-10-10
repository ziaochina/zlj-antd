## 简介

zlj-antd应用，用于注册ant-design组件

## 使用方法
你的应用可以通过增加依赖zlj-antd,来使用antd组件

1. 增加依赖
```bash
$ maka add zlj-antd
```

2. 修改view
```javascript
const view = {
    component: 'div',
    children: [{
        component: 'antd.Button',
        children: 'submit'
    }]
}
```

3. 修改index.html
```html
<script>
    window.main = function (maka) {
        maka.load(['zlj-antd']).then(()=>{
            maka.render('yourApp','app')
        })
    }
<script>
```

## 下载运行

1. 下载
2. 解压
3. 进入解压目录
4. 运行
```bash
$ yarn start
```

## 协议

MIT

