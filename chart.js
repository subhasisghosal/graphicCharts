var paper, height, width, margin, max, caption, xcaption, ycaption;

function findMax(data){
	var max = data[0].value;
	for (var i = 0; i < data.length; i++) {
		if(data[i].value > max)
			max = data[i].value;	
	}
	return max;
}

function stLine(fromX,fromY,toX,toY){
	return paper.path("M"+fromX+" "+fromY+"L"+toX+" "+toY).attr("stroke-width", "2").attr("arrow-end", "open").toBack();
}

function line(fromX,fromY,toX,toY){
	return paper.path("M"+fromX+" "+fromY+"L"+toX+" "+toY).attr("stroke-dasharray", "- ").toBack();
}

function DrawAxis(obj){
	height = parseInt(obj.chart.height);
	width = parseInt(obj.chart.width);
	margin = parseInt(obj.chart.margin);
	max = findMax(obj.data);

	this.render = function(){
		stLine(margin, height-margin, margin, margin).attr("stroke-opacity","50");
		stLine(margin, height-margin, width, height-margin);
		var step = (height-margin*2)/5;
		for (var i = 1; i < 6; i++) {
			line(margin, height-margin-step*i, width, height-margin-step*i);
			paper.text(margin/2, height-margin-step*i, ((max/5)*i)/1000+"K")
				.attr("text-anchor", "start");
		};
	}
}

function DrawLabels(obj){
	height = parseInt(obj.height);
	width = parseInt(obj.width);
	margin = parseInt(obj.margin);
	caption = obj.caption;
	xcaption = obj.xaxiscaption;
	ycaption = obj.yaxiscaption;

	this.render = function(){
		paper.text(width/2, margin/2, caption)
			.attr("font-family","Helvetica")
			.attr("font-size", margin/2)
			.toFront();
		paper.text(margin/3,height/2,ycaption)
			.attr("font-family","Helvetica")
			.attr("font-size", margin/3)
			.rotate(-90);
		paper.text(width/2, height-margin/3, xcaption)
			.attr("font-family","Helvetica")
			.attr("font-size", margin/3)
			.toFront();
	}
}