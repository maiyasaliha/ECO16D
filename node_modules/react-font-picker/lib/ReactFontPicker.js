"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var FontPicker = (function (_Component) {
	_inherits(FontPicker, _Component);

	function FontPicker(props) {
		_classCallCheck(this, FontPicker);

		_get(Object.getPrototypeOf(FontPicker.prototype), "constructor", this).call(this, props);

		// Bind component methods to this context
		this.onWrapperClick = this.onWrapperClick.bind(this);
		this.onOptionClick = this.onOptionClick.bind(this);
		this.onRipple = this.onRipple.bind(this);

		this.state = {
			isOptionsVisible: false,
			selectedFont: this.props.value
		};
	}

	_createClass(FontPicker, [{
		key: "componentDidMount",
		value: function componentDidMount() {

			// Check if stylesheet already exists
			for (var i = 0; i < document.styleSheets.length; i++) {

				var styleSheet = document.styleSheets[i];
				var cssRules = styleSheet.rules ? styleSheet.rules : styleSheet.cssRules;

				if (typeof cssRule !== "undefined" && cssRule !== null) {
					for (var j = 0; j < cssRules.length; ++j) {
						if (cssRules[j].selectorText == ".ReactFontPicker") return;
					}
				}
			}

			// Create stylesheet on the fly
			var styles = document.createElement("style");

			styles.innerHTML = "\n\t\t\t.ReactFontPicker_Wrapper {\n\t\t\t\tposition: relative;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 30px;\n\t\t\t\tborder-bottom: 1px solid #ddd;\n\t\t\t}\n\t\t\t.ReactFontPicker_Wrapper:hover {\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.ReactFontPicker_Label {\n\t\t\t\tposition: absolute;\n\t\t\t\tbottom: 8px;\n\t\t\t\tfont-size: 15px;\n\t\t\t\tcolor: #a0a0a0;\n\t\t\t}\n\t\t\t.ReactFontPicker_LabelFloat {\n\t\t\t\tposition: absolute;\n\t\t\t\tfont-size: 11px;\n\t\t\t\tbottom: 27px;\n\t\t\t\tcolor: #888;\n\t\t\t\t-webkit-transition: .2s all ease-in-out;\n\t\t\t\t-moz-transition: .2s all ease-in-out;\n\t\t\t\t-ms-transition: .2s all ease-in-out;\n\t\t\t\t-o-transition: .2s all ease-in-out;\n\t\t\t\ttransition: .2s all ease-in-out;\n\t\t\t}\n\t\t\t.ReactFontPicker_SelectedOption {\n\t\t\t\tposition: absolute;\n\t\t\t\theight: 25px;\n\t\t\t\tline-height: 35px;\n\t\t\t\tfont-size: 15px;\n\t\t\t}\n\t\t\t.ReactFontPicker_Button {\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 5px;\n\t\t\t\ttop: 12px;\n\t\t\t\twidth: 0;\n\t\t\t\theight: 0;\n\t\t\t\tborder-style: solid;\n\t\t\t\tborder-width: 5px 6px 0 6px;\n\t\t\t\tborder-color: #dddddd transparent transparent transparent;\n\t\t\t}\n\t\t\t.ReactFontPicker_Button:hover {\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.ReactFontPicker_Options {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: -7.5px;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: auto;\n\t\t\t\tmax-height: 200px;\n\t\t\t\toverflow-y: scroll;\n\t\t\t\tpadding-bottom: 15px;\n\t\t\t\tpadding-top: 15px;\n\t\t\t\tfloat: left;\n\t\t\t\tbackground-color: #fff;\n\n\t\t\t\tbox-shadow: 0px 0px 6px #ddd;\n\t\t\t\tz-index: 999;\n\n\t\t\t\t-webkit-transition: .15s all ease-in-out;\n\t\t\t\t-moz-transition: .15s all ease-in-out;\n\t\t\t\t-ms-transition: .15s all ease-in-out;\n\t\t\t\t-o-transition: .15s all ease-in-out;\n\t\t\t\ttransition: .15s all ease-in-out;\n\t\t\t}\n\t\t\t.ReactFontPicker_OptionsHidden {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: -7.5px;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 0px;\n\t\t\t\tpadding-bottom: 0;\n\t\t\t\tpadding-top: 0;\n\t\t\t\tbackground-color: #fff;\n\t\t\t\toverflow: hidden;\n\n\t\t\t\tbox-shadow: 0px 0px 6px #ddd;\n\n\t\t\t\t-webkit-transition: .15s all ease-in-out;\n\t\t\t\t-moz-transition: .15s all ease-in-out;\n\t\t\t\t-ms-transition: .15s all ease-in-out;\n\t\t\t\t-o-transition: .15s all ease-in-out;\n\t\t\t\ttransition: .15s all ease-in-out;\n\t\t\t}\n\t\t\t.ReactFontPicker_Option {\n\t\t\t\tdisplay: block;\n\t\t\t\twidth: calc(100% - 20px);\n\t\t\t\tpadding-left: 10px;\n\t\t\t\tpadding-right: 10px;\n\t\t\t\theight: 30px;\n\t\t\t\tline-height: 30px;\n\t\t\t\tfloat: left;\n\n\t\t\t\t-webkit-transition: .1s all ease-in-out;\n\t\t\t\t-moz-transition: .1s all ease-in-out;\n\t\t\t\t-ms-transition: .1s all ease-in-out;\n\t\t\t\t-o-transition: .1s all ease-in-out;\n\t\t\t\ttransition: .1s all ease-in-out;\n\t\t\t}\n\t\t\t.ReactFontPicker_Option:hover {\n\t\t\t\tbackground-color: #eee;\n\t\t\t}\n\t\t\tdiv.ReactFontPicker_Wrapper .ripple {\n\t\t\t\tposition: relative;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\t\t\tdiv.ReactFontPicker_Wrapper .ripple-effect{\n\t\t\t\tposition: absolute;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\twidth: 50px;\n\t\t\t\theight: 50px;\n\t\t\t\tbackground: white;\n\t\t\t\tanimation: ripple-animation 1.8s;\n\t\t\t}\n\t\t\t@keyframes ripple-animation {\n\t\t\t\tfrom {\n\t\t\t\t\ttransform: scale(1);\n\t\t\t\t\topacity: 0.4;\n\t\t\t\t}\n\t\t\t\tto {\n\t\t\t\t\ttransform: scale(100);\n\t\t\t\t\topacity: 0;\n\t\t\t\t}\n\t\t\t}\n\t\t\t.ReactFontPicker {\n\t\t\t\tdisplay: block;\n\t\t\t}\n\t\t";
			document.getElementsByTagName("head")[0].appendChild(styles);
		}
	}, {
		key: "onWrapperClick",
		value: function onWrapperClick() {
			this.setState({ isOptionsVisible: !this.state.isOptionsVisible });
		}
	}, {
		key: "onOptionClick",
		value: function onOptionClick(e, font) {
			e.stopPropagation();

			if (this.state.isOptionsVisible == false) return;

			if (typeof this.props.onChange == "function") this.props.onChange(font);

			this.setState({ isOptionsVisible: false, selectedFont: font });
		}
	}, {
		key: "onRipple",
		value: function onRipple(e) {
			// Material UI ripple effect
			// e.preventDefault();
			e.stopPropagation();

			var target = e.target;

			var div = document.createElement("div"),
			    targetOffset = target.getBoundingClientRect(),
			    xPos = e.pageX - targetOffset.left,
			    yPos = e.pageY - targetOffset.top;

			div.classList.add('ripple-effect');
			div.style.top = parseInt(yPos - targetOffset.height / 2) + "px";
			div.style.left = parseInt(xPos - targetOffset.height) + "px";

			target.appendChild(div);

			setTimeout(function () {
				target.removeChild(div);
			}, 500);
		}
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			var _props = this.props;
			var label = _props.label;
			var fonts = _props.fonts;
			var previews = _props.previews;
			var activeColor = _props.activeColor;

			// Get select font (value) from props or local state if props not given
			var value = this.props.value || this.state.selectedFont;

			return _react2["default"].createElement(
				"div",
				{ className: "ReactFontPicker" },
				_react2["default"].createElement(
					"div",
					{ className: "ReactFontPicker_Wrapper", onClick: this.onWrapperClick },
					_react2["default"].createElement(
						"div",
						{ className: value === "" ? "ReactFontPicker_Label" : "ReactFontPicker_LabelFloat" },
						label
					),
					_react2["default"].createElement(
						"div",
						{ className: "ReactFontPicker_SelectedOption" },
						value
					),
					_react2["default"].createElement("div", { className: "ReactFontPicker_Button" }),
					_react2["default"].createElement(
						"div",
						{ className: this.state.isOptionsVisible ? "ReactFontPicker_Options" : "ReactFontPicker_OptionsHidden" },
						fonts.map(function (n, i) {

							var style = {};

							if (value == n) style.color = activeColor;

							if (previews) style.fontFamily = n;

							return _react2["default"].createElement(
								"div",
								{ className: "ReactFontPicker_Option ripple",
									style: style,
									key: i,
									onMouseDown: function (e) {
										return _this.onRipple(e);
									},
									onMouseUp: function (e) {
										return _this.onOptionClick(e, n);
									},
									onClick: function (e) {
										return _this.onOptionClick(e, n);
									}
								},
								n
							);
						})
					)
				)
			);
		}
	}]);

	return FontPicker;
})(_react.Component);

exports["default"] = FontPicker;

FontPicker.propTypes = {
	fonts: _react.PropTypes.array,
	label: _react.PropTypes.string,
	previews: _react.PropTypes.bool,
	activeColor: _react.PropTypes.string,
	value: _react.PropTypes.string,
	onChange: _react.PropTypes.func
};

FontPicker.defaultProps = {
	label: "",
	previews: true,
	fonts: ["Arial", "Arial Narrow", "Arial Black", "Courier New", "Georgia", "Lucida Console", "Lucida Sans Unicode", "Tahoma", "Times New Roman", "Verdana"],
	activeColor: "#64B5F6",
	value: "",
	onChange: function onChange(font) {
		console.log("FontPicker: " + font);
	}
};

exports["default"] = FontPicker;
module.exports = exports["default"];
/* Wrapper */ /* Floating label text */ /* Selected option */ /* Downdown button */ /* Options list */