import React from 'react'
import { Form, Row, Col, Card, Button } from 'react-bootstrap'
import { MONTHS_SP } from '../util/const'
import { fillNumberList, getMinDay, getMaxDay } from '../util/func'

const InputForm = ({ name, type, required, label, value, onChange }) =>
    <Form.Group controlId={name} as={Row}>
        <Form.Label column sm="2">{label}</Form.Label>
        <Col sm="10">
            <Form.Control
                name={name}
                type={type}
                value={value}
                onChange={e => onChange(e.target)}
                required={required} />
        </Col>
    </Form.Group>

const SelectForm = ({ name, label, value, options, onChange }) =>
    <Form.Group controlId={name}>
        {label ? <Form.Label>{label}</Form.Label> : null}
        <Form.Control as="select" name={name} value={value} onChange={e => onChange(e.target)}>
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
    </Form.Group>

const SelectFormH = ({ name, label, value, options, onChange }) =>
    <Form.Group controlId={name} as={Row}>
        <Form.Label column sm="2">{label}</Form.Label>
        <Col sm="10">
            <Form.Control as="select" name={name} value={value} onChange={e => onChange(e.target)}>
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
        </Col>
    </Form.Group>

const TextAreaForm = ({ name, required, label, rows, value, onChange }) =>
    <Form.Group controlId={name}>
        {label ? <Form.Label>{label}</Form.Label> : null}
        <Form.Control as="textarea" rows={rows} name={name}
            value={value} onChange={e => onChange(e.target)} required={required} />
    </Form.Group>

const DateSelect = ({ label, controlId, startDate, minDate, maxDate, handleChange }) => {
    const months = []
    const minDay = getMinDay(minDate, startDate);
    const maxDay = getMaxDay(maxDate, startDate);
    MONTHS_SP.forEach((month, index) => {
        if ((minDate.year !== startDate.year || index >= minDate.month) &&
            (maxDate.year !== startDate.year || index <= maxDate.month)) {
            months.push({ id: index, text: month })
        }
    });
    return <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Row>
            <Col sm="4">
                <SelectForm name="year" value={startDate.year}
                    options={fillNumberList(minDate.year, maxDate.year)}
                    onChange={handleChange} />
            </Col>
            <Col sm="4">
                <SelectForm name="month" value={startDate.month}
                    options={months} onChange={handleChange} />
            </Col>
            <Col sm="4">
                <SelectForm name="day" value={startDate.day}
                    options={fillNumberList(minDay, maxDay)}
                    onChange={handleChange} />
            </Col>
        </Row>
    </Form.Group>
}

const DropCard = ({ title, variant, onDragStart, children, expanded = false }) => {
    const [showDetail, setShowDetail] = React.useState(expanded)
    return <Card border={variant}
        className="mb-3 mt-3"
        draggable={onDragStart ? true : false}
        onDragStart={onDragStart}
        style={{ color: 'black' }}>
        <Card.Header>
            <Row>
                <Col><strong>{title}</strong></Col>
                <Col className="text-right">
                    <Button variant={variant} size="sm"
                        onClick={() => setShowDetail(!showDetail)}>
                        <i className="material-icons inline-icon">
                            {showDetail ? 'arrow_drop_up' : 'arrow_drop_down'}
                        </i>
                        <i className="material-icons inline-icon">assignment</i>
                    </Button>
                </Col>
            </Row>
        </Card.Header>
        {showDetail ? children : null}
    </Card>
}

export {
    SelectForm,
    SelectFormH,
    InputForm,
    TextAreaForm,
    DropCard,
    DateSelect
}