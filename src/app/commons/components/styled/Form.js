import React from 'react'
import { RGX, MONTHS_SP } from '../../util/const'
import { onTextChange, fillNumberList, getMinDay, getMaxDay } from '../../util/func'

const _innerField = {
    value: '',
    focus: false,
    touched: false,
    alert: ''
}

const Form = ({ onSubmit, children, error }) => <form onSubmit={onSubmit}>
    {children}
    {error ? <div className="text-alert m-8">{'* ' + error}</div> : null}
</form>

const Group = ({ children }) => <div className="fm-group">{children}</div>

const FmGroup = ({ name, label, active = false, alert, textMuted, children, inline }) => <div
    className={'fm-group ' + (inline ? 'inline' : '')}>
    {children}
    <label htmlFor={name}
        className={'fm-label' + (active ? ' active' : '')}>
        {label}
    </label>
    {alert ? <div className="fm-error">{'* ' + alert}</div> : null}
    {textMuted ? <div className="text-muted">{textMuted}</div> : null}
</div>

const Input = ({ name, label, type = 'text', maxLength = 100, minLength = 0, upperCase, rgx = RGX.ALL, validateValue, value, onChange, required, inline }) => {
    const [field, setField] = React.useState({ ..._innerField, name: name, value: value })
    const setValue = newValue => setField({ ...field, value: newValue })
    const validateWholeField = () => {
        let updateField = { ...field, focus: false }
        if (required && (!field.value || !field.value.trim())) {
            return setField({ ...updateField, alert: 'El campo es requerido' })
        }
        if (field.value.length < Number(minLength)) {
            return setField({ ...updateField, alert: `El campo requiere ${minLength} caracteres` })
        }
        if (validateValue) {
            let validation = validateValue(field.value)
            if (validation.error) return setField({ ...updateField, alert: validation.msg })
        }
        return onChange(field)
    }
    React.useEffect(() => setField({ ...field, value: value }), [value])
    return <FmGroup name={name} label={label} active={field.focus || field.value} alert={field.alert} inline={inline}>
        <input id={name}
            name={name}
            type={type}
            value={field.value}
            maxLength={maxLength}
            minLength={minLength}
            className={'fm-input' + (field.alert ? ' wrong' : '')}
            onChange={e => onTextChange(e, rgx, setValue, upperCase)}
            onFocus={e => setField({ ...field, focus: true, touched: true, alert: '' })}
            onBlur={validateWholeField}
            required={required} />
    </FmGroup>
}

const TextArea = ({ name, label, rows = 1, value, maxLength = 100, minLength = 0, upperCase, rgx = RGX.ALL, onChange, validateValue, required }) => {
    const [field, setField] = React.useState({ ..._innerField, name: name, value: value })
    const setValue = newValue => setField({ ...field, value: newValue })
    const validateWholeField = () => {
        let updateField = { ...field, focus: false }
        if (!field.value || !field.value.trim()) {
            if (required) {
                return setField({ ...updateField, alert: 'El campo es requerido' })
            }
            return setField(updateField)
        }
        if (field.value.length < Number(minLength)) {
            return setField({ ...updateField, alert: `El campo requiere ${minLength} caracteres` })
        }
        if (validateValue) {
            let validation = validateValue(field.value)
            if (validation.error) return setField({ ...updateField, alert: validation.msg })
        }
        return onChange(field)
    }
    React.useEffect(() => setField({ ...field, value: value }), [value])
    return <FmGroup name={name} label={label} active={field.focus || field.value} alert={field.alert}>
        <textarea id={name}
            name={name}
            value={field.value}
            maxLength={maxLength}
            minLength={minLength}
            rows={rows}
            className={'fm-input' + (field.alert ? ' wrong' : '')}
            onChange={e => onTextChange(e, rgx, setValue, upperCase)}
            onFocus={e => setField({ ...field, focus: true, touched: true, alert: '' })}
            onBlur={validateWholeField}
            required={required} />
    </FmGroup>
}


const Select = ({ name, label, value, options, onChange, required, number, validateValue, flash, inline, disabled, size }) => {
    const [field, setField] = React.useState({ ..._innerField, name: name, value: value })
    const validateWholeField = () => {
        let updateField = { ...field, focus: false }
        if (required && (!field.value || !field.value.trim())) {
            return setField({ ...updateField, alert: 'El campo es requerido' })
        }
        if (validateValue) {
            let validation = validateValue(field.value)
            if (validation.error) return setField({ ...updateField, alert: validation.msg })
        }
        if (!flash) onChange({ ...field, value: number ? Number(field.value) : field.value })
    }
    const updateField = e => {
        setField({ ...field, value: e.target.value })
        if (flash) onChange({ ...field, value: number ? Number(e.target.value) : e.target.value })
    }
    React.useEffect(() => setField({ ...field, value: value }), [value])
    return <FmGroup name={name} label={label} active={true} alert={field.alert} inline={inline}>
        <select id={name}
            name={name}
            value={field.value}
            className={'fm-input' + (field.alert ? ' wrong' : '') + (disabled ? ' disabled' : '')}
            onChange={updateField}
            onFocus={e => setField({ ...field, focus: true, touched: true, alert: '' })}
            onBlur={validateWholeField}
            required={required}
            size={size}
            disabled={disabled}>
            {options.map((option, index) => {
                switch (typeof option) {
                    case 'object':
                        return <option key={index} value={option.id}>
                            {option.text}
                        </option>
                    case 'number':
                        return <option key={index} value={option}>
                            {option < 10 ? '0' + option : option}
                        </option>
                    default:
                        return <option key={index} value={index}>
                            {option}
                        </option>
                }
            })}
        </select>
    </FmGroup>
}

const SelectDiv = ({ name, label, value, options, required, inline, children }) => {
    const [show, setShow] = React.useState(false)
    const onClick = e => {
        e.preventDefault()
        setShow(true)
    }
    const onBlur = e => setShow(false)
    return <FmGroup name={name} label={label} active={true} alert={false} inline={inline}>
        <select id={name}
            name={name}
            value={value}
            className="fm-input select-div"
            onFocus={onClick}
            required={required}
            onBlur={onBlur}
            readOnly>
            {options.map((option, index) => <option key={index} value={option.id}>{option.text}</option>)}
        </select>
        {show ? <div className="select-list">{children}</div> : null}
    </FmGroup>
}

const CheckBox = ({ name, label, value, onChange }) => <div className="fm-group flex-center">
    <input type="checkbox" name={name} id={name} checked={value} onChange={onChange} />
    <label htmlFor={name} className="mr-auto">{label}</label>
</div>

const MultiGroup = ({ label, children }) => <Group>
    <span className="overlabel">{label}</span>
    <div className="fm-group flex-center">{children}</div>
</Group>

const DateSelect = ({ label, startDate, minDate, maxDate, handleChange }) => {
    const months = []
    const minDay = getMinDay(minDate, startDate);
    const maxDay = getMaxDay(maxDate, startDate);
    MONTHS_SP.forEach((month, index) => {
        if ((minDate.year !== startDate.year || index >= minDate.month) &&
            (maxDate.year !== startDate.year || index <= maxDate.month)) {
            months.push({ id: index, text: month })
        }
    });
    return <MultiGroup label={label}>
        <Form.Select name="year" value={startDate.year} label="Año"
            options={fillNumberList(minDate.year, maxDate.year)}
            onChange={handleChange} number flash inline />
        <Form.Select name="month" value={startDate.month} label="Mes"
            options={months}
            onChange={handleChange} number flash inline />
        <Form.Select name="day" value={startDate.day} label="Día"
            options={fillNumberList(minDay, maxDay)}
            onChange={handleChange} number flash inline />
    </MultiGroup>
}

const InputButton = ({ name, label, type = 'text', maxLength, minLength, upperCase, rgx = RGX.ALL, validateValue, value, onChange, required, onButtonClick }) => {
    return <MultiGroup>
        <Input name={name} label={label}
            type={type} maxLength={maxLength}
            minLength={minLength} upperCase={upperCase}
            rgx={rgx} validateValue={validateValue}
            value={value} required={required}
            onChange={onChange} inline />
        <span className="btn btn-primary set-right" onClick={e => onButtonClick()}>
            <i className="fas fa-plus" />
        </span>
    </MultiGroup>
}

Form.Group = Group
Form.Input = Input
Form.Select = Select
Form.TextArea = TextArea
Form.DateSelect = DateSelect
Form.InputButton = InputButton
Form.MultiGroup = MultiGroup
Form.CheckBox = CheckBox
Form.SelectDiv = SelectDiv

export default Form