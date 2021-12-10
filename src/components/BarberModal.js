import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import styled from 'styled-components/native';

import barberApi from '../api/barber';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';
import ExpandIcon from '../assets/expand.svg';

const Modal = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ModalItem = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

const BarberInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BarberAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;

const BarberName = styled.Text`
  color: #000000;
  font-size: 18px;
`;

const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ServiceName = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
`;

const ServicePrice = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
  background-color: #268596;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const FinishButtonText = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
`;

const DateInfo = styled.View`
  flex-direction: row;
`;

const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`;

const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;

const DateTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000000;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const DateItemWeekDay = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
`;

const DateItemNumber = styled.Text`
  color: #000000  
  font-size: 16px;
  font-weight: bold;
`;

const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const TimeItemText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default ({show, setShow, barber, service}) => {
  const navigation = useNavigation();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  useEffect(() => {
    if (barber.available) {
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let newDay = new Date(selectedYear, selectedMonth, i);
        let year = newDay.getFullYear();
        let month = newDay.getMonth() + 1;
        let day = newDay.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        let selDate = year + '-' + month + '-' + day;

        let availability = barber.available.filter(e => e.date === selDate);

        newListDays.push({
          status: availability.length > 0 ? true : false,
          weekday: days[newDay.getDay()],
          number: i,
        });
      }

      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [barber, selectedMonth, selectedYear]);

  useEffect(() => {
    if (barber.available && selectedDay > 0) {
      let newDay = new Date(selectedYear, selectedMonth, selectedDay);
      let year = newDay.getFullYear();
      let month = newDay.getMonth() + 1;
      let day = newDay.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      let selDate = year + '-' + month + '-' + day;

      let availability = barber.available.filter(e => e.date === selDate);

      if (availability.length > 0) {
        setListHours(availability[0].hours);
      }

      setSelectedHour(null);
    }
  }, [barber, selectedDay]);

  useEffect(() => {
    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  const handleCloseButton = () => {
    setShow(false);
  };

  const handlePrevDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };

  const handleNextDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };

  const handleFinishClick = async () => {
    if (
      barber.id &&
      service !== null &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay > 0 &&
      selectedHour !== null
    ) {
      // const answer = await barberApi.setAppointment(
      //   barber.id,
      //   service,
      //   selectedYear,
      //   selectedMonth,
      //   selectedDay,
      //   selectedHour,
      // );
      // if (answer.error == '') {
      //   setShow(false);
      //   navigation.navigate('Appointments');
      // } else {
      //   alert(answer.error);
      // }

      setShow(false);
      navigation.navigate('Appointments');
    } else {
      alert('Fill the fields.');
    }
  };

  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width={40} height={40} fill="black" />
          </CloseButton>

          <ModalItem>
            <BarberInfo>
              <BarberAvatar source={{uri: barber.avatar}} />
              <BarberName>{barber.name}</BarberName>
            </BarberInfo>
          </ModalItem>

          {service !== null && (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{barber.services[service].name}</ServiceName>
                <ServicePrice>
                  R$ {barber.services[service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            </ModalItem>
          )}

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handlePrevDateClick}>
                <NavPrevIcon width={35} height={35} fill="black" />
              </DatePrevArea>
              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleArea>
              <DateNextArea onPress={handleNextDateClick}>
                <NavNextIcon width={35} height={35} fill="black" />
              </DateNextArea>
            </DateInfo>
            <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
              {listDays.map((item, key) => (
                <DateItem
                  key={key}
                  onPress={() =>
                    item.status ? setSelectedDay(item.number) : null
                  }
                  style={{
                    opacity: item.status ? 1 : 0.5,
                    backgroundColor:
                      item.number === selectedDay ? '#4EADBE' : 'white',
                  }}>
                  <DateItemWeekDay
                    style={{
                      color: item.number === selectedDay ? 'white' : 'black',
                    }}>
                    {item.weekday}
                  </DateItemWeekDay>
                  <DateItemNumber
                    style={{
                      color: item.number === selectedDay ? 'white' : 'black',
                    }}>
                    {item.number}
                  </DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>

          {selectedDay > 0 && listHours.length > 0 && (
            <ModalItem>
              <TimeList
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listHours.map((hour, key) => (
                  <TimeItem
                    key={key}
                    onPress={() => {
                      setSelectedHour(hour);
                    }}
                    style={{
                      backgroundColor:
                        hour === selectedHour ? '#4EADBE' : 'white',
                    }}>
                    <TimeItemText
                      style={{
                        color: hour === selectedHour ? 'white' : 'black',
                      }}>
                      {hour}
                    </TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          )}

          <FinishButton onPress={handleFinishClick}>
            <FinishButtonText>Finish Book</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};
