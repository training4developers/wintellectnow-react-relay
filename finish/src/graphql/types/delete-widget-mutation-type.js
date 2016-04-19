import { GraphQLID } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { viewerType } from './viewer-type';
import { getViewer, deleteWidget } from '../../database';

export const deleteWidgetMutationType = mutationWithClientMutationId({
	// name of the mutation
	name: 'DeleteWidget',
	// input data for the mutation, include the widget data from getVariables
	inputFields: {
		widgetId: { type: GraphQLID }
	},
	// output data for the mutation, should contain the parent (viewer), and the new widget
	// will be consumed by operation configures in getConfigs
	outputFields: {
		viewer: {
			type: viewerType,
			resolve: () => getViewer(1)
		},
		widgetId: {
			type: GraphQLID,
			resolve: widget => widget.id
		}
	},
	mutateAndGetPayload: ({widgetId}) => {
		console.dir(arguments[0], { depth: 0 });
		// extract widget mongo _id from global id,
		// and delete the widget with the extracted id
		return deleteWidget(fromGlobalId(widgetId).id);		
	} 
});