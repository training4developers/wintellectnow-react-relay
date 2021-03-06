import React from 'react';
import ViewRowComponent from './view-row';
import EditRowComponent from './edit-row';

export default props => <table className="table table-inverse">
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Color</th>
			<th>Size</th>
			<th>Quantity</th>
			<th>Owner</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{props.widgets.map(widget => props.editWidgetId === widget.id
			? <EditRowComponent colorList={props.colorList} sizeList={props.sizeList} userList={props.userList} key={widget.id} widget={widget} onSave={props.onSave} onCancelEdit={props.onCancelEdit} />
		: <ViewRowComponent key={widget.id} widget={widget} onEdit={props.onEdit} onDelete={props.onDelete} />)}
		<EditRowComponent colorList={props.colorList} sizeList={props.sizeList} userList={props.userList} onSave={props.onSave} key="-1" />
	</tbody>
</table>;
