import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return <div className="container text-center">
        <div className="empty-img" />
        <h2 className="lighter">No encontramos lo solicitado...</h2>
        <Link to="/" className="btn btn-primary m-8">Inicio</Link>
    </div>;
}

export default Page404