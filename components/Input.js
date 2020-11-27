/*
 *  Input.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines a custom input componenet for TextInputs that provides an additional props: onValidation, pattern
 *           which allows us to define a regex pattern and a function to be invoked when the regex is valid. This is used
 *           by the login and signup pages
 * 
 *  Author: Jason Wolfe (Original source: https://medium.com/@react.ui.kit/react-native-textinput-validation-using-regex-patterns-rules-d811e8eee9aa)
 */

import React, { Component } from "react";
import { TextInput } from "react-native";

class Input extends Component {
  handleValidation(value) {
    const { pattern } = this.props;
    if (!pattern) return true;
    // string pattern, one validation rule
    if (typeof pattern === 'string') {
      const condition = new RegExp(pattern, 'g');
      return condition.test(value);
    }
    // array patterns, multiple validation rules
    if (typeof pattern === 'object') {
      const conditions = pattern.map(rule => new RegExp(rule, 'g'));
      return conditions.map(condition => condition.test(value));
    }
  }
  onChange(value) {
      const { onChangeText, onValidation } = this.props;
      const isValid = this.handleValidation(value);
      onValidation && onValidation(isValid);
      onChangeText && onChangeText(value);
  }
  render() {
    const {
        pattern,
        onChangeText,
        children,
        style,
        ...props
    } = this.props;
    return (
      <TextInput
        style={style}
        onChangeText={value => this.onChange(value)}
        {...props}>
        {children}
      </TextInput>
    );
  }
}
export default Input;