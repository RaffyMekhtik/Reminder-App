# React Native Expo Reminder app using all the following packages:
- [React-Redux](https://react-redux.js.org/)
- React-Persist
- [React-Native-Gesture-Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [React-Native-Community/datetimepicker](https://docs.expo.dev/versions/latest/sdk/date-time-picker/)
- [React-Hook-Form](https://react-hook-form.com/)
- [Expo-Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Expo-Router](https://docs.expo.dev/routing/introduction/)
- [Luxon](https://moment.github.io/luxon/#/)

## Don't Forget:
```
npm i 
```
Install Expo Go on your phone, unless you're running an emulator, then it will be installed automatically
```
npm run android 
```
## How To Use:

To add a reminder or note, press on the + Icon, You can either add

- Add a Title and a Body with no reminder
- Add a scheduled reminder with a date and time ( The notification sent will be empty )
- add a Title, Body, and a Reminder

---

The reminders can be swiped both to the left and the right

- The right to left swipe checks or unchecks the text,
if a reminder is scheduled, the notification is either cancelled or reactivated ( Unless the time for the reminder has passed, then a notification will not be sent )

- The left to right swipe simply deletes the reminder, deleting both the text and a notification that would've been sent if a date and time were specified

---

Pressing on the sun on top changes the theme from dark to light mode