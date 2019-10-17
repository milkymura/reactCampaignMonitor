import React from 'react';
import { Paper, Button } from 'react-md';
import cn from 'classnames';

function RowToolbar(props) {
  const BCP = 'rowToolbar'
  const {
    title,
    isSticky,
    handleToggleSidebar,
    toolbarRenderer: ToolBar,
    toolbarHandlers
  } = props;
  const { onClickNew } = toolbarHandlers

  return (
    <div className={cn('row row-ToolbarHeader', {
      'row-ToolbarHeader-sticky' : isSticky
    })}>
      <Paper>
        <div className={BCP}>
          <div className={`${BCP}_title`}>
            <h1 className="title"> {title} </h1>
          </div>
          <div className={`${BCP}_toolbar`}>
            <ToolBar onClickNew={onClickNew} />
          </div>
        </div>
      </Paper>
    </div>
  );
}

function DefaultToolbar(props) {
  const { onClickNew } = props
  return (
    <Button
      flat
      children="New"
      iconChildren="add"
      className="iBttn iBttn-primary"
      onClick={onClickNew}
    />
  )
}

RowToolbar.defaultProps = {
  toolbarRenderer: DefaultToolbar,
};

export default RowToolbar;

