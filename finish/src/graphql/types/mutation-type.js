import { GraphQLObjectType } from 'graphql';
import { insertWidgetMutationType } from './insert-widget-mutation-type';

export const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		insertWidget: insertWidgetMutationType
		//updateWidget: createWidgetMutation(updateWidgetInputType, (_, {widget}) => updateWidget(widget)),
		//deleteWidget: createWidgetMutation(GraphQLID, (_, {widgetId}) => deleteWidget(widgetId), 'widgetId')
	})
});

