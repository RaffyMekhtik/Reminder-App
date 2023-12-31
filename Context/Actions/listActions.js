import { constants as types } from "../ActionTypes"

const createReminder = ( payload ) => {
    const action = {
        type: types.CREATE_REMINDER,
        payload
    }
    return action
}
const deleteReminder = ( payload ) => {
    const action = {
        type: types.DELETE_REMINDER,
        payload
    }
    return action
}
const updateReminder = ( payload ) => {
    const action = {
        type: types.UPDATE_REMINDER,
        payload
    }
    return action
}
const clearAllReminders = () => {
    const action = {
        type: types.CLEAR_ALL_REMINDERS,
    }
    return action
}
const toggleDark = () => {
    const action = {
        type: types.TOGGLE_DARK,
    }
    return action
}
const cancelScheduledReminder = ( payload ) => {
    const action = {
        type: types.CANCEL_SCHEDULED_REMINDER,
        payload
    }
    return action
}
const scheduleReminder = ( payload ) => {
    const action = {
        type: types.SCHEDULE_REMINDER,
        payload
    }
    return action
}

module.exports = {
    createReminder,
    deleteReminder,
    updateReminder,
    clearAllReminders,
    cancelScheduledReminder,
    scheduleReminder,
    toggleDark
}