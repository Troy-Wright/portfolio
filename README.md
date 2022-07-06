# I've been working at Kommu sine June of 2022
Kommu is an upcoming residence exchange network, where users can register and swap houses with other verified users, 
enabling affordable lodging during any of their travels.

Feel free to browse through my work.
Here are some previews of what I've created...

# Component that subscribes an email to the Kommu newsletter
When "Subscribe" is clicked, a GET API call is made to check if the email is already a part of the data base. If it is, and the IsSubscribed property is false, a PUT is made to update the IsSubscribed property to true.

If the email is not a part of the database a POST is called to add the email to the database and subscribe them to the newsletter.

![image](https://user-images.githubusercontent.com/100097237/177621347-49922038-2724-46c1-9443-d705a7ec4f25.png)

# Unsubscribe from newsletter page

Similar to the subscribe component with checks to ensure that PUTs are not being made if the email is not a part of the database or is already unsubscribed.

![image](https://user-images.githubusercontent.com/100097237/177622831-9209254c-7a54-4b33-9edc-6e46c6f924ed.png)

# Admin page for tracking email subscribers with search, pagination, and unsubscribe button
My focus is to have the unsubscribed email removed from the real dom, and adding the ability to unsubscribe multiple emails, and clean up the styling

![image](https://user-images.githubusercontent.com/100097237/177623886-a52f8e8c-6c8d-45ce-8888-cc378dd4d239.png)
