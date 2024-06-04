var React = require('react');
var ReactDOM = require('react-dom');
var FontPicker = require('react-font-picker');

var App = React.createClass({

	onFontChange: function(font){
		this.setState({font: font});
	},

	getInitialState: function(){
		return {font: "Arial"}
	},

	componentDidUpdate: function() {
		console.log(this.state)
	},

	render: function(){

		return (
			<div>

				<b>With local component state:</b>
				<br/><br/><br/><br/>

				<FontPicker
					label="Select Font"
					value=""
					previews={true}
					onChange={(font) => console.log(font)}
				/>

				<br/><br/><br/>
				<b>With parent state:</b>
				<br/><br/><br/><br/>

				<FontPicker
					label="Select Font"
					value={this.state.font}
					previews={true}
					onChange={this.onFontChange}
				/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
