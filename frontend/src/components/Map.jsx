import React, { Component } from 'react';
import ReactMapGL, { Layer } from 'react-map-gl';
import { Source } from 'react-map-gl';
import { connect } from 'react-redux';
import { NavBar } from './NavBar';
import { getLocationsChangeAction, getLocationDetailsAction } from '../actions/MapAction';
import { InfoBar } from './Infobar/Infobar';
import '../styles/Map.scss';

class MapUI extends Component {
	constructor(props) {
		super(props);
		this.props.getLocationsDispatcher();
		this.state = {
			viewport: {
				width: '1044.4px',
				height: '90vh',
				latitude: 52.379189,
				longitude: 4.899431,
				zoom: 10.7,
				selectedLocation: null
			}
		};
	}

	_onClick = (event) => {
		const feature = event.features.find((f) => f.layer.id === 'unclustered-point');
		if (feature !== undefined) this.props.getLocationDetailsDispatcher(feature.properties.id);
	};

	render() {
		if (this.props.locations != undefined) {
			return (
				<div>
					<NavBar />
					<div className="main">
						<ReactMapGL
							{...this.state.viewport}
							onViewportChange={(viewport) => this.setState({ viewport })}
							mapStyle="mapbox://styles/mapbox/streets-v9"
							mapboxApiAccessToken={
								'pk.eyJ1IjoiamFpbXlnb2VydHoiLCJhIjoiY2szcmFwbmtrMDg3bjNucGV2c2FjanN4OSJ9.QWDB0oASW97mqlrAvXPd8g'
							}
							onClick={this._onClick}
						>
							{this.sourceAndLayers()}
						</ReactMapGL>
						<InfoBar />
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<NavBar />
					<div className="main">
						<ReactMapGL
							{...this.state.viewport}
							onViewportChange={(viewport) => this.setState({ viewport })}
							mapStyle="mapbox://styles/mapbox/streets-v9"
							mapboxApiAccessToken={
								'pk.eyJ1IjoiamFpbXlnb2VydHoiLCJhIjoiY2szcmFwbmtrMDg3bjNucGV2c2FjanN4OSJ9.QWDB0oASW97mqlrAvXPd8g'
							}
							onClick={this._onClick}
						/>
						<InfoBar />
					</div>
				</div>
			);
		}
	}

	sourceAndLayers() {
		if (this.props.filter == true) {
			return (
				<Source
					id="source_id"
					data={this.props.filteredLocations}
					type="geojson"
					cluster={true}
					clusterMaxZoom={15}
					clusterRadius={50}
				>
					<Layer
						type="circle"
						id="layer_id"
						source="source_id"
						paint={{
							'circle-color': {
								property: 'point_count',
								type: 'interval',
								stops: [ [ 0, '#ec5242' ], [ 100, '#3fb211' ], [ 750, '#FADA5E ' ] ]
							},
							'circle-radius': {
								property: 'point_count',
								type: 'interval',
								stops: [ [ 0, 10 ], [ 90, 20 ], [ 650, 30 ] ]
							}
						}}
						filter={[ 'has', 'point_count' ]}
					/>
					<Layer
						id="unclustered-point"
						type="circle"
						source="source_id"
						filter={[ '!has', 'point_count' ]}
						paint={{
							'circle-color': '#1396d9',
							'circle-radius': 8,
							'circle-stroke-width': 2,
							'circle-stroke-color': '#fff'
						}}
					/>
					<Layer
						id="cluster-count"
						type="symbol"
						source="source_id"
						filter={[ 'has', 'point_count' ]}
						layout={{
							'text-field': '{point_count_abbreviated}',
							'text-font': [ 'DIN Offc Pro Medium', 'Arial Unicode MS Bold' ],
							'text-size': 12
						}}
					/>
				</Source>
			);
		} else {
			return (
				<Source
					id="source_id"
					data={this.props.locations}
					type="geojson"
					cluster={true}
					clusterMaxZoom={15}
					clusterRadius={50}
				>
					<Layer
						type="circle"
						id="layer_id"
						source="source_id"
						paint={{
							'circle-color': {
								property: 'point_count',
								type: 'interval',
								stops: [ [ 0, '#ec5242' ], [ 100, '#3fb211' ], [ 750, '#FADA5E ' ] ]
							},
							'circle-radius': {
								property: 'point_count',
								type: 'interval',
								stops: [ [ 0, 10 ], [ 90, 20 ], [ 650, 30 ] ]
							}
						}}
						filter={[ 'has', 'point_count' ]}
					/>
					<Layer
						id="unclustered-point"
						type="circle"
						source="source_id"
						filter={[ '!has', 'point_count' ]}
						paint={{
							'circle-color': '#1396d9',
							'circle-radius': 8,
							'circle-stroke-width': 2,
							'circle-stroke-color': '#fff'
						}}
					/>
					<Layer
						id="cluster-count"
						type="symbol"
						source="source_id"
						filter={[ 'has', 'point_count' ]}
						layout={{
							'text-field': '{point_count_abbreviated}',
							'text-font': [ 'DIN Offc Pro Medium', 'Arial Unicode MS Bold' ],
							'text-size': 12
						}}
					/>
				</Source>
			);
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getLocationDetailsDispatcher: (id) => dispatch(getLocationDetailsAction(id)),
		getLocationsDispatcher: () => dispatch(getLocationsChangeAction())
	};
}

function mapStateToProps(state) {
	return {
		locations: state.mapReducer.locations,
		locationDetails: state.mapReducer.locationDetails,
		filter: state.filterReducer.filter,
		filteredLocations: state.filterReducer.locations
	};
}

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapUI);
