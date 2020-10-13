import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

const SelectText = ({ value = '', options = [], update = () => null, htmlProps = {}, edit = true }) => {
    const [innerVal, setInneVal] = useState(value);
    useEffect(() => update(innerVal))
    if (edit) {
        return <Form.Group controlId={htmlProps.id}>
            <Form.Label>{htmlProps.label}</Form.Label>
            <Form.Control as="select" value={innerVal} onChange={e => setInneVal(e.target.value)}>
                {options.map((option, index) => <option key={index} value={option.id}>{option.text}</option>)}
            </Form.Control>
        </Form.Group>
    }
    return <div>
        <div>{htmlProps.label}</div>
        <div>{options.find(option => option && option.id == value)}</div>
    </div>
}

export default SelectText;