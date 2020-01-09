import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';
import { getChartReviewAction, getChartAvailabilityAction } from '../actions/ChartsAction';
import '../css/Home.scss';
import { Bar, Line } from 'react-chartjs-2';

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
		var array = new Array();
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
			return (
				<div>
					<NavBar />
					<h3>Average review score (rounded)</h3>
					<Bar
						data={{
							labels: this.props.reviewChart.numbers,
							scaleLabel: 'text',
							datasets: [
								{
									data: this.props.reviewChart.count,
									backgroundColor: this.dynamicColors(20),
									hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ]
								}
							]
						}}
						width={1000}
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

					<h3>Availability in days</h3>
					<Line
						data={{
							labels: this.props.availabilityChart.numbers,
							datasets: [
								{
									data: this.props.availabilityChart.count,
									backgroundColor: this.dynamicColors(1)
								}
							]
						}}
						width={1000}
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
