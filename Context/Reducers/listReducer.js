import { cancelScheduledNotificationAsync } from "expo-notifications";
import { constants as types } from "../ActionTypes";
import { schedulePushNotification } from "../../notificiation-service";

const initialState = {
    reminders : [],
    isDarkMode: true
}

async function CancelReminders(id){
    await cancelScheduledNotificationAsync(`${id}`)
}

function CreateReminders(title, body, date, id){
    schedulePushNotification(
                title,
                body,
                date,
                id
            )
}

const listReducer = ( state = initialState, action) => {

    switch (action.type) {

        case types.CREATE_REMINDER:{

            CreateReminders(
                action.payload.title,
                action.payload.body,
                action.payload.date,
                action.payload.id
                )

            return {
                ...state,
                reminders: [...state.reminders, action.payload]
            }
        }

        case types.UPDATE_REMINDER:{

            const tempReminders = state.reminders
            const updated = tempReminders.map(item => {
                if(item.id == action.payload.id){
                    CreateReminders(action.payload.title,action.payload.body,action.payload.date,item.id)
                    return {
                        ...item,
                        'title':action.payload.title,
                        'body':action.payload.body,
                        'date':action.payload.date,
                        'id':action.payload.id,
                    }
                } else {
                    return item
                }
            })
            
            return {
                ...state,
                reminders: [...updated]
            }
        }

        case types.DELETE_REMINDER:{

            const id = action.payload
            CancelReminders(id)
            const tempReminders = state.reminders
            const removed = tempReminders.filter(value => value.id !== id)
            return {
                ...state,
                reminders: [...removed]
            }
        }

        case types.CLEAR_ALL_REMINDERS:{

            const tempReminders = state.reminders

            const deleteReminders = tempReminders.map(item => {
                CancelReminders(item.id)
            })

            return {
                ...state,
                reminders: []
            }
        }
        
        case types.CANCEL_SCHEDULED_REMINDER:{

            CancelReminders(action.payload)
            return state
        }
        case types.SCHEDULE_REMINDER:{
            CreateReminders(
                action.payload.title,
                action.payload.body,
                action.payload.date,
                action.payload.id
                )
            return state

        }
        case types.TOGGLE_DARK:{
            
            return {
                ...state,
                isDarkMode:!state.isDarkMode
            }

        }

        default:
            return state;
    }

}

module.exports = { listReducer }