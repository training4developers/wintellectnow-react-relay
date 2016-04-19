import Relay from 'react-relay';

export default class extends Relay.Mutation {
	
	static fragments = {
		viewer: () => Relay.QL`fragment on Viewer { id }`
	}
	
	getMutation() {
		return Relay.QL`mutation { deleteWidget }`;
	}
	
	getVariables() {
		// receives the parameters from the constructor
		return {
			widgetId: this.props.widgetId
		};
	}	
	
	getConfigs() {
		return [{
			type: 'NODE_DELETE', // operation
			// triggers update from container fragment viewer id
			parentName: 'viewer', 
			// this is the name of property from the output field
			parentID: this.props.viewer.id, // id of viewer being updated
			connectionName: 'widgets', // name of the connection
			deletedIDFieldName: 'widgetId' // fat query payload field name of the id for the deleted node
		}];
	}
	
	getFatQuery() {
		// corresponds to the structure of the output types
		return Relay.QL`
			fragment on DeleteWidgetPayload @relay(pattern: true) {
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
				widgetId
			}
		`;
	}
} 