import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node-definitions';
import { widgetType } from './widget-type';
import { getUserWidgets, getUser } from '../../database';
import User from '../../models/user';
import { registerType } from '../type-registry';

export const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: () => ({
		id: globalIdField('User'),
		name: {
			type: GraphQLString,
			description: 'A user name'
		},
		widgets: {
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: ({
				id
			}) => getUserWidgets(id)
		}
	}),
	interfaces: () => [nodeInterface]
});

registerType(User, userType, getUser);