
import { AsyncStorage } from 'react-native';


export default class UserInfo extends Object {


        getUserId = () => {
          AsyncStorage.getItem('userId').then((value) => {
          const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/userinfo';
              const idToken = value;
              fetch(API_ENDPOINT,{ method: "GET",
                  headers:{
                      'Authorization': 'Bearer '+ idToken
                  }
              })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    console.log(responseJson);
                      const userid = responseJson.id;
             // data out of this block not accessible


                console.log(idToken); //
                 this.getPieces(idToken, userid);
                });
              });
   }
     getPieces = (idToken, UserID) => {

       const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/users/'+UserID+'/pieces';
         fetch(API_ENDPOINT,{
           method: 'GET',

         headers:{
           'Authorization': 'Bearer '+idToken
       }
      }).then((response) => response.json())
       .then((responseJson) => {
          const data = responseJson;
          console.log(data);

        });

     }

}