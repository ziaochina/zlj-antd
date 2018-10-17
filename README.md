
zlj-antd application for registering the ant-design component

## Usage
Your application can use antd components by add zlj-antd dependency.

1. Add dependency
```bash
$ maka add zlj-antd
```

2. Modify the view
```javascript
const view = {
    component: 'div',
    children: [{
        component: 'antd.Button',
        children: 'submit'
    }]
}
```

3. Modify the index.html
```html
<script>
    window.main = function (maka) {
        maka.load(['zlj-antd']).then(()=>{
            maka.render('yourApp','app')
        })
    }
<script>
```

## Download and run

1. Download
2. Decompress
3. Enter decompress directory
4. Run
```bash
$ yarn start
```

## License

MIT

