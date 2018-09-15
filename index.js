import pkgJson from './package.json'
import { actionMixin, componentFactory } from 'mk-meta-engine'
import * as components from './component'
import './style.less'

//注册组件
Object.keys(components).forEach(key => {
    componentFactory.registerComponent(key, components[key])
})

const meta = {
    name: 'root',
    component: '::div',
    _visible: 'false'
}
const state = { data: {} }

@actionMixin()
class action { }

export default {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
    meta,
    state,
    action
}