import React from 'react';
import { List, ListItem, FontIcon } from 'react-md';
import cn from 'classnames';

function Sidebar(props) {
  const {
    className, menu, history, location,
    logo = './images/logo.png', 
    logoSm = './images/logo-sm.png'
  } = props;
  return (
    <div className={`${className} sidebar`}>
      <div className="sidebar_logo">
        <img
          src={logo}
          alt="logo"
          className="logo"
        />
        <img
          src={logoSm}
          alt="logoSm"
          className="logoSm"
        />
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

export default Sidebar;
