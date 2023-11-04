import { cancelScheduledNotificationAsync } from "expo-notifications";
import { constants as types } from "../ActionTypes";
import { schedulePushNotification } from "../../notificiation-service";

const initialState = {
    reminders : []
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
                reminders: [...updated]
            }
        }

        case types.DELETE_REMINDER:{

            const id = action.payload
            CancelReminders(id)
            const tempReminders = state.reminders
            const removed = tempReminders.filter(value => value.id !== id)
            return {
                reminders: [...removed]
            }
        }

        default:
            return state;
    }

}

module.exports = { listReducer }