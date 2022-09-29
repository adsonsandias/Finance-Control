# Finance Control

Financial control (web) application focused on accessibility and usability, transforming the experience of how you manage your finances.

The concept around the purpose of the application has been expanded, now not only can you manage your personal finances, but you can look in real time at the value of Bitcoin, in the three main currencies, Euro, Dollar, and Real, you will now have a detailed chart about your expenses, as well as credit card expenses (the active credit card in the app is not real, because it is a personal project and without a partnership or integration with banks, the objective is just to demonstrate a better usability of the experience which your credit expenses are visualized)

More technical concepts of the app

The application will have a database that is where I store the login information, profile image and user data regarding the added transactions, and for that I am using Firebase, for user authentication either by email or right login through the account Google (Github also once it's done).


All transactions are saved in Firestore Database, and returned instantly to the user once added, he can delete the information and update the ones that have already been added, thus closing a complete C.R.U.D made in Firebase. If you want to change your name and add a profile picture, you can do so.


All states will be managed by the Redux toolkit, giving me more control over the application and its triggered states.

## Preview 🚧
## 🚧

## Design System

### Font: Montserrat (400, 500, 600, 700)

### Color
| Color Order |  0% | 100% | Preview  |
|---------------|---------------|---------------|------|
| Primary Color | `#FFE664`  | `#FA8341` |![Primary-Color](https://user-images.githubusercontent.com/27157739/181995021-9573d4c8-36fc-4b62-9320-2e96f01617db.svg) |
| Secondary Color | `#F0F2F5` | | ![Secondary-Color](https://user-images.githubusercontent.com/27157739/181995593-772b8894-8e45-48f1-965a-8dfd33b8dd23.svg) |
| Primary Color Text| `#363F5F` | | ![Primary-Color-Text](https://user-images.githubusercontent.com/27157739/181995687-2e4bc773-95c7-412a-b434-c9d89c4c466d.svg) |
| Secondary Color Text| `#969CB2` | | ![Secondary-Color-Text](https://user-images.githubusercontent.com/27157739/181995595-76335c81-7879-44cf-8243-18482d766895.svg) | 
| Detail in green| `#7FDFBD` | `#12A454` | ![Detail-in-green](https://user-images.githubusercontent.com/27157739/181995791-f8588799-9101-4ccd-96b9-2edb17e8f0f7.svg) |
| Detail in red| `#E52E4D` | `#F296A5` | ![Detail-in-red](https://user-images.githubusercontent.com/27157739/181995896-615fd709-8c88-4a38-a74e-f5370a1eb0c6.svg) |
| Header title color | `#834713` | | ![Header-title-color](https://user-images.githubusercontent.com/27157739/181995922-ac8fd502-df3e-4b73-a8bd-cc740acf28ab.svg) |
| Green | `#33CC95` | | ![Green](https://user-images.githubusercontent.com/27157739/181995934-40715750-0143-4431-bbd6-3fd6c0b7edbc.svg) |



### Screens Figma

##### UI Design Login

![login](https://user-images.githubusercontent.com/27157739/183252681-fac1930f-d5c8-4b09-b6a8-c7f19826650c.png)

##### UI Design Desktop 

![new Início](https://user-images.githubusercontent.com/27157739/188340669-f1b5d6bc-4ecc-47e2-8c8b-1eb203abc1ba.jpg)

#### UI Design Mobile 

- Login and Home
![Home - Login](https://user-images.githubusercontent.com/27157739/188341075-5cb9c3ea-a951-46f2-9bf6-00d4e03146b2.png)

- Transaction and User
![User](https://user-images.githubusercontent.com/27157739/188341083-6ee0ad6a-fae3-4e76-8401-bfa99e9d933e.png)

- F.A.Q and Version
![dev](https://user-images.githubusercontent.com/27157739/188341090-9db8e896-fc3c-4413-a2e9-bbc156acff88.png)

#### Interface elements



##### Modal Component with hover and focus active
![Modal](https://user-images.githubusercontent.com/27157739/181994924-ae62eec5-4feb-48aa-8008-72e878b46b5b.png)

##### Navigation Component
![nav](https://user-images.githubusercontent.com/27157739/181994926-85dc86fb-e730-4279-9064-791d656e8fca.png)


## Web App Final Production screens

##### Responsivo Tablet/Mobile 🚧
## 🚧

## Status

### Completed :white_check_mark:

#### Pages :white_check_mark:

- Sigin
- Sigup
- Page Not Found(404)
- New Home


#### Loading Component :white_check_mark:

- Loading Component with lottie animation


#### Routes :white_check_mark:

- Redirected Routes
- Protected Route

#### Context 

#### Firebase :white_check_mark:

- Firebase Authentication with Google and Email
- Firestore integration with unique data collection for each user 

#### General Adjustment :white_check_mark:

- Redesign Login Page Mobile
- New transactions e theme integration item
- Rebuild the user page to get useful information
  - config sub routes will be added


#### Features General :white_check_mark:
- Credit card implementation 


### Under Construction :construction:


- Bitcoin chart and value
- User image update
- Handle error on login pages
- Test and adjust if necessary
- Adding animation in the web app
- CRUD of information list and profile user 
- implementation with redux toolkit for status management

## Technologies used

<div style="display: inline_block"><br>
  <img align="center"  alt="Figna" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg">
  <img align="center"  alt="ReactJS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg">
  <img align="center"  alt="typescript" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg">
  <img align="center"  alt="Html" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg">
  <:nail_care:>
   <img align="center"  alt="firebase" height="35" width="35" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg">  
  <img align="center"  alt="babel" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg">
  <img align="center"  alt="webpack" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg">
  <img align="center"  alt="eslint" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg">
  <img align="center"  alt="Frame Motion" height="30" width="30" src="https://user-images.githubusercontent.com/27157739/185726445-a7664858-4301-4e1e-852d-3ca2c7777268.png">

 
 
</div>


### Follow me :hugs: :point_down:
<div> 
  <a href="https://instagram.com/adson.san.dev" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/adson-santos-72ba75140/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
</div>

