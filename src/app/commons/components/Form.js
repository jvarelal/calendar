import React from 'react'
import { RGX, MONTHS_SP, KEYCODES } from '../../util/const'
import { onTextChange, fillNumberList, getMinDay, getMaxDay } from '../../util/func'

const _innerField = { value: '', focus: false, touched: false, alert: '' }

const ValidForm = React.createContext(() => null)

const Form = ({ onSubmit, children, outsideError }) => {
    const [check, setCheck] = React.useState({})
    const [error, setError] = React.useState(outsideError)
    const validForm = (name, valid) => setCheck({ ...check, [name]: valid })
    const handleSubmit = e => {
        e.preventDefault()
        try {
            for (const prop in validForm) {
                if (!validForm[prop]) {
                    throw new Error(`Favor de validar el campo ${prop}`)
                }
            }
        } catch (err) {
            return setError(err.message)
        }
        onSubmit()
    }
    React.useEffect(() => setError(outsideError), [outsideError])
    return <ValidForm.Provider value={validForm}>
        <form onSubmit={handleSubmit}>
            {children}
            {error ? <div className="text-alert m-8">{'* ' + error}</div> : null}
        </form>
    </ValidForm.Provider>
}

const Group = ({ inline, children }) => <div className={`fm-group ${inline ? 'inline' : ''}`}>{children}</div>

const FmGroup = ({ name, label, active = false, alert, textMuted, children, inline }) => <Group inline={inline}>
    {children}
    <label htmlFor={name}
        className={'fm-label' + (active ? ' active' : '')}>
        {label}
    </label>
    {alert ? <div className="fm-error">{'* ' + alert}</div> : null}
    {textMuted ? <div className="text-muted">{textMuted}</div> : null}
</Group>

const Input = ({ name, label, type = 'text', maxLength = 100, minLength = 0, upperCase, rgx = RGX.ALL,
    validateValue, value, onChange, required, inline, focus, rows = 1, onKeyDown, disabled }) => {
    const [field, setField] = React.useState({ ..._innerField, name: name, value: value })
    const validForm = React.useContext(ValidForm)
    const setValue = newValue => {
        let updateField = { ...field, value: newValue }
        let message = null
        try {
            if (required && (updateField.value === '' || updateField.value.trim() === ''))
                throw new Error('El campo es requerido')
            if (updateField.value.length < Number(minLength))
                throw new Error(`El campo requiere ${minLength} caracteres`)
            if (validateValue) {
                let validation = validateValue(updateField.value)
                if (validation.error) throw new Error(validation.msg)
            }
        } catch (err) {
            message = err.message
        }
        validForm(label, Boolean(message === null))
        setField({ ...updateField, alert: message })
        return onChange(updateField)
    }
    const onBlur = () => {
        let blurField = { ...field, focus: false }
        if (required && (blurField.value === '' || blurField.value.trim() === ''))
            blurField.alert = 'El campo es requerido'
        setField(blurField)
    }
    const inputRef = React.useRef(null)
    React.useEffect(() => {
        if (focus && !disabled) inputRef.current.focus()
    }, [focus, disabled])
    React.useEffect(() => setField({ ...field, value: value }), [value]) // eslint-disable-line react-hooks/exhaustive-deps
    if(disabled){
        return <FmGroup name={name} label={label} active inline={inline}>
            <label className="block ptb-5 plr-2 bb-gray"> {field.value}</label>
        </FmGroup>
    }
    return <FmGroup name={name} label={label} active={field.focus || field.value} alert={field.alert} inline={inline}>
        {type === 'textarea' ? <textarea id={name}
            name={name}
            value={field.value}
            maxLength={maxLength}
            minLength={minLength}
            rows={rows}
            className={'fm-input' + (field.alert ? ' wrong' : '')}
            onChange={e => onTextChange(e, rgx, setValue, upperCase)}
            onFocus={e => setField({ ...field, focus: true, touched: true, alert: '' })}
            onBlur={onBlur}
            required={required}
            ref={inputRef} /> :
            <input id={name}
                name={name}
                type={type}
                value={field.value}
                maxLength={maxLength}
                minLength={minLength}
                onKeyDown={onKeyDown}
                className={'fm-input' + (field.alert ? ' wrong' : '')}
                onChange={e => onTextChange(e, rgx, setValue, upperCase)}
                onFocus={e => setField({ ...field, focus: true, touched: true, alert: '' })}
                onBlur={onBlur}
                required={required}
                ref={inputRef} />}
    </FmGroup>
}

const Select = ({ name, label, value, options, onChange, required, number, validateValue, inline, disabled, size }) => {
    const [field, setField] = React.useState({ ..._innerField, name: name, value: value })
    const setValue = e => {
        let updateField = { ...field, value: number ? Number(e.target.value) : e.target.value }
        let message = null
        try {
            if (required && (updateField.value === '' || updateField.value.trim() === ''))
                throw new Error('El campo es requerido')
            if (validateValue) {
                let validation = validateValue(updateField.value)
                if (validation.error) throw new Error(validation.msg)
            }
        } catch (err) {
            message = err.message
        }
        setField({ ...updateField, alert: message })
        onChange(updateField)
    }
    const onBlur = () => {
        let blurField = { ...field, focus: false }
        if (required && (blurField.value === '' || blurField.value.trim() === ''))
            blurField.alert = 'El campo es requerido'
        setField(blurField)
    }
    React.useEffect(() => setField({ ...field, value: value }), [value]) // eslint-disable-line react-hooks/exhaustive-deps
    return <FmGroup name={name} label={label} active={true} alert={field.alert} inline={inline}>
        <select id={name}
            name={name}
            value={field.value}
            className={'fm-input' + (field.alert ? ' wrong' : '') + (disabled ? ' disabled' : '')}
            onChange={setValue}
            onFocus={e => setField({ ...field, focus: true, touched: true, alert: '' })}
            onBlur={onBlur}
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

const SelectDiv = ({ name, label, value, options, required, inline, onChange, children }) => {
    const [show, setShow] = React.useState(false)
    const onClick = e => {
        e.preventDefault()
        setShow(true)
    }
    const onBlur = e => setShow(false)
    const onKeyDown = e => {
        const index = options.map(option => option.id).indexOf(value)
        if (e.keyCode === KEYCODES.UP && index > 0) {
            onChange({ name: name, value: options[index - 1].id })
        }
        if (e.keyCode === KEYCODES.DOWN && index < options.length - 1) {
            onChange({ name: name, value: options[index + 1].id })
        }
        if (e.keyCode === KEYCODES.ENTER) {
            setShow(false)
        }
    }
    return <FmGroup name={name} label={label} active={true} alert={false} inline={inline}>
        <div tabIndex="0" onKeyDown={onKeyDown}>
            <select id={name}
                name={name}
                value={value}
                className="fm-input select-div"
                required={required}
                onBlur={onBlur}
                onFocus={onClick}
                readOnly>
                {options.map((option, index) => <option key={index}
                    value={option.id}>
                    {option.text}
                </option>)}
            </select>
        </div>
        {show ? <div className="select-list">{children}</div> : null}
    </FmGroup>
}

const CheckBox = ({ name, label, value, onChange }) => <div className="fm-group flex-center">
    <input type="checkbox" name={name} id={name} checked={value} onChange={onChange} />
    <label htmlFor={name} className="mr-auto">{label}</label>
</div>

const MultiGroup = ({ label, children }) => <Group>
    <span className="overlabel f-left">{label}</span>
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
            onChange={handleChange} number inline />
        <Form.Select name="month" value={startDate.month} label="Mes"
            options={months}
            onChange={handleChange} number inline />
        <Form.Select name="day" value={startDate.day} label="Día"
            options={fillNumberList(minDay, maxDay)}
            onChange={handleChange} number inline />
    </MultiGroup>
}

const InputButton = ({ name, label, type = 'text', maxLength, minLength, upperCase, rgx = RGX.ALL, focus,
    validateValue, value, onChange, required, textButton, onButtonClick, blockButton }) => {
    const onKeyDown = (e) => {
        if (e.keyCode === KEYCODES.ENTER) {
            e.preventDefault()
            onButtonClick()
        }
    }
    return <MultiGroup>
        <Input name={name} label={label}
            type={type} maxLength={maxLength}
            minLength={minLength} upperCase={upperCase}
            rgx={rgx} validateValue={validateValue}
            value={value} required={required} onKeyDown={onKeyDown}
            focus={focus}
            onChange={onChange} inline />
        <span className={`btn btn-primary set-right ${blockButton ? 'forbidden' : ''}`}
            style={{height: '84%'}}
            onClick={blockButton ? null : e => onButtonClick()}>
            {textButton}
        </span>
    </MultiGroup>
}

const DropdownMenu = ({ text, children }) => {
    const [show, setShow] = React.useState(false)
    return <Group>
        <button className="btn btn-primary w100 block"
            onClick={() => setShow(!show)}
            onBlur={() => setTimeout(() => setShow(false), 300)}>
            {text}
        </button>
        {show ? <div className="select-list white">{children}</div> : null}
    </Group>
}

Form.Group = Group
Form.FmGroup = FmGroup
Form.Input = Input
Form.Select = Select
Form.DateSelect = DateSelect
Form.InputButton = InputButton
Form.MultiGroup = MultiGroup
Form.CheckBox = CheckBox
Form.SelectDiv = SelectDiv
Form.DropdownMenu = DropdownMenu

export default Form