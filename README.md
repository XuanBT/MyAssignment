MyAssignment

You use git to clone source code with Reposity Url with command line like: git clone https://github.com/XuanBT/MyAssignment.git
After clone source sucessfully, You should do many follow steps to run app on IOS(Simulator) or Android(emulator)

1. Set up to run the Project on IOS
  Installing requirements:
  - You need install Node(v16.15.0 or higher), React native CLI, Xcode, Simulator on your Macbook
  After installed System requirements, you should open terminal and run below command lines:
  - cd <--Project folder-->
  - yarn or npm install // install all package of the project
  - cd ios //navigate to ios folder of project
  - sudo gem install cocoapods //install pod command line for ios, skip this command line if your laptop has already installed cocoapods
  - rm Podfile.lock   //delete Podfile.lock in ios folder
  - pod install --repo-update   // install pod libs for ios
  - cd .. //navigate back to project folder
  - yarn ios or npm run ios  //run app on IOS simulator

2. Set up to run the project on Android
  Installing requirements:
   - install Node(v16.15.0 or higher), React native CLI, JDK(v11 or higher), Android studio, Android 13(S)SDK (include: SDK Platform 33, Intel x86 Atom_64 System Image)on your Macbook or you window laptop

  After installed requirements, you add follow environment variables to ~/.zprofile or ~/.zshrc file
   + Set enviroment variable for JDK
     - You add command line like export JAVA_HOME=<--your JDK installation location--> to  ~/.zshrc file
   + Set enviroment variable for Android studio
     - You add below command lines to ~/.zshrc file :
       export ANDROID_HOME=$HOME<--your android studio location-->
       export PATH=$PATH:$ANDROID_HOME/emulator
       export PATH=$PATH:$ANDROID_HOME/platform-tools
  
  After set up environment variables successfully, you run below commands
    - cd <--Project folder-->
    - npm run android or yarn android
