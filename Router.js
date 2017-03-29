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
            <Scene key='startPage' component={LandingScreen} title='welcome' sceneStyle={{ paddingTop: 150 }} />
            <Scene key='signUp' component={SignUpScreen} title='Signup' sceneStyle={{ paddingTop: 150 }}/>
            <Scene key='signIn' component={SignInScreen} title='signin' sceneStyle={{ paddingTop: 150 }}/>
            <Scene key='homeScreen' component={UserHomeScreen} title='My Wardrobe'
            onRight={() => Actions.addPiece()}
            rightTitle="+ Add"
            sceneStyle={{ paddingTop: 100 }} />
            <Scene key='addPiece' component={AddPiecesScreen} title='Add Piece' sceneStyle={{ paddingTop: 100 }}/>
            <Scene key='showPiece' component={ShowSinglePieceScreen} title='Piece' sceneStyle={{ paddingTop: 100 }}/>
            <Scene key='combinationDetail' component={CombinationDetailScreen} title='Combination Pieces' sceneStyle={{ paddingTop: 100 }}/>
        </Router>
    );
};
export default RouterComponent;
