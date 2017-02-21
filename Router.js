import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LandingScreen from './Components/LandingScreen';
import SignInScreen from './Components/SignInScreen';
import SignUpScreen from './Components/SignUpScreen';
import UserHomeScreen from './Components/UserHomeScreen';
import AddPiecesScreen from './Components/AddPiecesScreen';
import ShowSinglePieceScreen from './Components/ShowSinglePieceScreen';

const RouterComponent = () => {

    return (
     <Router sceneStyle={{ paddingTop: 150 }}>
        <Scene key='startpage' component={LandingScreen} title='welcome' />
         <Scene key='signUp' component={SignUpScreen} title='Signup' />
         <Scene key='signIn' component={SignInScreen} title='signin' />
         <Scene key='homeScreen' component={UserHomeScreen} title='My Wardrobe' />
            <Scene key='addPiecesScreen' component={AddPiecesScreen} title='Add Pieces' />
            <Scene key='ShowPiecesScreen' component={ShowSinglePieceScreen} title='View Pieces' />
</Router>
    );
};
  export default RouterComponent;
