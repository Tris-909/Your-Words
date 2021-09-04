# Your Words Application :page_with_curl:

### What is "Your Word" ? 
- **Your Word** is an application where you can create your own diary board. You can imagine like you have a board then you stick note to it, sometime images, stickers and all sort of things. But now it's a tech board. Where eventually you can add many cool stuffs to it like : videos, records, links, images, basically your memories. 
 
- I'm someone who like to write when I'm in emotional state :black_nib: and I also passionate about creating mine own software :computer:. The first 50% of the "Why" I built this application is something that I simply enjoy to build and improve on day by day, 50% other is because I want to learn more about development like new skills and apply what I've learned to this project.  

- The application may not be perfect but is crafted with heart :raised_hands: and sometime bugs :fire: just sometime :satisfied:

![alt text](https://github.com/Tris-909/Your-Words/blob/master/src/github/images/roadmap.png)

### Environments : 
 - **FREI** env : used for development / testing and doing all sort of weird stuffs :stuck_out_tongue_closed_eyes:
 - **PROD** env : used for production :heartpulse:

### How to work with Amplify between many envs ?

- Check out to new branch on dev: **git checkout -b Feature-1**
- Check out to dev env: **amplify env checkout [dev-env-name]**
- Adding all new changes to git: **git add .**
- Commit all your code before pushing: **git commit -m "[Commit-message]"**
- Pushing changes to Github: **git push**
- Pushing new changes to dev env backend: **amplify push**
- Checkout to prod env: **amplify env checkout <env-name>**
- Pushing new changes to prod: **amplify push**

### How to fork this project ? 
- You can fork it and then just run *npm install*, This should work normally like other React project howver you have to install Amplify CLI then run the Amplify init for your clone to make the application works as expected
- Then you can add API / Storage / Hosting / Auth. Basically AWS services that we gonna use inside this project
- After this step, inside your project should have a file called **aws-exports.js** This is the file contains credentials for your AWS services and shoult not be pushed to github

# Some technologies I've used to build this project :gem: 
- React 
- AWS Amplify
- Redux 
- SASS
- React Chakra-UI 
- GraphQL 
- Some AWS services : Cognito, DynamoDB, Appsync, S3
- Git version control
  
# Features :rainbow: 
### Notes :memo:
  - Create a normal note with header and content along with an image if you like 
  - Adding up to 5 labels with custom color and content for each label
  - You will have a custom text Editor and an emoji picker so you can write your note with full of expression
  - After you have created a note, you can drag & drop it anywhere inside the board. The position of your note will be saved to a databases so you can freely customize your own board as your free will 
  - You can also edit the content of the note once it created or delete it
### Headings :ab:
  - Create a heading ( text ) 
  - on Editting it, you can change :
  1. Content 
  2. Font-size 
  3. Color 
  4. Rotation Degree
  5. Font-family 
  6. Text options : bold, italic, strikeThrough, underline
  7. Position of the heading
### Images :art: 
  - Create an album of images
  - Before submitting you can preview your image on the flight
  - After creating an image album, you can : 
  1. Drag & drop the Image inside the board
  2. Edit the Image to change / delete / add image to a an album 
  3. View Image at fullsize 
### Board :straight_ruler: 
  - The space where all your images, notes, headings, ... are inside 
  - You can : 
  1. Add / Reduce the board height 
  2. On clicking on reduce board height. If there is at least 1 item, inside the board area you want to reduce, you will get the toast notification to warn you that you can't do that because [Note/Heading/Images] are inside the area you want to delete 

# Images about the application :newspaper:

 ![alt text](https://github.com/Tris-909/Your-Words/blob/master/src/github/images/currentstate.png)

 ![alt text](https://github.com/Tris-909/Your-Words/blob/master/src/github/images/image2.png)

  ![alt text](https://github.com/Tris-909/Your-Words/blob/master/src/github/images/image3.png)

  ![alt text](https://github.com/Tris-909/Your-Words/blob/master/src/github/images/image4.png)
