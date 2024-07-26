MyAssignment
You use git to clone source code with Reposity Url with command line like: git clone https://github.com/XuanBT/MyAssignment.git
After clone source sucessfully, You open terminal for IOS or cmd for Window and run many below command lines:
- cd <Project Name>
- yarn or npm install // install all package of the project
+ Run Project on IOS, you should run many below command lines:
  - cd ios //navigate to ios folder of project
  - sudo gem install cocoapods //install pod command line for ios, skip this command line if your laptop has already installed cocoapods
  - rm Podfile.lock   //delete Podfile.lock in ios folder
  - pod install --repo-update   // install pod libs for ios
  - cd .. //navigate back to project name folder
  - yarn ios or npm run ios  //run app on IOS simulator
