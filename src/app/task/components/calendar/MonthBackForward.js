import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDate } from '../../actions/taskActions'
import { fragmentDate, goToTheTop } from '../../../util/func'
import { DATE_PROP_SHAPE } from '../../../util/const'

const MonthBackForward = ({ date, setDate }) => {
    const moveInMonths = nMonths => {
        goToTheTop()
        setDate(fragmentDate(new Date(date.year, Number(date.month) + nMonths, date.day)))
    }
    let style = { color: 'inherit', borderRadius: '0px' }
    return <div className="btn-group w100">
        <button className="w50 btn" style={style}
            onClick={() => moveInMonths(-1)}
            onDragEnter={() => setTimeout(() => moveInMonths(-1), 800)}>
            <i className="fas fa-chevron-circle-left" /> Mes anterior
            </button>
        <button className="w50 btn" style={style}
            onClick={() => moveInMonths(1)}
            onDragEnter={() => setTimeout(() => moveInMonths(1), 800)}>
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