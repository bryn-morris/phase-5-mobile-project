import {View, Text, StyleSheet, Image, Button} from 'react-native'
import LogOutButton from './LogOutButton'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import LogOutModal from '../Login and Auth/LogOutModal'


//Settings Icon to have user be able to update and change their settings
// possibly integrate react native elements for ui
// Logout functionality should be included, Delete Account

function MyProfile({navigation}) {

    const { userToken, logOutModalVisible, setLogOutModalVisible } = useContext(AuthContext)

    const [ plantIndexImages, setPlantIndexImages ] = useState(null)

    ////////////////////////////////////////////
    ///////   Random Image from DB
    ////////////////////////////////////////////

    function determineRandomImageIndex () {
        return Math.floor(Math.random()* plantIndexImages.length)
    }

    useEffect( () => {
        fetch('https://customngrok.ngrok.app/observationsbyuser',{
            method: "GET",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        })
        .then(r=>{
            if (!r.ok) {
                setLogOutModalVisible(true)
            };
            return r.json()})
        .then(plants => {
            setPlantIndexImages(plants)
        })
    }
    ,[]
    )

    ////////////////////////////////////////////
    ///////   New Observation
    ////////////////////////////////////////////

    const handleNewObservation = () => {
        console.log("Is this hooked up?")
    }
    
    ////////////////////////////////////////////
    ///////   Rendered to Page
    ////////////////////////////////////////////

    return(
        <View>
            <LogOutButton navigation = {navigation}/>
            <Text>Profile Page</Text>
            <Button
                title = "New Observation"
                onPress = {handleNewObservation} 
            />
            {
                plantIndexImages ?
                    <Image 
                        source = {{uri: plantIndexImages[determineRandomImageIndex()].image}}
                        style = {styles.image}
                    />:
                    null
            } 
            {
                logOutModalVisible ?
                <LogOutModal navigation={navigation} /> :
                null
            }
            
        </View>   
    )
}

export default MyProfile

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 30
    },
    
  });