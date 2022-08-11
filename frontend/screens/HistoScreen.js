import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux'; 

function MyReservationScreen(props) {

  // console.log('Je suis le token du mapState dans HistoScreen')
  // console.log(props.userConnected.reservations);

  return (

    <View style={styles.container}>

      <Text style={{ paddingBottom: 10, paddingTop: 10, fontSize: 30 }}>Vos réservations</Text>

      {/* Résa version 'En attente' */}
      <View style={styles.listContainer}>

        <View style={styles.restoInfosContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
          </View>

          <View style={styles.resaInfosContainer}>
            <Text style={styles.restoName}>Chai les Copains</Text>
            <Text style={styles.resaInfos}>Le 23/09/2022, à 19:30</Text>
          </View>
        </View>

        <View style={[styles.badge, {backgroundColor: '#e2e3e5'}]}>
          <Text style={{fontSize: 12, fontStyle:'italic'}}>En attente...</Text>
        </View>

        <View>
          <IonIcon name="chevron-forward-outline" size={20} />
        </View>
      </View>

      {/* Résa version 'Confirmée' */}
      <View style={styles.listContainer}>

        <View style={styles.restoInfosContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
          </View>

          <View style={styles.resaInfosContainer}>
            <Text style={styles.restoName}>Chai les Copains</Text>
            <Text style={styles.resaInfos}>Le 23/09/2022, à 19:30</Text>
          </View>
        </View>

        <View style={[styles.badge, {backgroundColor: '#d4edda'}]}>
          <Text style={{fontSize: 12}}>Confirmée</Text>
        </View>

        <View>
          <IonIcon name="chevron-forward-outline" size={20} />
        </View>
        
      </View>

      {/* Résa version 'Annulée' */}
      <View style={styles.listContainer}>

        <View style={styles.restoInfosContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
          </View>

          <View style={styles.resaInfosContainer}>
            <Text style={styles.restoName}>Chai les Copains</Text>
            <Text style={styles.resaInfos}>Le 23/09/2022, à 19:30</Text>
          </View>
        </View>

        <View style={[styles.badge, {backgroundColor: '#f8d7da'}]}>
          <Text style={{fontSize: 12}}>Annulée</Text>
        </View>

        <View>
          <IonIcon name="chevron-forward-outline" size={20} />
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingLeft: 16,
    paddingRight: 16
  },
  listContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restoInfosContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  image: {
    aspectRatio: 1 / 1,
    borderRadius: 40,
  },
  resaInfosContainer: {
    marginLeft: 10,
    justifyContent: 'center'
  },
  restoName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  resaInfos: {
    fontSize: 12
  },
  badge: {
    height: 35,
    width: 95,
    borderRadius: 20,
    alignItems:'center',
    justifyContent: 'center'
  },
});

function mapStateToProps(state) {
  return { userConnected: state.user }
}

export default connect(
  mapStateToProps,
  null
)(MyReservationScreen)