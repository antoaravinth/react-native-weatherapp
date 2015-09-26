/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} = React;

var ForeCast = React.createClass({
    render : function() {
        return (
            <View>
              <Text>
                {this.props.main}
              </Text>
              <Text>
                Current Conditions {this.props.description}
              </Text>
              <Text>
                 {this.props.temp} °F
              </Text>
            </View>
        )
    }
})

var WeatherProject = React.createClass({

  getInitialState : function() {
      return {
         margin : 25,
         forecast: {
            main : "Main details",
            description : "dummy",
            temp : "35"
         }
      }
  },

    _handleTextChange: function(event) {
    var zip = event.nativeEvent.text;
    fetch('http://api.openweathermap.org/data/2.5/weather?q='
      + zip + '&units=imperial')
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  render: function() {

    var foreCastContent = <ForeCast main={this.state.forecast.main}
                  description={this.state.forecast.description}
                  temp={this.state.forecast.temp}/>;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Enter your zip code
        </Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: this.state.margin }} placeholder="ZipCode" 
          onSubmitEditing={this._handleTextChange}/>
        {foreCastContent}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
    container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60
  }
});

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
