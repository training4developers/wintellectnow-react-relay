import Relay from 'react-relay';

export default class extends Relay.Mutation {
	
	static fragments = {
		viewer: () => Relay.QL`fragment on Viewer { id }`
	}
	
	getMutation() {
		return Relay.QL`mutation { updateWidget }`;
	}
	
	getVariables() {
		return {
			widget: {
				id: this.props.id,
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
			type: 'FIELDS_CHANGE', // update operation
			fieldIDs: {
				// id of the top level fragment
				viewer: this.props.viewer.id // id of the viewer updated
			}
		}];
	}
	
	getFatQuery() {
		// corresponds to the structure of the output types
		return Relay.QL`
			fragment on UpdateWidgetPayload @relay(pattern: true) {
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