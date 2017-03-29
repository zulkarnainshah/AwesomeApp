import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LandingScreen from './Components/LandingScreen';
import SignInScreen from './Components/SignInScreen';
import SignUpScreen from './Components/SignUpScreen';
import UserHomeScreen from './Components/UserHomeScreen';
import AddPiecesScreen from './Components/AddPiecesScreen';
import ShowSinglePieceScreen from './Components/ShowSinglePieceScreen';
import CombinationDetailScreen from './Components/CombinationDetailScreen';

const RouterComponent = () => {

    return (
        <Router>
            <Scene key='startpage' component={LandingScreen} title='welcome' sceneStyle={{ paddingTop: 150 }} />
            <Scene key='signUp' component={SignUpScreen} title='Signup' sceneStyle={{ paddingTop: 150 }}/>
            <Scene key='signIn' component={SignInScreen} title='signin' sceneStyle={{ paddingTop: 150 }}/>
            <Scene key='homeScreen' component={UserHomeScreen} title='My Wardrobe'
            onRight={() => Actions.addPiecesScreen()}
            rightTitle="+ Add"
            sceneStyle={{ paddingTop: 100 }} />
            <Scene key='addPiecesScreen' component={AddPiecesScreen} title='Add Piece' sceneStyle={{ paddingTop: 100 }}/>
            <Scene key='ShowPiecesScreen' component={ShowSinglePieceScreen} title='Piece' sceneStyle={{ paddingTop: 100 }}/>
            <Scene key='combinationDetailScene' component={CombinationDetailScreen} title='Combination Pieces' sceneStyle={{ paddingTop: 100 }}/>
        </Router>
    );
};
export default RouterComponent;
