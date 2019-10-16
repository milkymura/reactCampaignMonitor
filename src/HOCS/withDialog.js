import React, { PureComponent } from 'react';
import { Button, DialogContainer, TextField } from 'react-md';

export default function withDialog(WrappedComponent) {
	return class withDialog extends PureComponent {
		render() {
			const { visible, actions, title, onHideDialog, size = 'md' } = this.props

			console.log('&withDialog [this.props] == ',this.props)
			return (
				<DialogContainer
					portal
					renderNode={document.body}
					id="simple-action-dialog"
					visible={visible}
					onHide={onHideDialog}
					actions={actions}
					title={title}
					focusOnMount={false}
					className={`customDialog customDialog-${size}`}
					dialogClassName='customDialog_dialog'
					contentClassName='customDialog_content'
					titleClassName='customDialog_header'
					footerClassName='customDialog_footer'
				>
					<WrappedComponent { ...this.props } />
				</DialogContainer>
			);
		}
	}
}



