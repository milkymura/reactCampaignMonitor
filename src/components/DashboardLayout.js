import React, { useState } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import { List, ListItem, FontIcon } from 'react-md';
import cn from 'classnames';


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


function TopNav(props) {
  const {
    className,
    handleToggleSidebar,
    isSidebarOpen,
    onLogout,
  } = props;
  return (
    <div className={`${className} topnav`}>
      <Button
        icon
        children={isSidebarOpen ? 'keyboard_arrow_right' : 'menu'}
        onClick={() => { handleToggleSidebar(!isSidebarOpen); }}
        className="topnav_toggle"
      />
      <Button
        flat
        secondary
        onClick={onLogout}
        children="Logout"
        iconEl={<i className="wtfr wtf-sign-out" />}
        className="topnav_logout iBttn iBttn-second-prio"
      />
    </div>
  );
}

function Sidebar(props) {
  const {
    className, menu, history, location,
  } = props;
  return (
    <div className={`${className} sidebar`}>
      <div className="sidebar_logo">
        <h1>LOGO</h1>
      </div>
      <List className="sidebar_list">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.route;
          return (
            <ListItem
              onClick={() => { history.push(item.route); }}
              className={cn('sidebar_list_item', { active: isActive })}
              leftIcon={<FontIcon>{item.icon}</FontIcon>}
              primaryText={item.label}
            />
          );
        })}
      </List>
    </div>
  );
}

export default DashboardLayout;
