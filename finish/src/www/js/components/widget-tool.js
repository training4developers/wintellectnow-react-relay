import React from 'react';
import Relay from 'react-relay';
import WidgetTableComponent from './widget-table';
import InsertWidgetMutation from '../mutations/insert-widget-mutation';
import { replaceItem, deleteItem } from '../immutable';

export default class BaseComponent extends React.Component {

	_fromEdges(collection, labelField = 'name') {
		return collection.edges.map(edge => ({
			value: edge.node.id, label: edge.node[labelField]
		}));
	}
	
	_fromEnumType(enumType) {
		return enumType.enumValues.map(enumValue => ({
			value: enumValue.name, label: enumValue.description
		}));
	}
	
}

export default class WidgetTool extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
		// 	widgets: [].concat(this.props.viewer.widgets)
		};
		

		this._saveWidget = this._saveWidget.bind(this);
		this._editWidget = this._editWidget.bind(this);
		this._cancelEditWidget = this._cancelEditWidget.bind(this);
		this._deleteWidget = this._deleteWidget.bind(this);
	}

	_appendWidget(widget) {
		Relay.Store.commitUpdate(new InsertWidgetMutation(
			Object.assign({	viewer: this.props.viewer, widget: null }, widget)
		));
	}

	_updateWidget(widget) {
		this.setState({
			widgets: replaceItem(this.state.widgets, w => w.id === widget.id, widget),
			editWidgetId: null
		});
	}

	_saveWidget(widget) {
		if (widget.id !== -1) {
			this._updateWidget(widget);
		} else {
			this._appendWidget(widget);
		}
	}

	_editWidget(widgetId) {
		this.setState({ editWidgetId: widgetId });
	}

	_cancelEditWidget() {
		this.setState({ editWidgetId: null });
	}

	_deleteWidget(widgetId) {
		this.setState({ widgets: deleteItem(this.state.widgets, w => w.id === widgetId) });
	}

	render() {
		return <div className='col-md-12'>
			<WidgetTableComponent editWidgetId={this.state.editWidgetId}
				widgets={this.props.viewer.widgets} userList={this._fromEdges(this.props.viewer.users)}
				sizeList={this._fromEnumType(this.props.sizes)}  colorList={this._fromEnumType(this.props.colors)}
				onSave={this._saveWidget} onDelete={this._deleteWidget}
				onEdit={this._editWidget} onCancelEdit={this._cancelEditWidget} />
		</div>;
	}

}
