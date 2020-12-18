import React from 'react'
import { HashRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Header from '..//components/Header'

test(`Renders header`, () => {
    const { getByText } = render(<Header>Header Test</Header>)
    const headerElem = getByText('Header Test')
    expect(headerElem).toBeInTheDocument()
    expect(headerElem).toHaveClass('navbar flex-center')
})

test(`Renders NavLogo`, () => {
    const { getByText } = render(<HashRouter>
        <Header.NavLogo href="/">NavLogo</Header.NavLogo>
    </HashRouter>)
    const headerElem = getByText('NavLogo')
    expect(headerElem).toBeInTheDocument()
    expect(headerElem).toHaveClass('nav-logo nav-link')
})