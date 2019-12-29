import React, { Component } from 'react';
import ReactMapGL, { Layer } from 'react-map-gl';
import { Source } from 'react-map-gl';
import { connect } from 'react-redux';
import { NavBar } from './NavBar';
import { getLocationsChangeAction, getLocationDetailsAction } from '../actions/MapAction';
import { InfoBar } from './Infobar/Infobar';
import '../css/Map.scss';

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
											stops: [ [ 0, '#ff0000' ], [ 100, '#f1f075' ], [ 750, '#f28cb1' ] ]
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
										'circle-color': '#11b4da',
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
						</ReactMapGL>
						<InfoBar />
					</div>
				</div>
			);
		} else {
			return <h1>Map is loading, please wait</h1>;
		}
	}

	getSelectedLocation = () => {
		if (this.props.locationDetails !== undefined) {
			return (
				<div>
					<h3>Name</h3>
					{this.props.locationDetails[0].name}
					<h3>Id</h3>
					{this.props.locationDetails[0].id}
					<h3>Hostname</h3>
					{this.props.locationDetails[0].hostname}
					<h3>roomType</h3>
					{this.props.locationDetails[0].roomType}
				</div>
			);
		} else {
			return <div>Select a location</div>;
		}
	};
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
		locationDetails: state.mapReducer.locationDetails
	};
}

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapUI);
