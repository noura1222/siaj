import React, { useRef } from 'react'
import { View, TextInput, Text, TouchableHighlight, StyleSheet } from "react-native";

import styles from '../style';
//The bar at the bottom with a textbox and a send button.
export default InputBar = (props) => {
    const autogrowInput = useRef(null)
    //AutogrowInput doesn't change its size when the text is changed from the outside.
    //Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
    //Another possible solution here would be if InputBar kept the text as state and only reported it when the Send button
    //was pressed. Then, resetInputText() could be called when the Send button is pressed. However, this limits the ability
    //of the InputBar's text to be set from the outside.
    // if (React.nextProps.text === '') {
    //     autogrowInput.resetInputText();
    // }
    // componentWillReceiveProps(nextProps) {
    //   if(nextProps.text === '') {
    //     autogrowInput.resetInputText();
    //   }
    // }


    return (
        <View style={styles.inputBar}>
            <TextInput style={{
                ...styles.textBox
                // , position: 'absolute',
                // width: '100%',
                // bottom: props.keyboardOffset
            }}
                ref={autogrowInput}
                // multiline={true}
                // defaultHeight={30}

                onChangeText={(text) => props.onChangeText(text)}
                onContentSizeChange={props.onSizeChange}
                value={props.text} />
            <TouchableHighlight style={styles.sendButton} onPress={() => props.onSendPressed()}>
                <Text style={{ color: 'white' }}>Send</Text>
            </TouchableHighlight>
        </View>
    );



}

// const textBoxStyle = StyleSheet.create({
//     position: 'absolute',
//     width: '100%',
//     bottom: this.state.keyboardOffset
// })

// const customeStyle = StyleSheet.flatten([
//     styles.textBox,
//   ]);
