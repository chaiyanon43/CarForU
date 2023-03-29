import axios from "../axios.config"
import { toaster } from "evergreen-ui";
import { notificationRequest } from "components/interfaces";

export class NotificationService {
    async sendNotification(noti:notificationRequest) {
        try {
            await axios.post('http://localhost:8080/sendNotification',{
                userId:noti.userId,
                notificationContactType:noti.notificationContactType?.name,
                notificationContact:noti.notificationContact,
                notificationContactor:noti.notificationContactor,
                carId:noti.carId,
                notificationDesc:noti.notificationDesc

            })
                .then((res) => {
                    toaster.success("ส่งสำเร็จ", {
                        description:res.data,
                        duration: 5,
                    });
                })
        } catch {
            toaster.danger("ส่งไม่สำเร็จ", {
                duration: 5,
            });
        }
    }
    async getNotificationList(userId: number) {
        try {
            return await axios.get('http://localhost:8080/getNotifications', {
                params: {
                    userId: userId
                }
            })
                .then((res) => res.data);
        } catch (err: any) {
            toaster.danger("Get Notification List Error!", {
                duration: 5,
            });
        }
    }
    async getNotificationDetail(notificationId: number) {
        try {
            return await axios.get("http://localhost:8080/getNotificationDetail", {
                params:
                {
                    notificationId
                }
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get Notification detail Error!", {
                duration: 5,
            });
        }
    }
}