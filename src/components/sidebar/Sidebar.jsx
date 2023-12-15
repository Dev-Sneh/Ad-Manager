import { border } from "@mui/system";
import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Ads_Template from "../../Pages/Ads_Template";
import Dashboard from "../../Pages/Dashboard";
import ProfilePage from "../../Pages/Profile";
import Services from "../../Pages/Services";
import Wallet from "../../Pages/Wallet";

import "./Sidebar.css";

function Sidebar() {
    const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
    const navigate = useNavigate();

    const handleLogout = () => {

        navigate('/');
        window.location.reload(true);
    };
    const [style, setStyle] = useState(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    );

    const changeStyle = () => {
        if (
            style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        ) {
            setStyle(
                "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
            );
        } else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    };
    const changeStyle1 = () => {
        if (
            style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        ) {
            setStyle(
                "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
            );
        } else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    };

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };

    return (
        <div>
            <div id="page-top">
                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/*  <!-- Sidebar --> */}
                    <ul className={style} id="accordionSidebar">
                        {/*  <!-- Sidebar - Brand --> */}
                        <a
                            className="sidebar-brand d-flex align-items-center justify-content-center"

                        >
                            {/* <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div> */}
                            <div className="sidebar-brand-text mx-3">AD-Manager</div>
                            <div className="text-center d-none d-md-inline">
                                <button
                                    className="rounded-circle border-0"
                                    id="sidebarToggle"
                                    onClick={changeStyle}
                                ></button>
                            </div>
                        </a>

                        {/*   <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/*  <!-- Nav Item - Dashboard --> */}

                        <li className="nav-item" style={{ marginTop: "20px" }}>
                            <a
                                className="nav-link"
                                onClick={() => handleMenuItemClick("Dashboard")}
                            >
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>

                        {/* <!-- Heading --> */}
                        <div className="sidebar-heading" >User Services
                        </div>
                        {/* <!-- Nav Item - Charts --> */}
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                onClick={() => handleMenuItemClick("Wallet")}
                            >
                                <i className="fas fa-wallet"></i>
                                <span>Wallet</span>
                            </a>
                        </li>

                        {/*  <!-- Nav Item - Tables --> */}
                        <li className="nav-item" style={{}}>
                            <a style={{ marginBottom: "40px" }}
                                className="nav-link"
                                onClick={() => handleMenuItemClick("Ads-Templates")}
                            >
                                <i className="fas fa-fw fa-table"></i>
                                <span>Ads templates</span>
                            </a>
                        </li>

                        {/* <!-- Divider --> */}
                        {/* <hr className="sidebar-divider d-none d-md-block" /> */}
                    </ul>

                    <div id="content-wrapper" className="d-flex flex-column">
                        {/*  <!-- Main Content --> */}
                        <div id="content">
                            <div id="content-wrapper" className="d-flex flex-column">
                                {/*  <!-- Topbar --> */}
                                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                    {/*  <!-- Sidebar Toggle (Topbar) --> */}
                                    <button
                                        id="sidebarToggleTop"
                                        className="btn btn-link d-md-none rounded-circle mr-3"
                                        onClick={changeStyle1}
                                    >
                                        <i className="fa fa-bars"></i>
                                    </button>

                                    {/*  <!-- Topbar Search --> */}
                                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0 small"
                                                placeholder="Search for..."
                                                aria-label="Search"
                                                aria-describedby="basic-addon2"
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="button">
                                                    <i className="fas fa-search fa-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    {/*  <!-- Topbar Navbar --> */}
                                    <ul className="navbar-nav ml-auto">
                                        {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                                        <li className="nav-item dropdown no-arrow d-sm-none">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                id="searchDropdown"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="fas fa-search fa-fw"></i>
                                            </a>
                                            {/*   <!-- Dropdown - Messages --> */}
                                            <div
                                                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                                aria-labelledby="searchDropdown"
                                            >
                                                <form className="form-inline mr-auto w-100 navbar-search">
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control bg-light border-0 small"
                                                            placeholder="Search for..."
                                                            aria-label="Search"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-primary" type="button">
                                                                <i className="fas fa-search fa-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>

                                        <div className="topbar-divider d-none d-sm-block"></div>

                                        {/* <!-- Nav Item - User Information --> */}
                                        <li className="nav-item dropdown no-arrow">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                id="userDropdown"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                {/* <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                                    Douglas McGee
                                                </span> */}
                                                <img
                                                    className="img-profile rounded-circle"
                                                    src="img/undraw_profile.svg"
                                                />
                                            </a>

                                            {/*  <!-- Dropdown - User Information --> */}
                                            <div
                                                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="userDropdown"
                                            >
                                                <Link
                                                    to="/userdashboard/profile"
                                                    id="userDropdown"
                                                    role="button"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <a className="dropdown-item" href="#">
                                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                                        Profile
                                                    </a>
                                                </Link>
                                                {/* <a className="dropdown-item" href="#">
                                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Settings
                                            </a> */}
                                                <a className="dropdown-item" href="#">
                                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Activity Log
                                                </a>
                                                <div className="dropdown-divider"></div>
                                                <a
                                                    className="dropdown-item"

                                                    data-toggle="modal"
                                                    data-target="#logoutModal"
                                                >
                                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Logout
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                                {/* <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/wallet" component={WalletPage} />
                            </Switch> */}

                                {/*  <!-- End of Topbar --> */}
                                <div id="content">
                                    {activeMenuItem === "Wallet" && <Wallet />}
                                    {activeMenuItem === "Dashboard" && <Services />}
                                    {activeMenuItem === "Ads-Templates" && <Ads_Template />}

                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  <!-- Logout Modal--> */}
                    <div
                        className="modal fade"
                        id="logoutModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Ready to Leave?
                                    </h5>
                                    <button
                                        className="close"
                                        type="button"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                   Are you Sure you want Logout?
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        data-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
