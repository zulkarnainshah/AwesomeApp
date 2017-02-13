import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Screen2 from './Components/Screen2';
import Screen3 from './Components/Screen3';
import Screen4 from './Components/Screen4';
import HomeScreen from './Components/HomeScreen';

const RouterComponent = () => {

    return (
     <Router sceneStyle={{ paddingTop: 150 }}>
         <Scene key='startpage' component={Screen2} title='welcome' />
         <Scene key='signUp' component={Screen4} title='Signup' />
         <Scene key='signIn' component={Screen3} title='signin' />
        <Scene key='homeScreen' component={HomeScreen} title='My Wardrobe'/> 
      </Router>
    );
};
  export default RouterComponent;
