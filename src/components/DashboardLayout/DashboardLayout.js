import React, { useState } from 'react';
import cn from 'classnames';
import TopNav from './TopNav';
import Sidebar from './Sidebar';


function DashboardLayout(props) {
  const { history, location, onLogout, menuItems, pageId } = props;
  const [isSidebarOpen, toggleSidebar] = useState(false);
  return (
    <div className={cn('adminPortal', {
      'adminPortal-sidebarOpen': isSidebarOpen,
      [`adminPortal-page-${pageId}`]: pageId
    })}
    >
      <TopNav
        className="adminPortal_topnav"
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={toggleSidebar}
        onLogout={onLogout}
      />
      <Sidebar
        history={history}
        location={location}
        menu={menuItems}
        className={cn('adminPortal_sidebar', {
          'adminPortal_sidebar-open': isSidebarOpen,
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
