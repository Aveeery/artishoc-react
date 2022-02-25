// components/layout.js
import React from "react"
import Header from './layout/Header'


export default function Layout({children}: any) {

    return (
        <>
            <Header/>
            <main className={"main__container"}>{children}</main>
        </>
    )
}
