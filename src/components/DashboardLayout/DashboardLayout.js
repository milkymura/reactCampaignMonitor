import React, { useState } from 'react';
import cn from 'classnames';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';


function DashboardLayout(props) {
  const dispatch = useDispatch();
  const globalIsSidebarOpen = useSelector(state => state.isSidebarOpen)
  const { history, location, onLogout, menuItems, pageId } = props;

  const toggleSidebarVisibility = () => {
    dispatch({ 
      type: 'SET_SIDEBAR_VISIBILITY',
      payload: !globalIsSidebarOpen
    })
  }

  return (
    <div className={cn('adminPortal', {
      'adminPortal-sidebarOpen': globalIsSidebarOpen,
      [`adminPortal-page-${pageId}`]: pageId
    })}
    >
      <TopNav
        className="adminPortal_topnav"
        isSidebarOpen={globalIsSidebarOpen}
        handleToggleSidebar={toggleSidebarVisibility}
        onLogout={onLogout}
      />
      <Sidebar
        history={history}
        location={location}
        menu={menuItems}
        className={cn('adminPortal_sidebar', {
          'adminPortal_sidebar-open': globalIsSidebarOpen,
        })}
      />
      <div className="adminPortal_container">
        <div className="dbContainer">
          {props.children}
        </div>
      </div>
    </div>
  );
}


export default DashboardLayout;
