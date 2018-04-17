/**
 * Theme: Montran Admin Template
 * Author: Coderthemes
 * Chart Js Page
 *
 */

! function($) {
	"use strict";

	var ChartJs = function() {
	};

	ChartJs.prototype.respChart = function respChart(selector, type, data, options) {
		// get selector by context
		var ctx = selector.get(0).getContext("2d");
		// pointing parent container to make chart js inherit its width
		var container = $(selector).parent();

		// enable resizing matter
		$(window).resize(generateChart);

		// this function produce the responsive Chart JS
		function generateChart() {
			// make chart width fit with its container
			var ww = selector.attr('width', $(container).width());
		new Chart(ctx).Bar(data, options);
			// Initiate new chart or Redraw

		};
		// run function - render chart at first load
		generateChart();
	},
	//init
	ChartJs.prototype.init = function() {
		

		//barchart
		var data3 = {
			labels : ["January", "February", "March", "April", "May", "June", "July"],
			datasets : [{
				fillColor : "#5cac22",
				strokeColor : "#d5e3a17",
				data : [65, 59, 90, 81, 56, 55, 40]
			}, {
				fillColor : "#dcdcdc",
				strokeColor : "#dcdcdc",
				data : [28, 48, 40, 19, 96, 27, 100]
			}]
		}
		this.respChart($("#bar"), 'Bar', data3);

	}, $.ChartJs = new ChartJs, $.ChartJs.Constructor =
	ChartJs

}(window.jQuery),

//initializing
function($) {
	"use strict";
	$.ChartJs.init()
}(window.jQuery); 