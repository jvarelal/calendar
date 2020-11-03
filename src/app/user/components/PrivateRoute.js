import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (user.id)
                return <Component {...props}/>
            else{
                console.log('No se encontro user')
                return <Redirect to="/login" />
            }
        }}
    />
)

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)