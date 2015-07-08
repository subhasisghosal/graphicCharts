var paper, height, width, margin;
	function MyChart(obj){
		height = parseInt(obj.chart.height),
		width = parseInt(obj.chart.width),
		margin = parseInt(obj.chart.margin),
		caption = obj.chart.caption;

		function stLine(fromX,fromY,toX,toY){
			return paper.path("M"+fromX+" "+fromY+"L"+toX+" "+toY).attr("stroke-width", "2").attr("arrow-end", "open").toBack();
		}

		function line(fromX,fromY,toX,toY){
			return paper.path("M"+fromX+" "+fromY+"L"+toX+" "+toY).attr("stroke-dasharray", "- ").toBack();
		}

		function findMax(data){
			var max = data[0].value;
			for (var i = 0; i < data.length; i++) {
				if(data[i].value > max)
					max = data[i].value;	
			}
			return max;
		}

		this.render = function(){
			window.onload = function () {
				paper = Raphael("holder", width, height);
				draw();
			}
		}

		function draw(){
			
			var col_wi = (width-margin)/(obj.data.length*2);		
			var max = findMax(obj.data);
			var ratio = (height-margin)/max;
//Drawing Axis & DIvisions
			stLine(margin/2, height-margin, margin/2, margin).attr("stroke-opacity","50");
			stLine(margin/2, height-margin, width, height-margin);
			var step = (height-margin*2)/5;
			for (var i = 1; i < 6; i++) {
				line(margin/2, height-margin-step*i, width, height-margin-step*i);
				paper.text(0, height-margin-step*i, (max/5)*i)
					.attr("text-anchor", "start");
			};
//Drawing Caption
			paper.text(width/2, margin/2, caption)
				.attr("font-family","Helvetica")
				.attr("font-size", margin/3)
				.toFront();
//Drawing the Chart & Labels
			for (var i = 0; i < obj.data.length; i++) {
				paper.rect(margin+i*col_wi*2, height-obj.data[i].value*ratio, col_wi, obj.data[i].value*ratio-margin)
					.attr("fill", "cornflowerblue")
					.mouseover(function(e){
						this.attr("fill", "#ffc481")
							.attr("title", "Text");
					})
					.mouseout(function(){
						this.attr("fill", "cornflowerblue")
					});
				paper.text(margin+i*col_wi*2,height-margin/2-obj.data[i].value*ratio, obj.data[i].value)
					.attr("text-anchor", "start");
				paper.text(margin+i*col_wi*2,height-margin/2,obj.data[i].label)
					.attr("text-anchor", "start");
			}
		}
	}
		

		
		

		