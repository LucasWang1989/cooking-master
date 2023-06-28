import React, { useState } from 'react'
import {TouchableOpacity, StyleSheet, View, Alert} from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import Background from './components/Background'
import Header from './components/Header'
import Button from './components/Button'
import TextInput from './components/TextInput'
import { theme } from './core/theme'
import { passwordValidator } from './helpers/passwordValidator'
import axios from "axios";
import { nameValidator } from "./helpers/nameValidator";
import { change_user_token } from "../../actions/user_action";
import { serviceUrl } from "../../common/constant/constant";

export default function LoginScreen(props) {
    const [name, setName] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const dispatch = useDispatch();

    const onLoginPressed = (dispatch) => {
        const nameError = nameValidator(name.value)
        const passwordError = passwordValidator(password.value)
        if (nameError || passwordError) {
            setName({...name, error: nameError})
            setPassword({...password, error: passwordError})
            return
        }
        doLogin();
    }

    const doLogin = () => {
      const credentials = {
          username: name.value,
          password: password.value
      }

      axios.post(serviceUrl + '/user/login', credentials).then(res => {
          if (res.status === 200) {
              if(res.data.token !== "-1") {
                  dispatch(change_user_token(res.data.token, name.value));

                  props.navigation.replace('ProfileScreen');
              }else{
                  Alert.alert(
                      "Incorrect username or password",
                      '',
                      [{ text: 'OK' }]
                  );
              }
          } else {
              console.error('Register failed:' + res.data);
          }
      }).catch(err => {
          console.error('Register failed:' + error);
      });
    }

    return (
    <Background>
      <Header>Welcome back.</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
    )
    }

    const styles = StyleSheet.create({
    forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    },
    row: {
    flexDirection: 'row',
    marginTop: 4,
    },
    forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    },
    link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    },
})
