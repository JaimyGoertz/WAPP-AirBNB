import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapMarker from '../images/map-marker.png';
import * as geoDataLocations from '../geoData/airbnblocations.json';
import { connect } from 'react-redux';
import { NavBar } from './NavBar';
import { getLocationsChangeAction } from '../actions/MapAction';

class MapUI extends Component {
	constructor(props) {
		super(props);
		this.props.getLocationsDispatcher();
		this.state = {
			viewport: {
				width: '100vw',
				height: '90vh',
				latitude: 52.379189,
				longitude: 4.899431,
				zoom: 10.7,
				selectedLocation: null
			}
		};
	}

	render() {
		return (
			<div>
				<NavBar />
				<ReactMapGL
					{...this.state.viewport}
					onViewportChange={(viewport) => this.setState({ viewport })}
					mapStyle="mapbox://styles/mapbox/streets-v9"
					mapboxApiAccessToken={
						'pk.eyJ1IjoiamFpbXlnb2VydHoiLCJhIjoiY2szcmFwbmtrMDg3bjNucGV2c2FjanN4OSJ9.QWDB0oASW97mqlrAvXPd8g'
					}
				>
					<div
						style={{
							width: '15vw',
							height: 'auto',
							backgroundColor: 'lightgrey',
							boxShadow: '2px 2px 4px #000000',
							position: 'absolute',
							left: 0,
							top: 0,
							zIndex: 10
						}}
					>
						<h2>Selected location:</h2>
						{this.getSelectedLocation()}
					</div>
					{geoDataLocations.features.map((location) => (
						<Marker
							key={location.properties.id}
							latitude={location.geometry.coordinates[1]}
							longitude={location.geometry.coordinates[0]}
						>
							<button
								style={{ background: 'none', border: 'none', cursor: 'pointer' }}
								onClick={(e) => {
									this.setState({
										selectedLocation: {
											name: location.properties.name,
											id: location.properties.id,
											hostname: location.properties.host_name,
											roomType: location.properties.room_type
										}
									});
								}}
							>
								<img width="20px" height="20px" src={mapMarker} />
							</button>
						</Marker>
					))}
				</ReactMapGL>
			</div>
		);
	}

	getSelectedLocation = () => {
		if (this.state.selectedLocation != null) {
			return (
				<div>
					<h3>Name</h3>
					{this.state.selectedLocation.name}
					<h3>Id</h3>
					{this.state.selectedLocation.id}
					<h3>Hostname</h3>
					{this.state.selectedLocation.hostname}
					<h3>roomType</h3>
					{this.state.selectedLocation.roomType}
				</div>
			);
		} else {
			return <div>select a location</div>;
		}
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getLocationsDispatcher: () => dispatch(getLocationsChangeAction())
	};
}

function mapStateToProps(state) {
	return {};
}

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapUI);
