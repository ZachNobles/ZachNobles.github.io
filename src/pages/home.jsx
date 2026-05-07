import React from "react"
import Header from "../components/Header/header"
import Footer from "../components/Footer/footer"
import Nav from "../components/Nav/nav"
import Menu from "../components/Menu/menu"
import Background from "../components/Art/background"


const Home = () => {
    return <div>
        <Background />
        <Menu />
        <Header /> 
        <div className = "main-content">
        <Nav />
        </div>
        <Footer />
    </div>;
}

export default Home;