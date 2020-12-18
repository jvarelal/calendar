import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDate } from '../../actions/taskActions'
import { fragmentDate, goToTheTop } from '../../../commons/util/func'
import { DATE_PROP_SHAPE } from '../../../commons/util/const'

const MonthBackForward = ({ date, setDate }) => {
    const goForward = () => setDate(fragmentDate(new Date(date.year, Number(date.month) + 1, date.day)))
    const goBack = () => setDate(fragmentDate(new Date(date.year, Number(date.month) - 1, date.day)))
    let style = { color: 'inherit', borderRadius: '0px' }
    React.useEffect(() => goToTheTop(), [date])
    return <div className="btn-group w100">
        <button className="w50 btn"
            style={style}
            onClick={goBack}
            onDragEnter={() => setTimeout(goBack, 800)}>
            <i className="fas fa-chevron-circle-left" /> Mes anterior
            </button>
        <button className="w50 btn"
            style={style}
            onClick={goForward}
            onDragEnter={() => setTimeout(goForward, 800)}>
            Mes siguiente <i className="fas fa-chevron-circle-right" />
        </button>
    </div>
}

MonthBackForward.propTypes = {
    date: DATE_PROP_SHAPE.isRequired,
    setDate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ date: state.task.date })

export default connect(mapStateToProps, { setDate })(MonthBackForward)