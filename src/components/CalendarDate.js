import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {wp, hp} from '../Utils';

const CalendarDate = ({ rowIndex, colIndex, item, currentDate, activeDate, onDateChange }) => {

    return (
        <TouchableOpacity activeOpacity={0.8} key={`${rowIndex}${colIndex}`} style={{ display: 'flex', flex: 1, backgroundColor: "white", paddingHorizontal: wp(5), paddingVertical: hp(5), margin: 2, height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
            <Text
                style={{
                    display: 'flex',
                    // flex: 1,
                    width: "100%",
                    height: "100%",
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: "center",
                    // alignContent: 'center',
                    // paddingVertical: hp(4),
                    borderRadius: 5,
                    borderWidth: item != -1 ? item == activeDate.getDate() ? 1 : 0 : null,
                    borderColor: item == currentDate ? 'green' : null,
                    textAlign: 'center',
                    backgroundColor: item != -1 ? rowIndex == 0 ? 'orange' : colIndex == 0 && item != currentDate ? '#46a656' : item == currentDate ? '#7079cc' : item ==activeDate.getDate() ? 'white' : '#6e5754' : 'white',
                    color: item != -1 ? colIndex == 0 ? 'white' : item == activeDate.getDate() ? 'black' : 'white' : 'white',
                    fontWeight: item == activeDate.getDate()
                        ? "bold" : item == currentDate ? "bold" : "100"
                }}
                onPress={() => onDateChange(item)}
            >
                {item != -1 ?
                    item :
                    ''
                }
            </Text>
        </TouchableOpacity>
    )
}

export default CalendarDate

const styles = StyleSheet.create({})
