import { GraphQLObjectType, GraphQLID } from 'graphql';
import { globalIdField, connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import { nodeInterface } from '../node-definitions';
import { userType } from './user-type';
import { widgetType } from './widget-type';
import { getViewer, getUser, getUsers, getWidget, getWidgets } from '../../database';
import Viewer from '../../models/viewer';
import { registerType } from '../type-registry';
import { userConnection } from '../connections/user-connection';
import { widgetConnection } from '../connections/widget-connection';

export const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'Logged In User',
	fields: () => ({
		id : globalIdField('Viewer'),
		user: {
			type: userType,
			description: 'Find user by id',
			args: {
				id: { type: GraphQLID }
			},
			resolve: (_, {id}) => getUser(id)
		},
		users: {
			type: userConnection,
			description: 'A list of users',
			args: connectionArgs,
			resolve: (_, args) => connectionFromPromisedArray(getUsers(), args)
		},
		widget: {
			type: widgetType,
			description: 'Find widget by id',
			args: {
				id: {
					type: GraphQLID,
					description: 'A widget id'
				}
			},
			resolve: (_, {id}) => getWidget(id)
		},
		widgets: {
			type: widgetConnection,
			description: 'A list of widgets',
			args: connectionArgs,
			resolve: (_, args) => connectionFromPromisedArray(getWidgets(), args)
		}
	}),
	interfaces: () => [nodeInterface]
});

registerType(Viewer, viewerType, getViewer);