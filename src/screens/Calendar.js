import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CalendarDate from '../components/CalendarDate';
import Icon from '../components/Icon';
import { wp, hp } from '../Utils';

const Calendar = () => {

    const months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"];

    var years = [];
    for (let i = 1990; i <= 2050; i++) {
        years.push(i);
    }

    var dateVal = []
    for (let i = 1; i <= 31; i++) {
        dateVal.push(i);
    }

    const weekDays = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const dateObj = new Date();
    // console.log(dateObj);
    const [activeDate, setDate] = useState(dateObj);

    const [currentDate, setCurrentDate] = useState(activeDate.getDate());

    const setMonth = month => {
        const newDate = new Date(
            activeDate.getFullYear(),
            month,
            activeDate.getDate()
        );
        setDate(newDate);
    };
    const setDay = day => {
        const newDate = new Date(
            activeDate.getFullYear(),
            activeDate.getMonth(),
            day
        );
        setDate(newDate);
    };
    const setYear = year => {
        const newDate = new Date(
            year,
            activeDate.getMonth(),
            activeDate.getDate()
        );
        setDate(newDate);
    };

    const onDateChange = (item) => {
        if (!item.match && item != -1) {
            // console.log("item", item);
            setDay(item);
        }
    };

    const getDateArray = () => {
        var array = [];
        array[0] = weekDays;

        var year = activeDate.getFullYear();
        var month = activeDate.getMonth();
        var firstDay = new Date(year, month, 1).getDay();

        var maxDays = numDays[month];
        if (month == 1) {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        var count = 1;
        for (var row = 1; row < 7; row++) {
            array[row] = [];
            for (var col = 0; col < 7; col++) {
                array[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    array[row][col] = count++;
                } else if (row > 1 && count <= maxDays) {
                    array[row][col] = count++;
                }
            }
        }
        return array;
    }

    let dateArray = getDateArray();

    let dateRows = [];
    dateRows = dateArray.map((row, rowIndex) => {
        let rowVal = row.map((item, colIndex) => (
            <CalendarDate
                key={colIndex}
                rowIndex={rowIndex}
                colIndex={colIndex}
                item={item}
                currentDate={currentDate}
                activeDate={activeDate}
                onDateChange={onDateChange}
            />
        ));

        return (
            <View
                key={rowIndex}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingHorizontal: wp(5),
                    paddingVertical: hp(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}>
                {rowVal}
            </View>
        );
    });

    const changeMonth = (n) => {
        const month = activeDate.getMonth();
        setMonth(month + n);
        // console.log(activeDate.getDate(), activeDate.getMonth(), activeDate.getFullYear())
    }

    const [weekData, setWeekData] = useState([]);

    const getWeek = () => {
        const tempData = new Date(activeDate);
        // console.log("selecte date", tempData)
        setWeekData([]);
        tempData.setDate((tempData.getDate() - tempData.getDay()));
        let tempArray = [];
        for (var i = 0; i < 7; i++) {
            tempArray.push({
                day: weekDays[tempData.getDay()],
                date: tempData.getDate(),
                month: months[((tempData.getMonth())) % months.length],
                year: tempData.getFullYear()
            })
            // console.log("current", tempData.getDate(), tempData.getMonth(), tempData.getFullYear(), tempData.getDay());
            tempData.setDate(tempData.getDate() + 1);
        }
        setWeekData(tempArray);
        // console.log("a", tempArray)
    }

    return (
        <View style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: 5, backgroundColor: 'white' }}>
            {/* Current Date Display */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(20), paddingVertical: hp(10), backgroundColor: 'white', margin: 5 }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => changeMonth(-1)}>
                    <Icon type={"MaterialIcons"} name="keyboard-arrow-left" size={wp(30)} color={"black"} />
                </TouchableOpacity>

                <Text style={{ fontWeight: 'bold', fontSize: wp(18), textAlign: 'center' }}>
                    {activeDate.getDate()} {months[activeDate.getMonth()]} {activeDate.getFullYear()}
                </Text>

                <TouchableOpacity activeOpacity={0.5} onPress={() => changeMonth(1)}>
                    <Icon type={"MaterialIcons"} name="keyboard-arrow-right" size={wp(30)} color={"black"} />
                </TouchableOpacity>

            </View>

            {/* Dropdown select */}
            <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: wp(10), paddingVertical: hp(5), marginHorizontal: wp(5), marginVertical: hp(5), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Picker
                    style={{ display: 'flex', padding: 5, flex: 2, backgroundColor: "white", borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderWidth: 1, borderColor: 'black' }}
                    selectedValue={activeDate.getDate().toString()}
                    onValueChange={(itemValue, itemIndex) => {
                        setDay(itemValue);
                    }
                    }>
                    {dateVal.map((item, index) => (
                        <Picker.Item label={item.toString()} key={index} value={item.toString()} />
                    ))
                    }
                </Picker>

                <Picker
                    style={{ display: 'flex', padding: 5, flex: 3, backgroundColor: "white", borderWidth: 1, borderColor: 'black' }}
                    selectedValue={months[activeDate.getMonth()]}
                    onValueChange={(itemValue, itemIndex) => {
                        setMonth(itemIndex);
                    }
                    }>
                    {months.map((item, index) => (
                        <Picker.Item label={item} key={index} value={item} />
                    ))
                    }
                </Picker>

                <Picker
                    style={{ display: 'flex', padding: 5, flex: 2, backgroundColor: "white", borderTopRightRadius: 5, borderBottomRightRadius: 5, borderWidth: 1, borderColor: 'black' }}

                    selectedValue={activeDate.getFullYear().toString()}
                    onValueChange={(itemValue, itemIndex) => {
                        setYear(itemValue);
                    }
                    }>
                    {years.map((item, index) => (
                        <Picker.Item label={item.toString()} key={index} value={item.toString()} />
                    ))
                    }
                </Picker>



            </View>

            {/* Calendar date rows */}
            <View style={{ flex: 1, display: "flex", backgroundColor: 'orange', paddingVertical: hp(1), marginBottom: hp(10), marginHorizontal: wp(5), borderRadius: 5, borderColor: 'orange', borderWidth: 1 }}>
                {dateRows}
            </View>

            <View style={{ flex: 1, display: "flex", paddingVertical: hp(2), marginBottom: hp(15), marginHorizontal: wp(5) }}>
                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', paddingBottom: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp(18), marginBottom: hp(1), marginRight: wp(10) }}>Get week by current day</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => getWeek()} style={{ width: "10%", padding: 5, borderRadius: 5, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Get</Text>
                    </TouchableOpacity>
                </View>
                {weekData.length ? (
                    weekData.map((item, index) => (
                        <View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ paddingHorizontal: wp(5), marginRight: wp(5), paddingVertical: hp(2), fontWeight: 'bold' }}>{item.day} </Text>
                            <Text style={{ paddingHorizontal: wp(5), marginRight: wp(5), paddingVertical: hp(2) }}>{item.date}</Text>
                            <Text style={{ paddingHorizontal: wp(5), marginRight: wp(5), paddingVertical: hp(2) }}>{item.month}</Text>
                            <Text style={{ paddingHorizontal: wp(5), marginRight: wp(5), paddingVertical: hp(2) }}>{item.year}</Text>
                        </View>

                    ))
                ) : (
                        <View style={{ display: 'flex',justifyContent: 'center', alignItems: 'center', marginTop: hp(20) }}>
                            <Text style={{ color: 'gray' }}>No Data</Text>
                        </View>
                    )}

            </View>

        </View>
    )
}

export default Calendar

const styles = StyleSheet.create({})
