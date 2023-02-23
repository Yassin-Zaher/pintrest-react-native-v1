import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";

export default function CreatePinScreen() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const nhost = useNhostClient();
  const navigation = useNavigation()
  const CREATE_PIN_MUTATION = `
  mutation MyMutation($image: String!, $title: String) {
    insert_pins(objects: {image: $image, title: $title}) {
      returning {
        created_at
        id
        image
        title
        user_id
      }
    }
  }`

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSubmit = async() => {
    const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
      title,
      image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/7.jpeg'
    })

    console.log(result);

    if(result.error){
      Alert.alert("Error Uploading Image", result.error.message)
      
    }else{
      navigation.goBack()
    }
    
  };

  return (
    <View style={styles.root}>
      <Button title="Upload your Pin" onPress={pickImage} />
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TextInput
            placeholder="Title..."
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <Button title="Submit Pin" onPress={onSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 5,
    width: "100%",
    borderRadius: 5,
  },
});
