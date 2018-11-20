import React, { Component } from 'react'
import classNames from 'classnames'
import Select from 'mk-rc-select/lib'

export default class SelectComponent extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            dataSource: []
        }
    }

    focusHandler = async () => {
        if (this.props.onLoadOption) {
            var ret = await this.props.onLoadOption()
            this.setState({ dataSource: (ret || []) })
        }
        this.props.onFocus && this.props.onFocus()
    }

    changeHandler = (v) => {
        var r = v || '', obj,
            idField = this.props.idField || 'id',
            displayField = this.props.displayField || 'name',
            value = this.props.value

        
        if (this.state.dataSource) {
            if (this.props.mode === 'multiple') {
                obj = []
                if (r instanceof Array) {
                    r.forEach(o => {
                        let hit = this.state.dataSource.find(x => x[idField] == o || x[displayField] == o)
                        if(!hit && value && value instanceof Array){
                            hit = value.find(x => x[idField] == o || x[displayField] == o)
                        }
                        if(hit && obj.findIndex(y=> y[idField] == hit[idField] ) == -1)
                            obj.push(hit)
                    })
                }
            }
            else {
                obj = this.state.dataSource.find(o => o[idField] == r)
            }
        }
        this.props.onChange && this.props.onChange(obj)
    }

    searchHandler = async (v) => {
        if (this.props.onLoadOption) {
            var ret = await this.props.onLoadOption(v)
            this.setState({ dataSource: (ret || []) })
        }
        this.props.onSearch && this.props.onSearch()
    }

    render() {
        let {
            className, notFoundContent, optionLabelProp,
            mode, combobox, tags, multiple, size,
            idField = 'id',
            codeField,
            displayField = 'name',
            ...other
        } = this.props

        let Icon = MK.getComponent('antd.Icon')

        className = classNames({
            'ant-select': true,
            [`ant-select-lg`]: size === 'large',
            [`ant-select-sm`]: size === 'small',
            [className]: !!className
        })

        const isCombobox = mode === 'combobox' || combobox

        notFoundContent = notFoundContent || '无匹配结果'

        if (isCombobox) {
            notFoundContent = null;
            // children 带 dom 结构时，无法填入输入框
            optionLabelProp = optionLabelProp || 'value'
        }

        const modeConfig = {
            multiple: mode === 'multiple' || multiple,
            tags: mode === 'tags' || tags,
            combobox: isCombobox,
        }

        let suffix = this.props.suffix
        if (this.props.suffix) {
            suffix = React.cloneElement(this.props.suffix, { style: { float: "right" } })
        }

        const inputIcon = (
            <Icon type="down" className={`ant-select-arrow-icon`} />
        );

        const removeIcon = (
            <Icon type="close" className={`ant-select-remove-icon`} />
        );

        var val
        if (mode === 'multiple' && this.props.value instanceof Array) {
            val = this.props.value.map(o => o[displayField])
        }
        else {
            val = (this.state.dataSource 
                && this.state.dataSource.length > 0 
                && this.props.value 
                && this.props.value[idField]) || (this.props.value && this.props.value[displayField])
        }

        return (
            <Select
                inputIcon={inputIcon}
                removeIcon={removeIcon}
                {...other}
                {...modeConfig}
                prefixCls='ant-select'
                className={className}
                optionLabelProp='title'
                filterOption={false}
                notFoundContent={notFoundContent}
                suffix={suffix}
                onFocus={this.focusHandler}
                //onBlur={this.blurHandler}
                onChange={this.changeHandler}
                onSearch={this.searchHandler}
                value={val}
            >
                {
                    this.state.dataSource.map(o => (
                        <Select.Option
                            key={o[idField]}
                            value={o[idField]}
                            title={o[displayField]}
                        >
                            {o[displayField]}
                        </Select.Option>
                    ))
                }

            </Select>
        )
    }
}