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

export default TopNav;

