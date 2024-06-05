require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var FontPicker = require('react-font-picker');

var App = React.createClass({
	displayName: 'App',

	onFontChange: function onFontChange(font) {
		this.setState({ font: font });
	},

	getInitialState: function getInitialState() {
		return { font: "Arial" };
	},

	componentDidUpdate: function componentDidUpdate() {
		console.log(this.state);
	},

	render: function render() {

		return React.createElement(
			'div',
			null,
			React.createElement(
				'b',
				null,
				'With local component state:'
			),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement(FontPicker, {
				label: 'Select Font',
				value: '',
				previews: true,
				onChange: function (font) {
					return console.log(font);
				}
			}),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement(
				'b',
				null,
				'With parent state:'
			),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement(FontPicker, {
				label: 'Select Font',
				value: this.state.font,
				previews: true,
				onChange: this.onFontChange
			})
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-font-picker":undefined}]},{},[1]);
