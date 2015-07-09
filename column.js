var paper;
function MyChart(obj){		
	var ax = new DrawAxis(obj);
	var lab = new DrawLabels(obj.chart);
	var place = obj.chart.renderatdiv;

	this.render = function(){
		window.onload = function () {
			paper = Raphael(place, width, height);
			draw();
		}
	}

	function draw(){			
		var col_wi = (width-margin)/(obj.data.length*2);				
		var ratio = (height-margin)/max;
//Drawing Axis & DIvisions
		ax.render();
//Drawing Captions
		lab.render();
//Drawing the Chart & Labels
		for (var i = 0; i < obj.data.length; i++) {
			paper.rect(margin+i*col_wi*2, height-obj.data[i].value*ratio, col_wi, obj.data[i].value*ratio-margin)
				.attr("fill", "cornflowerblue")
				.data("val",i)
				.mouseover(function(){
					this.attr("fill", "#ffc481")
						.attr("title", obj.data[this.data("val")].value/1000+"K in "+obj.data[this.data("val")].label);
				})
				.mouseout(function(){
					this.attr("fill", "cornflowerblue")
				});
			paper.text(margin+i*col_wi*2,height-margin/4-obj.data[i].value*ratio, obj.data[i].value)
				.attr("text-anchor", "start");
			paper.text(margin+i*col_wi*2,height-margin*2/3,obj.data[i].label)
				.attr("text-anchor", "start");
		}
	}
}
		

		
		

		