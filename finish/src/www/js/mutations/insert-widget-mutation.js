import Relay from 'react-relay';

export default class extends Relay.Mutation {
	
	static fragments = {
		viewer: () => Relay.QL`fragment on Viewer { id }`
	}
	
	getMutation() {
		return Relay.QL`mutation { insertWidget }`;
	}
	
	// receives the parameters from the constructor, builds
	// the variables to send the GraphQL server
	getVariables() {
		return {
			widget: {
				// id is NOT included because we are insert and as such, there is id
				name: this.props.name,
				description: this.props.description,
				color: this.props.color,
				size: this.props.size,
				quantity: this.props.quantity,
				owner: {
					id: this.props.owner.id,
					name: this.props.owner.name
				}
			}
		};
	}	
	
	getConfigs() {
		return [{
			// insert operation
			type: 'RANGE_ADD', 
			// triggers update from container fragment viewer id
			// this is the name of property from the output field
			parentName: 'viewer', 
			// id of viewer being updated
			parentID: this.props.viewer.id,
			// name of the connection on viewer
			connectionName: 'widgets',
			// output field name on GraphQL server, should match the payload 
			edgeName: 'widgetEdge',
			// operation - not sure why this is needed
			rangeBehaviors: {
				'': 'append' 
			}
		}];
	}
	
	getFatQuery() {
		// corresponds to the structure of the output types
		// patten is used to not specify the parameters for the connections
		return Relay.QL`
			fragment on InsertWidgetPayload @relay(pattern: true) {
				viewer {
					users {
						edges {
							node {
								id
								name
							}
						}
					}					
					widgets {
						edges {
							node {
								id
								name
								description
								color
								size
								quantity
								owner {
									id
									name
								}
							}
						}
					}
				}
				widgetEdge
			}
		`;
	}
} 