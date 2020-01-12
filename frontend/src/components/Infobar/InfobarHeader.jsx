import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/Infobar.scss';
import { getNeighbourhoodsChangeAction } from '../../actions/MapAction';
import {
	priceChangeAction,
	reviewChangeAction,
	neighbourhoodsChangeAction,
	clickFilterButtonAction,
	clickResetButtonAction
} from '../../actions/FilterAction';

class InfoBarHeaderUI extends Component {
	constructor(props) {
		super(props);
		this.props.getNeighbourhoodsDispatcher();
	}

	getSelectedLocation = () => {
		if (this.props.locations.length === 0 && this.props.filter === true) {
			return <h1 className="NoLocations">No locations found</h1>;
		}
	};

	render() {
		const neighbourhoodsChangeHandler = (evt) => this.props.neighbourhoodsChangeDispatcher(evt.target.value);
		const priceChangeHandler = (evt) => this.props.priceChangeDispatcher(evt.target.value);
		const reviewChangeHandler = (evt) => this.props.reviewChangeDispatcher(evt.target.value);
		const clickFilterButtonHandler = () =>
			this.props.clickFilterButtonDispatcher(this.props.neighbourhood, this.props.price, this.props.review);
		const clickResetButtonHandler = () => this.props.clickResetButtonDispatcher();
		const formHandler = (evt) => evt.preventDefault();

		if (this.props.neighbourhoods !== undefined) {
			return (
				<div className="header">
					<form name="filters" onSubmit={formHandler}>
						<h4>Filter by:</h4>
						<div>
							<label>Neighbourhood: </label>
							<select onChange={(e) => neighbourhoodsChangeHandler(e)}>
								<option key={'All'} value={'All'}>
									{'All'}
								</option>
								{this.props.neighbourhoods.map((neighbourhood) => (
									<option key={neighbourhood.neighbourhood} value={neighbourhood.neighbourhood}>
										{neighbourhood.neighbourhood}
									</option>
								))}
							</select>
						</div>

						<div>
							<label>Max. Price: </label>
							<input
								className="filterInput"
								type="number"
								min="0"
								step="1"
								max="9999"
								value={this.props.price}
								onChange={priceChangeHandler}
							/>
						</div>

						<div>
							<label>Min. Review score: </label>
							<input
								className="filterInput"
								type="number"
								min="0"
								step="1"
								max="100"
								value={this.props.review}
								onChange={reviewChangeHandler}
							/>
						</div>
						<button className="filter" onClick={clickFilterButtonHandler}>
							Filter
						</button>
						<button className="filter" onClick={clickResetButtonHandler}>
							Reset
						</button>
					</form>
					{this.getSelectedLocation()}
				</div>
			);
		} else {
			return <h1>Loading, please wait</h1>;
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getNeighbourhoodsDispatcher: () => dispatch(getNeighbourhoodsChangeAction()),
		neighbourhoodsChangeDispatcher: (neigbourhood) => dispatch(neighbourhoodsChangeAction(neigbourhood)),
		priceChangeDispatcher: (price) => dispatch(priceChangeAction(price)),
		reviewChangeDispatcher: (review) => dispatch(reviewChangeAction(review)),
		clickFilterButtonDispatcher: (neighbourhood, price, review) =>
			dispatch(clickFilterButtonAction(neighbourhood, price, review)),
		clickResetButtonDispatcher: () => dispatch(clickResetButtonAction())
	};
}

function mapStateToProps(state) {
	return {
		neighbourhoods: state.mapReducer.neighbourhoods,
		price: state.filterReducer.price,
		review: state.filterReducer.review,
		neighbourhood: state.filterReducer.neighbourhood,
		locations: state.filterReducer.locations.features,
		filter: state.filterReducer.filter
	};
}

export const InfobarHeader = connect(mapStateToProps, mapDispatchToProps)(InfoBarHeaderUI);
