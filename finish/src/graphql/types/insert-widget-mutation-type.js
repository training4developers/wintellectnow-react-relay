import { mutationWithClientMutationId, cursorForObjectInConnection } from 'graphql-relay';
import { insertWidgetInputType } from './widget-input-type';
import { viewerType } from './viewer-type';
import { WidgetEdge } from '../connections/widget-connection';
import { getViewer, getWidgets, insertWidget } from '../../database';

export const insertWidgetMutationType = mutationWithClientMutationId({
	// name of the mutation
	name: 'InsertWidget',
	// input data for the mutation, include the widget data from getVariables
	inputFields: {
		widget: { type: insertWidgetInputType }
	},
	// output data for the mutation, should contain the parent (viewer), and the new widget
	// will be consumed by operation configures in getConfigs
	outputFields: {
		viewer: {
			type: viewerType,
			resolve: () => getViewer(1)
		},
		widgetEdge: {
			type: WidgetEdge,
			resolve: widget => ({
				cursor: cursorForObjectInConnection(getWidgets(), widget),
				node: widget
			})
		}
	},
	mutateAndGetPayload: ({widget}) => insertWidget(widget)
});