import React from 'react'
import Header from "../components/Header/header"
import Footer from "../components/Footer/footer"
import Nav from "../components/Nav/nav"

const Home = () => {
    return <div>
        <Header /> 
        <div className = "main-content">
            <Nav />
        </div>
        <Footer />
    </div>;
}

export default Home;