import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

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
    </div>
  );
}

export default TopNav;

