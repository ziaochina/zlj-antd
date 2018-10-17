import { actionMixin, registerComponent } from 'maka'
import pkgJson from './package.json'
import * as components from './component'
import './style.less'

const name = pkgJson.name

registerComponent('antd', components)

const view = {
    component: 'div',
    style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 'auto',
        width: 300,
        height: 200
    },
    children: [{
        component: 'h1',
        children: 'ant design component'
    },{
        component: 'antd.Button',
        children: 'Button'
    },{
        component: 'antd.Input'
    },{
        component: 'antd.DatePicker'
    },{
        component: 'antd.Checkbox'
    }]
}

const state = { data: {} }

@actionMixin('base')
class action {}

export {
    name,
    view,
    state,
    action
}