import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from './NavBar';
import { getChartReviewAction, getChartAvailabilityAction } from '../actions/ChartsAction';
import '../styles/Home.scss';
import { Bar, Line } from 'react-chartjs-2';
import '../styles/Charts.scss';

class ChartsUI extends Component {
	constructor(props) {
		super(props);
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
		this.props.getChartReviewDispatcher();
		this.props.getChartAvailabilityDispatcher();
	}

	dynamicColors = function(arraylength) {
		var array = [];
		for (var i = 0; i < arraylength; i++) {
			var r = Math.floor(Math.random() * 255);
			var g = Math.floor(Math.random() * 255);
			var b = Math.floor(Math.random() * 255);
			var total = 'rgb(' + r + ',' + g + ',' + b + ')';
			array.push(total);
		}
		return array;
	};

	render() {
		if (this.props.reviewChart !== undefined && this.props.availabilityChart !== undefined) {
			var arrayReviewLabels = this.props.reviewChart.map(function(e) {
				return parseInt(e.numbers);
			});
			var arrayReviewData = this.props.reviewChart.map(function(e) {
				return e.count;
			});
			var arrayAvailableLabels = this.props.availabilityChart.map(function(e) {
				return parseInt(e.numbers);
			});
			var arrayAvailableData = this.props.availabilityChart.map(function(e) {
				return e.count;
			});
			var dataArray = arrayAvailableData.concat();
			dataArray.shift();
			return (
				<div>
					<NavBar />
					<div className="pageContainer">
						<div className="chart">
							<h3 className="headText">Average review score (rounded)</h3>
							<Bar
								data={{
									labels: arrayReviewLabels,
									scaleLabel: 'text',
									datasets: [
										{
											data: arrayReviewData,
											backgroundColor: this.dynamicColors(20),
											hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ]
										}
									]
								}}
								width={800}
								height={500}
								options={{
									legend: {
										display: false
									},
									tooltips: {
										enabled: true
									},
									maintainAspectRatio: false,
									responsive: false,
									scales: {
										yAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Amount of reviews'
												}
											}
										],
										xAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Score from 1 to 10'
												}
											}
										]
									}
								}}
							/>
						</div>
						<div className="chart">
							<h3 className="headText">Availability in days</h3>
							<Line
								data={{
									labels: arrayAvailableLabels,
									datasets: [
										{
											data: dataArray,
											backgroundColor: this.dynamicColors(1)
										}
									]
								}}
								width={800}
								height={500}
								options={{
									legend: {
										display: false
									},
									tooltips: {
										enabled: true
									},
									elements: { point: { radius: 0 } },
									maintainAspectRatio: false,
									responsive: false,
									scales: {
										yAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Amount of AirBnBs'
												}
											}
										],
										xAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Days available(per year)'
												}
											}
										]
									}
								}}
							/>
							<p className="headText">
								Number of airbnb's with zero days available: {arrayAvailableData[0]}
							</p>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<NavBar />
				</div>
			);
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getChartReviewDispatcher: () => dispatch(getChartReviewAction()),
		getChartAvailabilityDispatcher: () => dispatch(getChartAvailabilityAction())
	};
}
function mapStateToProps(state) {
	return {
		reviewChart: state.chartsReducer.reviewChart,
		availabilityChart: state.chartsReducer.availabilityChart
	};
}

export const Charts = connect(mapStateToProps, mapDispatchToProps)(ChartsUI);
