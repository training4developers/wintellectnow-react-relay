import Relay from 'react-relay';

export default class extends Relay.Mutation {
	
	static fragments = {
		viewer: () => Relay.QL`fragment on Viewer { id }`
	}
	
	getMutation() {
		return Relay.QL`mutation { insertWidget }`;
	}
	
	getVariables() {
		
		console.log('get variables');
		console.dir(this.props);
		
		return {
			widget: {
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
			type: 'RANGE_ADD', // operation
			// triggers update from container fragment viewer id
			parentName: 'viewer', 
			// this is the name of property from the output field
			parentID: this.props.viewer.id, // id of viewer being updated
			connectionName: 'widgets', // name of the connection
			edgeName: 'widgetEdge', // output field name on GraphQL server
			rangeBehaviors: {
				'': 'append' // operation
			}
		}];
	}
	
	getFatQuery() {
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