import React from 'react'
import {
    Button,
    Row,
    Col,
    Card
} from 'react-bootstrap'

const DropCard = ({ title, variant, onDragStart, children }) => {
    const [showDetail, setShowDetail] = React.useState(false)
    return <Card border={variant}
        className="mb-2"
        draggable={onDragStart ? true : false}
        onDragStart={onDragStart}>
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

export default DropCard;