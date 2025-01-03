import Notif from "../models/notifs.model.js";

export const add_notif = async (userId=null, name = '', title, message) => {
    try {
        const newNotification = {
            title,
            message,
        };
        const user = await Notif.findOneAndUpdate(
            { userId },
            {
                $push: { notifications: newNotification },
                $setOnInsert: { name }, 
            },
            { new: true, upsert: true } 
        );

        console.log("Notification added successfully:", user);
    } catch (error) {
        console.error("Error adding notification:", error);
    }
};


export const fetch = async(req ,res)=>{
    try {const {sid} = req.user;
        const user_notifications = await Notif.findOne({ userId: sid });

        if (!user_notifications) {
          return res.status(404).json({ error: 'No notifications found for this user' });
        }

        console.log("notifications : ",user_notifications.notifications);
        res.status(200).json(user_notifications.notifications);
        
      } catch (error) {
        res.status(500).json({ error: 'Error fetching notifications' });
      }
};

export const markSeen = async(req ,res)=>{
    try {
    
        const updatedNotif = await Notif.findOneAndUpdate(
          { userId: req.user.sid, 'notifications._id': req.body.notifId },
          { $set: { 'notifications.$.seen': true } },
          { new: true }
        );
        // notification.notifications.seen = true;
        // await notification.save();

        if (!updatedNotif) {
          return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification marked as seen' });
      } catch (error) {
        res.status(500).json({ error: 'Error updating notification' });
      }
    };

export const deleteNotif = async (req, res) => {
  try {
    const { sid } = req.user;

    const result = await Notif.updateOne(
      { userId: sid },
      { $pull: { notifications: { seen: true } } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: 'No notifications found to delete' });
    }

    res.status(200).json({ message: 'Notifications deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting notifications' });
  }
};

export const addNotif = async(req,res)=>{
  const { userId,name, title, message } = req.body;

  if (!userId || !name || !title || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await add_notif(userId,name, title, message);
    res.status(200).json({ message: 'Notification added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating notification',error });
  }
};