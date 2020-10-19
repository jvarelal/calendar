import React from 'react'
import Form from 'react-bootstrap/Form'

const SelectForm = ({ name = '', label = null, value = '', options = [], onChange = () => null }) => {
    return <Form.Group controlId={name}>
        {label ? <Form.Label>{label}</Form.Label> : null}
        <SelectAlone name={name} value={value} options={options} onChange={onChange} />
    </Form.Group>
}

const SelectAlone = ({ name = '', value = '', options = [], onChange = () => null }) => {
    return <Form.Control as="select" name={name} value={value} onChange={e => onChange(e.target)}>
        {options.map((option, index) => {
            if (typeof option === 'object') {
                return <option key={index} value={option.id}>{option.text}</option>
            }
            if (typeof option === 'number') {
                return <option key={index} value={option}>{option < 10 ? '0' + option : option}</option>
            }
            return <option key={index} value={index}>{option}</option>
        })}
    </Form.Control>
}

const InputForm = ({ name = '', type = 'text', required = false, label = null, value = '', onChange = () => null }) => {
    return <Form.Group controlId={name}>
        {label ? <Form.Label>{label}</Form.Label> : null}
        <Form.Control name={name} type={type} value={value} onChange={e => onChange(e.target)} required={required} />
    </Form.Group>
}

const TextAreaForm = ({ name = '', required = false, label = null, rows = 1, value = '', onChange = () => null }) => {
    return <Form.Group controlId={name}>
        {label ? <Form.Label>{label}</Form.Label> : null}
        <Form.Control as="textarea" rows={rows} name={name}
            value={value} onChange={e => onChange(e.target)} required={required} />
    </Form.Group>
}

export { SelectForm, SelectAlone, InputForm, TextAreaForm }