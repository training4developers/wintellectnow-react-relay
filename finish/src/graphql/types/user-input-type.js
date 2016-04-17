import { GraphQLInputObjectType, GraphQLID, GraphQLString } from 'graphql';

export const updateUserInputType = new GraphQLInputObjectType({
	name: 'InputInsertUser',
	description: 'Update a user',
	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'User id'
		},
		name: {
			type: GraphQLString,
			description: 'User name'
		}
	})
});