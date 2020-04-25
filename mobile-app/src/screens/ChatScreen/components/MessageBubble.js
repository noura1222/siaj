import React from 'react';
import { View, Text } from "react-native";

import styles from '../style';

export default MessageBubble = ({ direction, text }) => {

    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    let leftSpacer = direction === 'left' ? null : <View style={{ width: 70 }} />;
    let rightSpacer = direction === 'left' ? <View style={{ width: 70 }} /> : null;

    let bubbleStyles = direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    let bubbleTextStyle = direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            {leftSpacer}
            <View style={bubbleStyles}>
                <Text style={bubbleTextStyle}>
                    {text}
                </Text>
            </View>
            {rightSpacer}
        </View>
    );
}
