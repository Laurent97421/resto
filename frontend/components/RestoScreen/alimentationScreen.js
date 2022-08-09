import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { connect } from "react-redux";


function alimentationScreen(props) {

  var filtersAlimentation = props.restoSelected[0].features.map((filtre, i) => {
    if(filtre.property == 'Alimentation') {
      return (
        filtre.values.map((value, i) => {
          return (
            <View key={i} style={styles.filter}><Text style={styles.filterText}>{value}</Text></View>
          )
        })
      )
    }
  });

  var filtersAllergenes = props.restoSelected[0].features.map((filtre) => {
    if(filtre.property == 'Allergènes') {
      return (
        filtre.values.map((value, i) => {
          return (
            <View key={i} style={styles.filter}><Text style={styles.filterText}>{value}</Text></View>
          )

          // var text=[];
          // for(var j=0; j<filtre.values.length; j++) {
          //   text.push(<Text key={i} style={styles.filters}>{filtre.values[j]}</Text>)
          //   console.log(text)
          // }
        })
      )
    }
  });

  return (
    <ScrollView style={{backgroundColor:'white'}} >

      <View style={styles.container}>

        <Text style={styles.title}>Alimentation</Text>
        <View style={styles.filtersContainer}>
          { filtersAlimentation }
        </View>

        <Text style={styles.title}>Allergènes</Text>
        <View style={styles.filtersContainer}>
          { filtersAllergenes }
        </View>

      </View> 

    </ScrollView>
  )
}

function mapStateToProps(state) {
  return { restoSelected: state.restoSelected }
}

export default connect(
  mapStateToProps,
  null
)(alimentationScreen);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    // marginBottom: 10,
    marginTop: 16,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  filter: {
    width: 'auto',
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: "#F5F5F5",
    alignItems: 'center',
    marginTop: 10,
    marginEnd: 10
  },
  filterText: {
    fontSize: 16,
    padding: 15,
  }
})