## Visit my youtube channel : https://www.youtube.com/@sauravdev4757
## Follow me on my Twitter : https://x.com/Saurav_dev21
## My Linkedin : https://www.linkedin.com/in/saurabh-dev-9120aa236/
## Follow me on my Instagram : https://www.instagram.com/sauravdev20002019/profilecard/?igsh=cnJsaGlqMnZjMm5h

#### PROJECT : OnCall-Tickets-Development-Support

#### Link : https://oncall-tickets-dev-support-tracer.netlify.app/


#### ACKNOWLEDGEMENTS : 

#### DESCRIPTION : This Project is meant to handle and detect the tickets of the e-courts system(MVP) of Indian via DOR-CIS which stands for Department of Revenue  (under the central Government of India) , which has been developed by NIC(National Informatics center as MVP as of March 15, 2025 . This Model has been designed to handle the sudden unknown issues which are tested and raised by Technical Specialist in order to be facilitate onCall-dev-support team & management unit to resolve the critical-time-bound issues. It involves the tickets raised per different location as per filter by different Tribunals . It not only helps to distribute the tickets Act-wise , but also the tickets get filtered by 3 different Tribunals which help the management to maintain the abstraction between different tribunals systems . Based on the severity of thesse ticktets the manangent unit cut these issues to their respective teeam which they can see from through this Application . Besides , in case of any new Requirement Gathering from Technical Specialists , management unit can have a clear Idea of new changes and hence reduce the no. of unecessary meetings that has to be organised in case of any failure.

#### Key Features - 
1) Tickets are segregated as per different Tribunals CA , AT and AA
2) Tickets can be marked as per the their severity Tribunal-wise
3) Separate section for New-Requirements , Understanding-gap , Actual Bug , Improvements.
4) Separate sections for video and screenshots regarding new requirements and bugs on the operations clients and higher government officials.

#### TECHNOLOGIES :
HTML5 , CSS , Javascript , React , Chakra UI , Firebase google Authentication , Auth0

#### CONCEPTS AND TECHNIQUES:
useState , useEffect , LocalStorage , Javascript Mapping concept , Saving data via LocalStorage on page reload (Specific to Web , not on mobile phones)
Hooks used - 





#### Development changes -->
1)Inside Todo-card contents are now one below the other.
2)Spacing fixed between First todo-card and the priority tab .

3)The docs files persist issue occurs because we are using URL.createObjectURL(file) which creates temporary URLs that don't persist across browser sessions [1]. When we restart your app, these blob URLs are no longer valid.

4)Add detail functionality added.
5)Extra details description does not persist in screen alongwith the docs uploaded 
Reason : 
While we're updating the task details in the TodoCard component, these updates aren't being saved to localStorage when the page refreshes. The handleUpdateDetails function in TodoCard calls handleUpdateDetails passed from App.jsx, but this function doesn't exist in App.jsx yet to persist the data .

6) Tribunals section added .

--> Scrolling feature disrupted .
--> Persistence of task tribunal-wise is not made feassible yet . 

Issue -->

1)The issue persist in how the data is been stored in the local-storage 
2)At handleSaveData() function, seems correctly storing the data in localStorage, but there's likely a timing issue .
(Above issue has been resolved on April 7th , 2025).


7)Requirement --> Swipe next-previous functionality to see the status of tribunal location-wise using linked-list datastructure.

8)Requirement --> Add a search functionality to locate a bug or addtional requirement via implementing binary search . 










