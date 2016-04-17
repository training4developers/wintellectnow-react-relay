import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node-definitions';
import { userType } from './user-type';
import { widgetType } from './widget-type';
import { getViewer, getUser, getUsers, getWidget, getWidgets } from '../../database';
import Viewer from '../../models/viewer';
import { registerType } from '../type-registry';

export const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'Logged In User',
	fields: () => ({
		id : globalIdField('Viewer'),
		user: {
			type: userType,
			description: 'Find user by id',
			args: {
				id: {
					type: GraphQLID,
					description: 'A user id'
				}
			},
			resolve: (_, {id}) => getUser(id)
		},
		users: {
			type: new GraphQLList(userType),
			description: 'A list of users',
			args: {
				count: {
					type: GraphQLInt,
					description: 'Number of users to return'
				}
			},
			resolve: (_, {count}) => count ? getUsers().then(users => users.slice(0, count)) : getUsers()
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
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: () => getWidgets()
		}
	}),
	interfaces: () => [nodeInterface]
});

registerType(Viewer, viewerType, getViewer);